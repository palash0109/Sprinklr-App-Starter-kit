const commander = require('commander');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const spawn = require('cross-spawn');
const chalk = require('chalk')
const { option } = require('commander');
const { install } = require('./install')
const { merge } = require('./merge')


let projectName;

async function init() {
    const program = new commander.Command('create-spr-app')
        .version('1.0.0')
        .arguments('<project-directory>')
        .usage(`${chalk.green('<project-directory>')} [options]`)
        .action((name, options, command) => {
            projectName = name;
        })
        .option(
            '--template <path-to-template>',
            'specify a template for the created project'
          )
        .allowUnknownOption()
        .on('--help', () => {
            console.log(`\n   A custom ${chalk.cyan('--template')} should be:`);
            console.log(`    - a local path relative to current working directory: ${chalk.green('file:../my-custom-template')}`);
            console.log(`    - click the link below for more info about the format of custom-template`);
            console.log(`      ${chalk.cyan(`https://github.com/palash0109/Sprinklr-App-Starter-kit#custom-tempalte-support`)}\n`);
        })
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

    let templatePath = path.join(__dirname, "../templates/default-template");

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
    const appName = path.basename(root);

    const packageJson = {
        name: appName,
        version: '0.1.0',
        private: true,
        scripts: {
            start: "webpack serve --mode development --open --hot",
            build: "webpack --mode production"
          },
        husky: {
            hooks: {
              "pre-commit": "lint-staged"
            }
          },
        "lint-staged": {
            "./src/*.{js,jsx,ts,tsx}": [
              "npx prettier --write",
              "eslint src/*.js --fix-dry-run",
            ]
          }
      };

    // make package.json
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + os.EOL); 

    // copy the config files to root of package
    fs.copySync(path.join(__dirname, "../config"), root); 


    const templateDir = path.join(templatePath, 'template');

    //copy the template dir to the root 
    if (fs.existsSync(templateDir)) {

      console.log(`\nCopying the template files into your ${chalk.cyan(projectName)} directory. This might take a moment.\n`)
      fs.copySync(templateDir, root);

    } else {

      console.error(
        chalk.red(`Could not locate supplied template.`)
      );
      return;
    }

    //merge the template.json with the appPackage
    const dependencies = await merge(root, templatePath);

    process.chdir(root);

    console.log(chalk.cyan('Installing packages. This might take a couple of minutes.\n'))

    //installing dependencies
    await install(dependencies);

    
    console.log(`\n${chalk.green('Success!')} Created ${projectName}`);
    console.log('Inside that directory, you can run several commands\n');
    console.log('We suggest that you begin by typing:\n');
    console.log(chalk.cyan('  cd'), projectName);
    console.log(`  ${chalk.cyan(`npm start`)}\n`);
    console.log(`Happy Coding!`);
    console.log('\u00a9 sprinklr\n');

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