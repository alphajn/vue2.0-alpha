const chalk = require('chalk'); // eslint-disable-line

const { VUE_APP_ENV, NODE_ENV } = process.env;

// https://github.com/chimurai/http-proxy-middleware#proxycontext-config
exports.proxy = {
    '/-/x/': {
        target: 'https://www.huobi.li', // 请求到 /api/users 现在会被代理到请求 http://localhost:3000/users
        changeOrigin: true, // target是域名的话，需要这个参数
        // pathRewrite: {
        //     '^/api': '',
        // },
    },
};

const message = [
    '',
    `${chalk.bgMagenta(chalk.white.bold(' I '))}  Node.js Proxy config ${chalk.green.bold('config/proxy.js:')}`,
    Object.keys(this.proxy).map((uri) => `     - ${chalk.magenta(uri)}: ${chalk.cyan(this.proxy[uri].target)}`).join('\n'),
    '',
    `${chalk.bgMagenta(chalk.white.bold(' II '))} Environmental variable:`,
    `     - ${chalk.magenta('NODE_ENV')}:    ${chalk.cyan(NODE_ENV)}`,
    `     - ${chalk.magenta('VUE_APP_ENV')}: ${chalk.cyan(VUE_APP_ENV)}`,
].join('\n');

// 打印信息
exports.LogMessage = class {
    // eslint-disable-next-line
    apply(compiler) {
        compiler.hooks.done.tapAsync(
            'myExamp',
            (status, callback) => {
                console.log(message); // eslint-disable-line
                callback();
            },
        );
    }
};
