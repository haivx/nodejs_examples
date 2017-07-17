/**
 * Created by xuanhai on 11/07/2017.
 */
const path = require('path');
const fs = require('fs');
const sourcePath = '/home/xuanhai/Desktop/CSS-framework';
let str = "";
function discoverAll(director) {
    if (fs.statSync(director).isDirectory()) {
        let list = fs.readdirSync(director)
        list.forEach((file) => {
            a = director + '/' + file;
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
        let aFile = path.basename(director);
        console.log(str + aFile);
    }
}
