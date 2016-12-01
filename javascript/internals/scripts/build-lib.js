/**
 * Created by guopeng on 16/9/14.
 *
 * dev
 *
 */

const path = require('path');
const fs = require('fs');
const util = require('util');
const child_process = require('child_process');
const webpack = require('webpack');

const buildPath = path.resolve(__dirname, '../../src/www');
const reBuildTime = 2*24*60*60*1000;

function build() {
    //child_process.execSync('NODE_ENV=development '+path.join(__dirname, '../node_modules/webpack/bin/webpack.js')+ ' --config ddl.config.js --progress --colors --profile');
    process.env.NODE_ENV = 'development';
    var dllConfig = require('../webpack/dll.config')
    dllConfig.profile = true;
    progress(dllConfig);
    var compile = webpack(dllConfig);
    compile.run(function (err, stats) {
        process.stdout.write(stats.toString() + "\n");
    });
    console.log('正在编译 lib.js ...')

}

// 编译进度输出
function progress(options) {
    var ProgressPlugin = require("webpack/lib/ProgressPlugin");
    var chars = 0,
        lastState, lastStateTime;
    options.plugins.push(new ProgressPlugin(function(percentage, msg) {
        var state = msg;
        if(percentage < 1) {
            percentage = Math.floor(percentage * 100);
            msg = percentage + "% " + msg;
            if(percentage < 100) {
                msg = " " + msg;
            }
            if(percentage < 10) {
                msg = " " + msg;
            }
        }
        if(options.profile) {
            state = state.replace(/^\d+\/\d+\s+/, "");
            if(percentage === 0) {
                lastState = null;
                lastStateTime = +new Date();
            } else if(state !== lastState || percentage === 1) {
                var now = +new Date();
                if(lastState) {
                    var stateMsg = (now - lastStateTime) + "ms " + lastState;
                    goToLineStart(stateMsg);
                    process.stderr.write(stateMsg + "\n");
                    chars = 0;
                }
                lastState = state;
                lastStateTime = now;
            }
        }
        goToLineStart(msg);
        process.stderr.write(msg);
    }));

    function goToLineStart(nextMessage) {
        var str = "";
        for(; chars > nextMessage.length; chars--) {
            str += "\b \b";
        }
        chars = nextMessage.length;
        for(var i = 0; i < chars; i++) {
            str += "\b";
        }
        if(str) process.stderr.write(str);
    }
}

try{
    const libStats = fs.statSync(path.join(buildPath, 'lib.js'));
    const packageJsonStats = fs.statSync(path.join(process.cwd(), 'package.json'));
    const dllConfigStats = fs.statSync(path.join(process.cwd(), 'internals/webpack/dll.config.js'));
    const libTime = new Date(libStats.ctime).getTime()

  // lib.js 更新时间比 package.json 或 dll.config.js 的更新时间早时重新build
  if( libTime < new Date(packageJsonStats.ctime).getTime() || libTime < new Date(dllConfigStats.ctime).getTime()){
        build();
    }
}catch (error){
    if(error.code === 'ENOENT'){
        build();
    }
}
