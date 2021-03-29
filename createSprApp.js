const commander = require('commander');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const { eslintJSON } = require('./const')

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
            const webpackPath = path.join(root, "webpack.config.js")
            const eslintPath = path.join(root, ".eslintrc.json")
            const appName = path.basename(root)
            const packageJson = {
                name: appName,
                version: '0.1.0',
                private: true,
              };
            fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + os.EOL);
            fs.writeFileSync(webpackPath, "");
            fs.writeFileSync(eslintPath, JSON.stringify(eslintJSON, null, 2))
            process.chdir(root); //changing directory to the new formed dir to run cli command inside it
        }
    }

}

module.exports = {
    init
};



// npm
// install
// --save-dev 
// eslint-config-react-app 
// @typescript-eslint/eslint-plugin@^4.0.0 
// @typescript-eslint/parser@^4.0.0 
// babel-eslint@^10.0.0 
// eslint@^7.5.0 
// eslint-plugin-flowtype@^5.2.0 
// eslint-plugin-import@^2.22.0 
// eslint-plugin-jsx-a11y@^6.3.1 
// eslint-plugin-react@^7.20.3 
// eslint-plugin-react-hooks@^4.0.8