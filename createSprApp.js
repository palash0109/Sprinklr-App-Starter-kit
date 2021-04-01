const commander = require('commander');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
var spawn = require('cross-spawn');

let projectName;
let exists = false;

function init() {
    const program = new commander.Command('create-spr-app')
        .version('1.0.0')
        .arguments('<project-directory>')
        .action((name, options, command) => {
            projectName = name;
        })
        .parse(process.argv)

    if(typeof projectName === 'undefined')
    {
        //if projectName not specified in cli
        console.log("Please specify the project directory");
        process.exit(1);
    }
    else{
        const root = path.resolve(projectName); // current directory + projectName
        try{
            fs.mkdirSync(root);
        }
        catch {
            exists = true;
            console.log(`A dir with this name already exists`)
        }
        if(exists === false)
        {

            const packagePath = path.join(root, "package.json"); //root + package.json
            // const webpackPath = path.join(root, "webpack.config.js")
            // const eslintPath = path.join(root, ".eslintrc.json")
            // const prettierPath = path.join(root, ".prettierrc.json")
            // const babelPath = path.join(root, ".babelrc")
            const srcPath = path.join(root, "src");
            // const indexPath = path.join(srcPath, "index.js");
            // const htmlPath = path.join(srcPath, "index.html");
            // const appPath = path.join(srcPath, "App.js")
            const appName = path.basename(root)
            const packageJson = {
                name: appName,
                version: '0.1.0',
                private: true,
                scripts: {
                    start: "webpack serve --mode development --open --hot",
                    build: "webpack --mode production"
                  },
              };
            fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + os.EOL);
            // fs.writeFileSync(webpackPath, webpack);
            // fs.writeFileSync(eslintPath, JSON.stringify(eslintJSON, null, 2))
            // fs.writeFileSync(prettierPath, JSON.stringify(prettierConfig, null, 2))
            // fs.writeFileSync(babelPath, JSON.stringify(babelJSON, null, 2))
            fs.mkdirSync(srcPath)
            // fs.writeFileSync(indexPath, indexJS);
            // fs.writeFileSync(htmlPath, indexHTML);
            // fs.writeFileSync(appPath, appJS);
            fs.copySync(path.join(__dirname, "config"), root)
            fs.copySync(path.join(__dirname, "src"), srcPath)
            console.log(path.join(__dirname, "config"));
            // fs.appendFileSync(packagePath, JSON.stringify(preCommit, null, 2))
            process.chdir(root); //changing directory to the new formed dir to run cli command inside it
            install();
            installDev();
        }
    }

}

function install()
{
    return new Promise((resolve, reject) => {
        let command;
        let args;
        let dependencies = ['react', 'react-dom']
        command = 'npm';
        args = [
            'install',
            '--save'
        ].concat(dependencies);

        const child = spawn(command, args, { stdio: 'inherit' });
        child.on('close', code => {
            if (code !== 0) {
            reject({
                command: `${command} ${args.join(' ')}`,
            });
            return;
            }
            resolve();
        });
    });
}

function installDev()
{
    return new Promise((resolve, reject) => {
        let command;
        let args;
        let dependencies = [
            'eslint-config-react-app', 
            '@typescript-eslint/eslint-plugin@^4.0.0', 
            '@typescript-eslint/parser@^4.0.0', 
            'babel-eslint@^10.0.0', 
            'eslint@^7.5.0', 
            'eslint-plugin-flowtype@^5.2.0', 
            'eslint-plugin-import@^2.22.0',
            'eslint-plugin-jsx-a11y@^6.3.1',
            'eslint-plugin-react@^7.20.3',
            'eslint-plugin-react-hooks@^4.0.8',
            'eslint-config-prettier', 
            'eslint-plugin-prettier',
            'prettier',
            '@babel/core',
            '@babel/preset-env',
            '@babel/preset-react',
            'babel-loader',
            'babel-plugin-transform-class-properties',
            'babel-plugin-transform-es2015-modules-commonjs',
            'babel-preset-env',
            'babel-preset-react',
            'html-webpack-plugin',
            'webpack',
            'webpack-cli',
            'webpack-dev-server',
            'style-loader',
            'css-loader'
        ]
        command = 'npm';
        args = [
            'install',
            '--save-dev'
        ].concat(dependencies);

        const child = spawn(command, args, { stdio: 'inherit' });
        child.on('close', code => {
            if (code !== 0) {
            reject({
                command: `${command} ${args.join(' ')}`,
            });
            return;
            }
            resolve();
        });
    });
}

module.exports = {
    init
};


