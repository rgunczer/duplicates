const fs = require('fs');
const path = require('path');

function walk(dir, filterExtension, lst) {

    const prom = new Promise((resolve, reject) => {

        fs.readdir(dir, (err, files) => {

            const proms = [];

            files.forEach(file => {
                const fullPath = dir + '/' + file;
                const fileStat = fs.statSync(fullPath);

                if (fileStat.isDirectory()) {
                    const subProm = walk(fullPath, filterExtension, lst);
                    proms.push(subProm);
                } else {
                    if (path.extname(file) === filterExtension) {
                        lst.push({
                            file,
                            path: fullPath
                        });
                    }
                }
            });

            Promise.all(proms).then(() => {
                resolve('ok');
            });

        });

    });

    return prom;
};

module.exports = walk;
