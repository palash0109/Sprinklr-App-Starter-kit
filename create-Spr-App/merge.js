const fs = require('fs-extra');
const os = require('os');
const path = require('path');
let { dependencies } = require('./constants')

/* It merges template.json with the default package.json 
   and returns the updated dependencies array and updated package.json
 */

function merge(appPath, templatePath)
{
    const appPackage = require(path.join(appPath, 'package.json'));

    const templateJsonPath = path.join(templatePath, 'template.json');

    let templateJson = {};
    if (fs.existsSync(templateJsonPath)) {
      templateJson = require(templateJsonPath);
    }

    const templatePackageToMerge = ['dependencies', 'scripts'];

    const templatePackageToReplace = Object.keys(templateJson).filter(key => {
        return (
          !templatePackageToMerge.includes(key)
        );
      });

      const templateScripts = templateJson.scripts || {};
      appPackage.scripts = Object.assign(
        {
            start: "webpack serve --mode development --open --hot",
            build: "webpack --mode production"
        },
        templateScripts
      );

      templatePackageToReplace.forEach(key => {
        appPackage[key] = templateJson[key];
      });

      fs.writeFileSync(
        path.join(appPath, 'package.json'),
        JSON.stringify(appPackage, null, 2) + os.EOL
      );




      const dependenciesToInstall = Object.entries({
        ...templateJson.dependencies,
        ...templateJson.devDependencies,
      });
      if (dependenciesToInstall.length) {
        dependencies = dependencies.concat(
          dependenciesToInstall.map(([dependency, version]) => {
            return `${dependency}@${version}`;
          })
        );
      }

      return {...appPackage, dependencies};
    
}

module.exports = {
    merge
}