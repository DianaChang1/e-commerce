module.exports = {
    // 關閉eslint 將此行取消註解並將其他新增註解
    // parserOptions: {
    //   ecmaVersion: 7,
    //   sourceType: "module"
    // },
    // 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录
    // 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/vue3-essential', '@vue/standard'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 自訂規則 => 去官網查
        indent: [2, 4],
        semi: [2, 'always'],
        'space-before-function-paren': 'off'
    }
};
