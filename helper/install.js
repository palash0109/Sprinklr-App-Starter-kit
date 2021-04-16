const path = require('path');
var spawn = require('cross-spawn');
const fs = require('fs-extra')

function install(templatePath)
{
    let command;
    let args;
    let dependencies = [
        'react', 
        'react-dom',
        'eslint-config-react-app', 
        '@typescript-eslint/eslint-plugin', 
        '@typescript-eslint/parser', 
        '@babel/eslint-parser', 
        'eslint', 
        'eslint-plugin-flowtype', 
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
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
        'css-loader',
        'webpack-merge'
    ]
    command = 'npm';
    args = ['install', '--save'].concat(dependencies);

    if(templatePath)
    {
        const templateJsonPath = path.join(templatePath, 'template.json');

        let templateJson = {};
        if (fs.existsSync(templateJsonPath)) {
          templateJson = require(templateJsonPath);
        }
        const dependenciesToInstall = Object.entries({
            ...templateJson.dependencies,
            ...templateJson.devDependencies,
          });
          if (dependenciesToInstall.length) {
            args = args.concat(
              dependenciesToInstall.map(([dependency, version]) => {
                return `${dependency}@${version}`;
              })
            );
          }
    }



    return new Promise((resolve, reject) => {
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
    install
}

