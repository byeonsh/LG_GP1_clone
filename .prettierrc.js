module.exports = {
    useTabs: false,
    tabWidth: 2,
    printWidth: 120,
    singleQuote: true,
    semi: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    arrowParens: 'avoid',
    proseWrap: 'never',
    endOfLine: 'auto',
    singleAttributePerLine: false,
    overrides: [
        {
            files: '*.pug',
            options: {
                printWidth: 2000,
                htmlWhitespaceSensitivity: 'strict',
            },
        },
    ],
};
