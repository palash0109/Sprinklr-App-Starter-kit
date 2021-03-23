const commander = require('commander');
const fs = require('fs-extra');
const os = require('os');
const path = require('path')

let projectName;
let exists = false;

function init() {
    const program = new commander.Command('create-spr-app')
        .version('1.0.0')
        .arguments('<project-directory>')
        .action((name, options, command) => {
            projectName = name;
            console.log(projectName);
            console.log(options);
            console.log(command.name())
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
            const appName = path.basename(root)
            const packageJson = {
                name: appName,
                version: '0.1.0',
                private: true,
              };
            fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + os.EOL);
            fs.writeFileSync(webpackPath, "");
        }
    }

}

init();