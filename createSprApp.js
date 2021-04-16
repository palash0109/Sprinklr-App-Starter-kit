const commander = require('commander');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const spawn = require('cross-spawn');
const chalk = require('chalk')
const { option } = require('commander');
const { install } = require('./helper/install')
const { merge } = require('./helper/merge')


let projectName;

async function init() {
    const program = new commander.Command('create-spr-app')
        .version('1.0.0')
        .arguments('<project-directory>')
        .action((name, options, command) => {
            projectName = name;
        })
        .option(
            '--template <path-to-template>',
            'specify the template dir path for your project'
          )
        .allowUnknownOption()
        .parse(process.argv)

    if(typeof projectName === 'undefined')
    {
        //if projectName not specified in cli
        console.log("Please specify the project directory");
        process.exit(1);
    }

    const root = path.resolve(projectName); // current directory + projectName

    const options = program.opts()

    if(options.template === true)
    {
        console.log(`Please specify the path of the template directory or remove the ${chalk.cyan('--template')} option.`);
        process.exit(1);
    }

    let templatePath;
    if(options.template)
    {
        templatePath = path.resolve(options.template)
        const fileExists = fs.existsSync(templatePath)
        if(!fileExists)
        {
            console.error(chalk.red("Incorrect template directory path, please provide a correct path to template."));
            process.exit(1);
        }
    }

    try{
        fs.mkdirSync(root);
    }
    catch {
        console.error(chalk.red(`A dir with this name already exists.`))
        process.exit(1);
    }


    const packagePath = path.join(root, "package.json"); //root + package.json
    const srcPath = path.join(root, "src");
    const appName = path.basename(root);

    const packageJson = {
        name: appName,
        version: '0.1.0',
        private: true,
        scripts: {
            start: "webpack serve --mode development --open --hot",
            build: "webpack --mode production"
          },
      };

    // make package.json
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + os.EOL); 

    // copy the config files to root of package
    fs.copySync(path.join(__dirname, "config"), root); 

    if(options.template)
    {

        const templateDir = path.join(templatePath, 'template');

        //copy the template dir to the root 
        if (fs.existsSync(templateDir)) {

          console.log();
          console.log(`Copying the template files into your ${chalk.cyan(projectName)} directory. This might take a moment.`)
          console.log();
          fs.copySync(templateDir, root);

        } else {

          console.error(
            chalk.red(`Could not locate supplied template.`)
          );
          return;
        }

        
        //merge the template.json with the appPackage
        await merge(root, templatePath);

        process.chdir(root);

        console.log(chalk.cyan('Installing packages. This might take a couple of minutes.'))
        console.log();

        //installing dependencies
        await install(templatePath);
    }else{

        // make src directory
        fs.mkdirSync(srcPath); 

        console.log(`Copying the default template files into your ${chalk.cyan(projectName)} directory. This might take a moment.`)
        console.log();

        //copying the default template files to the src directory
        fs.copySync(path.join(__dirname, "src"), srcPath);
        
        process.chdir(root);

        console.log(chalk.cyan('Installing packages. This might take a couple of minutes.'))
        console.log();

        //installing dependecies
        await install(null);
    }
    
    console.log();
    console.log(`${chalk.green('Success!')} Created ${projectName}`);
    console.log('Inside that directory, you can run several commands');
    console.log();
    console.log('We suggest that you begin by typing:');
    console.log();
    console.log(chalk.cyan('  cd'), projectName);
    console.log(`  ${chalk.cyan(`npm start`)}`);
    console.log();
    console.log(`Happy Coding!`);
    console.log('\u00a9 sprinklr');
    console.log();

}


module.exports = {
    init
};


// 'eslint-config-react-app', 
// '@typescript-eslint/eslint-plugin@^4.0.0', 
// '@typescript-eslint/parser@^4.0.0', 
// '@babel/eslint-parser', 
// 'eslint@^7.5.0', 
// 'eslint-plugin-flowtype@^5.2.0', 
// 'eslint-plugin-import@^2.22.0',
// 'eslint-plugin-jsx-a11y@^6.3.1',
// 'eslint-plugin-react@^7.20.3',
// 'eslint-plugin-react-hooks@^4.0.8',
// 'eslint-config-prettier', 
// 'eslint-plugin-prettier',
// 'prettier',
// '@babel/core',
// '@babel/preset-env',
// '@babel/preset-react',
// 'babel-loader',
// 'babel-plugin-transform-class-properties',
// 'babel-plugin-transform-es2015-modules-commonjs',
// 'babel-preset-env',
// 'babel-preset-react',
// 'html-webpack-plugin',
// 'webpack',
// 'webpack-cli',
// 'webpack-dev-server',
// 'style-loader',
// 'css-loader'