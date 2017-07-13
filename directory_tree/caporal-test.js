/**
 * Test caporal
 */
const path = require('path');
const fs = require('fs');
const prog = require('caporal');
prog
  .version('1.0.0')
  .description('Display tree structure from a source path')
  .command('displayTree', 'Display tree directory')
  .argument('<sourcePath>', 'Search query')
  .action(function (args) {
    let newPath = args.sourcePath
    let str = ''
    const content = function discoverAll(newPath) {

      if (fs.statSync(newPath).isDirectory()) {
        let list = fs.readdirSync(newPath)
        list.forEach((file) => {
          a = newPath + '/' + file;
          if (fs.statSync(a).isDirectory()) {
            str += '    '
            console.log(str + '├──' + file);
            discoverAll(a);
            str = str.substring(4)
          } else {
            console.log(str + '    └──' + file)
          }
        })
      } else {
        str = str + '    '
        let aFile = path.basename(newPath);
        console.log(str + aFile);
      }
    }
    console.log(content(newPath))
  })

prog.parse(process.argv);