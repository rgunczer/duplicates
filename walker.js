const fs = require('fs');
const path = require('path');

function getFileSizeInMegabytes(fileStat) {
    const fileSizeInBytes = fileStat["size"];
    const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;

    return fileSizeInMegabytes;
}

function walk(dir, filterExtension, discoveredFiles) {

    const lst = discoveredFiles || [];

    const prom = new Promise((resolve, reject) => {

        fs.readdir(dir, (err, files) => {
            const proms = [];

            files.forEach(file => {
                const fullPath = `${dir}/${file}`;
                const fileStat = fs.statSync(fullPath);

                if (fileStat.isDirectory()) {
                    const subProm = walk(fullPath, filterExtension, lst);
                    proms.push(subProm);
                } else {
                    if (path.extname(file) === filterExtension) {
                        lst.push({
                            file,
                            path: fullPath,
                            size: getFileSizeInMegabytes(fileStat)
                        });
                    }
                }
            });

            Promise.all(proms).then(() => {
                resolve(lst);
            });
        });

    });

    return prom;
};

module.exports = walk;
