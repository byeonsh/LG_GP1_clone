# LG GP1

## VS Code Plugin (!important):

Install these VS code plugin for development. These are must have plugins.

 - [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)
 - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
 - [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
 - [IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
 - [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
 - [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)
 - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
 - [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
 - [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
 - [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
 - [axe Accessibility Linter](https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter)
 - [Auto Comment Blocks](https://marketplace.visualstudio.com/items?itemName=kevinkyang.auto-comment-blocks)


## 1. Install (required)

-   https://nodejs.org

    node -v : We tested it on v16.13.2 or higher.<br> npm -v : We tested it on v8.3.0 or higher.

## 2. Install git bash or use command prompt

## 3. Install the gulp

-   https://gulpjs.com

## 4. Open the cloned working folder in Github repository.

## 5. Install the package

```
npm install
```

## 6. build

```
gulp build
```

When you run the build task, a dist folder will be created. <br> This folder contains css, js, html, images, etc.

## 7. watch (for publishing work)

```
gulp watch
```

You can preview the pages by setting the dist folder to the root directory of the IIS web server.

## 8. lint setting (based on vscode env)

1. install extension
    - stylelint
    - eslint
    - prettier
2. go preferences > settings menu
3. search "default formatter" and change option to "prettier".
4. route to "Text Editor" > "Formatting"
    - check "Format On Save"
    - check "Format On Paste"
5. open "setting.json" (search "Code Actions On Save", find them)
6. to paste follow code.
    ```
    "stylelint.enable": true,
    "stylelint.validate": ["scss"],
    ```
