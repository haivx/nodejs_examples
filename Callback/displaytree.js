const path = require('path');
const fs = require('fs');
const sourcePath = '/home/xuanhai/Desktop/nodejs_examples/directory_tree/CSS-framework';

let str = "";
function discoverAll(director) {
    fs.stat(director, (err, stats) => {
        if (err) throw new Error('Wrong inputFolder')
        if (stats.isDirectory()) {
            fs.readdir(director, (err, list) => {
                if (err) throw new Error('err')
                list.forEach(file => {
                    let a = director + '/' + file;
                    fs.stat(a, (err, stats) => {
                        if (err) throw new Error('wrong inputFolder')
                        if (stats.isDirectory()) {
                            discoverAll(a);
                            str += '|   '
                            console.log(str + '├──' + file);
                            str = str.substring(4)
                        } else {
                            console.log(str + '|   └──' + file)
                        }
                    })
                })
            })
        } else {
            str = str + '    '
            let aFile = path.basename(director);
            console.log(str + aFile);
        }
    })
}


try {
    discoverAll(sourcePath);

} catch (error) {
    console.log(error);
}