module.exports = {
    lintOnSave: 'warning',
    css: {
        loaderOptions: {
            scss: {
                prependData: '@import "~@/assets/styles/variables.scss";',
            },
        },
    },
    chainWebpack: (config) => {
    // 移除 prefetch 插件
        config.plugins.delete('prefetch');
    },
};
