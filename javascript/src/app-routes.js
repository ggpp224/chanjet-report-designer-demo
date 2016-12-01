/**
 * Created by guopeng on 16/9/2.
 */


export const routes = {
    home: '/home',
    list: '/list'
}

const routeMap = {
    // require 为静态编译， 重复部分不能省略
    [routes.list]: (cb) => {require.ensure([], (require) => {cb(require('./components/pages/List/Page').default)})},
    [routes.home]: (cb) => {require.ensure([], (require) => {cb(require('./components/pages/Home/Page').default)})},

}


let _routes = {};
for(let key in routeMap){
    let _path = routeMap[key];
    _routes[`${key}`] = {
        getComponent: _path
    }
}
export const appRoutes = _routes ;