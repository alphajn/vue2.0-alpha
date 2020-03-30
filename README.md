# vuecli 3.0

## 安装

``` sh
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

查看命令 `vue` 查看帮助信息

### 创建项目

```sh
vue create <app-name>
```

## 项目运行

``` bash
vue ui 图形界面打开
yarn serve  开发运行
yarn build  编译打包
yarn test:unit  单元测试
yarn lint   eslint 检查

yarn build --target lib --name <name> <entry>  单独构建包
    dist/name.umd.min.js    压缩后的umd构建版本
```

### 本地预览

``` bash
yarn global add serve
# -s 参数的意思是将其架设在 Single-Page Application 模式下
# 这个模式会处理即将提到的路由问题
serve -s dist

```

## 项目配置

### editorConfig 统一代码风格
项目根目录添加`.editorconfig`文件

``` vb
# 告诉EditorConfig插件，这是根文件，不用继续往上查找
root = true

# 匹配.js结尾的文件
[*.js]
# 匹配.js .scss .css 结尾的文件
[*.{js,scss,css}]

# 设置字符集
charset = utf-8
# 缩进风格，可选"space"、"tab"
indent_style = space
# 缩进空格数
indent_size = 4
# 结尾换行符，可选"lf"、"cr"、"crlf"
end_of_line = lf
# 删除一行中的前后空格
trim_trailing_whitespace = true
# 在文件结尾插入新行
insert_final_newline = true
# 每行最多字符数
max_line_length = 150
```

### eslint
项目根目录添加`.eslintrc.js`配置文件，添加忽略`eslint`检测的文件`.eslintignore`。[官方文档](https://eslint.bootcss.com/)

``` js
修复文件中的错误
yarn lint --fix

禁用格式
/* eslint-disable */    禁用开始
/* eslint-enable */     禁用结束
禁用当前行
/* eslint-disable-line */ 或 // eslint-disable-line
禁用下一行
/* eslint-disable-next-line */ 或 // eslint-disable-next-line
指定规则禁用，禁用命令后跟规则名称
/* eslint-disable no-alert, no-console */ 或  /* eslint-disable-line no-console */


// 常用配置
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
        'no-console': process.env.NODE_ENV === 'production' ? 'off' : 1,
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

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
```

### styleLint

项目根目录添加`.stylelintrc.js`配置文件，添加忽略`stylelint`检测的文件`.stylelintignore`。 [文档地址](http://stylelint.cn/user-guide/rules/)

``` js
// 安装node包
yarn add -D stylelint-config-standard stylelint-scss

修复文件中的错误
yarn stylelint --fix

禁用格式
/* stylelint-disable */    禁用开始
/* stylelint-enable */     禁用结束
禁用当前行
/* stylelint-disable-line */
禁用下一行
/* stylelint-disable-next-line */
指定规则禁用，禁用命令后跟规则名称
/* stylelint-disable selector-no-id */ 或  /* stylelint-disable-line selector-no-id */
```

### gitHooks

``` json
"gitHooks": {
  "pre-commit": "lint-staged"
},
"lint-staged": {
  "*.{js,vue}": [
    "vue-cli-service lint",
    "git add"
  ]
}
```
