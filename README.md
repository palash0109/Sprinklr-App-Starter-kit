# Sprinklr-App-Starter-kit

<img alt="Logo" align="right" style="margin-top: 30px;" src="./templates/default-template/template/src/sprlogo.svg" width="16%" />

## Quick Overview
```sh
npx create-spr-app my-spr-app
cd my-spr-app
npm start
```


## Get Started Immediately

You don’t need to install or configure tools like webpack ,babel, prettier or eslint.

>Create a project, and you’re good to go.

## What's Included?
- Babel loader
- Prettier
- Eslint
- Typescript
- React
- Compression plugins
- Prod build scripts
- Pre-commit hooks


## Creating an App

```sh
npm create-spr-app my-spr-app
```

It will create a directory called my-spr-app inside the current folder.
Inside that directory, it will generate the initial project structure and install the dependencies:

```
my-spr-app
├── README.md
├── node_modules
├── package.json
├── .babelrc
├── .eslintrc.json
├── .prettierrc.json
├── tsconfig.json
├── webpack.base.config.json
├── webpack.config.js
├── .gitignore
├── ts-typing
    └── global.d.ts
└── src
    ├── App.css
    ├── App.tsx
    ├── index.html
    ├── index.tsx
    └── sprlogo.svg
```

Once the installation is done, you can open your project folder:

```sh
cd my-app
```

Inside the newly created project, you can run some built-in commands:

```sh
npm start
```

Builds the app for production.

```ch
npm run build
```

## Custom Template Support

```sh
npx create-spr-app my-app --template file:../path/to/your/template
``` 

Custom Templates enable you to select a template to create your project from, while still retaining all of the features of Create Spr App.

You can also add your custom webpack in **webpack-template.config.js**

A template must have the following structure:

```
my-spr-template
├── template.json
├── template
    ├── webpack.custom.config.js
    └── src
        ├── App.css
        ├── App.js
        ├── index.html
        └── index.js
```

## Standard templates

```sh
npx create-spr-app my-spr-app --default name-of-template
```

- [with-react-router](https://github.com/palash0109/Sprinklr-App-Starter-kit/tree/main/templates/with-react-router)
- [with-graphql](https://github.com/palash0109/Sprinklr-App-Starter-kit/tree/main/templates/with-graphql)
- [with-graphql-router](https://github.com/palash0109/Sprinklr-App-Starter-kit/tree/main/templates/with-graphql-router)

## Sample webpack.custom.config.js file

```js
module.exports =
   {
   entry: './src/index.js',
   module: {
       rules: [
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset/resource',
            }
       ]
   },
   devServer: {
	historyApiFallback: true,
   }
}
```

## Sample template.json file

```js
{
   "dependencies": {
    "eslint-plugin-jsx-a11y": "^6.2.3",
    "serve": "^11.2.0"
   },
   "scripts": {
    "serve": "serve -s build",
    "build-and-serve": "npm run build && npm run serve"
   },
   "eslintConfig": {
    "extends": ["react-app", "plugin:jsx-a11y/recommended"],
    "plugins": ["jsx-a11y"]
   }
}
```