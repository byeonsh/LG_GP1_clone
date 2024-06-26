module.exports = {
  env: {
    browser: true,
    // es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  extends: ['airbnb-base', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'import'],
  rules: {
    // = Lint type =
    // 0 : off
    // 1 : warn
    // 2 : error
    'prettier/prettier': [
      2,
      {
        endOfLine: 'auto',
      },
    ],
    yoda: 0,
    'no-plusplus': 'off',
    'no-unused-vars': 1, // annotation : do not touch this level. we need to read to code for web api. so current level(1) is appropriate.
    'no-console': 0,
    'func-names': 0, // annotation : do not touch this level. if need to flow tracking, use console trace.
    'consistent-return': 0, // annotation : do not touch this level. class function is always to create instance. we use to. also rest case is no need warning.
    'import/extensions': [2, 'always'],
    'object-literal-sort-keys': [0],
    'new-parens': 1,
    'no-bitwise': 1,
    'no-cond-assign': 1,
    'no-trailing-spaces': 0,
    'eol-last': 1,
    'ordered-imports': [0],
    'max-len': [1, 120],
    semi: 1,
    'no-var': 0,
    curly: 1,
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    'src/*.js',
    'src/assest/vendors/',
    'src/assest/*.min.js',
    // 'src/components/_template/',
    // '/src/components/**/*/index-global.js',
    'gulpfile.js',
  ],
};
