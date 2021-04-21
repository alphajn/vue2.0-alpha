const { proxy, LogMessage } = require('./config/proxy');

module.exports = {
    lintOnSave: 'warning',
    productionSourceMap: false,
    pluginOptions: {
        lintStyleOnBuild: false, // 添加了插件(@ascendancyy/vue-cli-plugin-stylelint), 所以需要配置
        stylelint: {
            fix: false,
        },
    },
    devServer: {
        disableHostCheck: true,
        // proxy: 'http://localhost:8080'
        proxy,
    },
    css: {
        loaderOptions: {
            scss: {
                // prependData: '@import "~@/assets/styles/mixins.scss";',
            },
        },
    },
    chainWebpack: (config) => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');
    },
    configureWebpack: {
        plugins: [
            new LogMessage(),
        ],
    },
};
