# Sprinklr-App-Starter-kit

<img alt="Logo" align="right" style="margin-top: 20px;" src="./src/sprlogo.svg" width="18%" />

## Quick Overview
```sh
npx create-spr-app my-spr-app
cd my-spr-app
npm start
```


## Get Started Immediately

You don’t need to install or configure tools like webpack ,babel, prettier or eslint.

>Create a project, and you’re good to go.


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
├──.babelrc
├──.eslintrc.json
├──.prettierrc.json
├──webpack.config.json
├── .gitignore
└── src
    ├── App.css
    ├── App.js
    ├── index.js
    └── sprlogo.png
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

## Custom Tempalte Support

Custom Templates enable you to select a template to create your project from, while still retaining all of the features of Create Spr App.

You can also add your custom webpack in **webpack-template.config.js**

A template must have the following structure:

```
my-spr-template
├── webpack-template.config.js
├── template.json
├── template
    └── src
        ├── App.css
        ├── App.js
        ├── index.js
        └── sprlogo.png
```
