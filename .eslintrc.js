// https://eslint.bootcss.com/
module.exports = {
    root: true,

    env: {
        node: true,
    },

    extends: [
        'plugin:vue/strongly-recommended',
        '@vue/airbnb',
    ],

    parserOptions: {
        parser: 'babel-eslint',
    },

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 0 : 1,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

        // 4个空格缩进 强制switch的case字句缩进级别
        "indent": [2, 4, { SwitchCase: 1 }],
        // 允许for循环使用一元计算符 ++
        'no-plusplus': [2, { "allowForLoopAfterthoughts": true }],
        // 每行最大长度
        'max-len': [2, { code: 150 }],
        // 允许对参数函数赋值
        'no-param-reassign': 0,
        // import 可以不用写后缀.js .vue
        'import/extensions': [2, 'always', {
            js: 'never',
            vue: 'never',
        }],

        // vue相关
        // 4 行空格缩进
        'vue/html-indent': ['error', 4],
    },

    overrides: [
        {
        files: [
            '**/__tests__/*.{j,t}s?(x)',
            '**/tests/unit/**/*.spec.{j,t}s?(x)',
        ],
        env: {
            jest: true,
        },
        },
    ],
};
