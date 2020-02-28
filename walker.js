const fs = require('fs');
const path = require('path');

function walkSync(dir, filterExtension, lst) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = dir + '/' + file;
        const fileStat = fs.statSync(fullPath);

        if (fileStat.isDirectory()) {
            lst = walkSync(fullPath, filterExtension, lst);
        } else {
            if (path.extname(file) === filterExtension) {
                lst.push({
                    file,
                    path: fullPath
                });
            }
        }
    });

    return lst;
};

module.exports = walkSync;
