cordova.define('cordova/plugin_list', function (require, exports, module) {
    module.exports = [
        {
            "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
            "id": "cordova-plugin-console.console",
            "pluginId": "cordova-plugin-console",
            "clobbers": [
                "console"
            ]
        },
        {
            "file": "plugins/cordova-plugin-console/www/logger.js",
            "id": "cordova-plugin-console.logger",
            "pluginId": "cordova-plugin-console",
            "clobbers": [
                "cordova.logger"
            ]
        },

        //{
        //    "file": "plugins/cordova-hot-code-push-plugin/www/chcp.js",
        //    "id": "cordova-hot-code-push-plugin.chcp",
        //    "clobbers": [
        //        "chcp"
        //    ]
        //}
        // ,
        // {
        //     "file": "plugins/cordova-hot-code-push-local-dev-addon/www/chcpLocalDev.js",
        //     "id": "cordova-hot-code-push-local-dev-addon.chcpLocalDev",
        //     "clobbers": [
        //         "chcpLocalDev"
        //     ]
        // }

    ];
    module.exports.metadata =
// TOP OF METADATA
    {
        "cordova-plugin-whitelist": "1.2.1",
        "cordova-plugin-console": "1.0.2"
        //"cordova-hot-code-push-local-dev-addon": "0.1.2",
        //"cordova-hot-code-push-plugin": "1.2.5"
    }
// BOTTOM OF METADATA
});