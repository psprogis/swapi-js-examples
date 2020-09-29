module.exports = {
    "extends": "airbnb-base",

    globals: {
        allure: true,
    },

    env: {
        jasmine: true,
        es6: true,
        node: true
    },

    rules: {
        indent: ['error', 4],
        'max-len': ['error', { 'code': 120 }],
        'padded-blocks': 'off',
        'class-methods-use-this': 'off',
        'no-continue': 'off',
        'no-use-before-define': 'off',
        'arrow-parens': 'off'
    }
};
