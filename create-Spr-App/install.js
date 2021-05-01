const path = require('path');
var spawn = require('cross-spawn');
const fs = require('fs-extra');

function install(dependencies)
{
    let command;
    let args;
 
    command = 'npm';
    args = [
      'install',
       '--save',
       '--loglevel',
       'error',
      ].concat(dependencies);


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

