module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    extends: ['plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks'],
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    }
}
