/**
 * Created by guopeng on 16/9/27.
 */

const fs = require("fs-extra");
const path = require('path');
const archiver = require('archiver');

const buildPath = 'dist';
const gzqAppZipPath = 'gzq-app-zip';
var zipProcess = 0;

/**
 * 移动文件
 * @param files 文件路径集合
 * @param directory 要移入的目录
 */
function move(files, directory) {
    files.forEach(function (file) {
        var fileName = file.split('/').pop();
        fs.copySync(file, path.join(directory, fileName));
        fs.removeSync(file);
    })
}

function zipFinish() {
    if(zipProcess==2){
        move(
            [
                '_tmp/index.html',
                '_tmp/ios.html',
                '_tmp/android.html'
            ],
            buildPath
        );
        fs.removeSync('_tmp');
    }
}

//删除已存在的zip包
fs.removeSync(gzqAppZipPath);
fs.mkdirsSync(gzqAppZipPath);


// 将html从dist中移出
move(
    [
        path.join(buildPath,'index.html'),
        path.join(buildPath,'ios.html'),
        path.join(buildPath,'android.html')
    ],
    '_tmp'
);

// copy dist到临时目录
fs.copySync(buildPath,'_tmp/ios');
fs.copySync(buildPath,'_tmp/android');
// 移除非自己手机系统环境的cordova
fs.removeSync('_tmp/ios/cordova/android');
fs.removeSync('_tmp/android/cordova/ios');

// 将iso.html移入_tmp/ios文件夹内
fs.copySync('_tmp/ios.html', '_tmp/ios/index.html');
// 将android.html移入_tmp/ios文件夹内
fs.copySync('_tmp/android.html', '_tmp/android/index.html');

// zip ios包
// zip 因archiver作用域问题不能提取公共函数
var archive = archiver('zip');
archive.on('finish',function () {
    zipProcess++;
    zipFinish();
})
archive.pipe(fs.createWriteStream(path.join(gzqAppZipPath,'ios.zip')));
archive.bulk([
    { expand: true, cwd:'_tmp',src: ['ios/**']}
]);
archive.finalize();

// zip android包
var androidArchive = archiver('zip');
androidArchive.on('finish',function () {
    zipProcess++;
    zipFinish();
})
androidArchive.pipe(fs.createWriteStream(path.join(gzqAppZipPath,'android.zip')));
androidArchive.bulk([
    { expand: true, cwd:'_tmp',src: ['android/**']}
]);
androidArchive.finalize();



