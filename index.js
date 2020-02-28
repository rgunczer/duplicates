const fs = require('fs');
const path = require('path');

console.log('duplicates');
console.log(__dirname);

function walkSync(dir, extension, lst) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            lst = walkSync(dir + '/' + file, extension, lst);
        } else {
            if (path.extname(file) === extension) {
                lst.push(file);
            }
        }
    });

    return lst;
};

function findDuplicates(files) {
    const dup = [];
    let prev = files[0];

    for (let i = 1; i < files.length - 1; ++i) {
        const file = files[i];
        if (prev === file) {
            dup.push(file);
        } else {
            prev = file;
        }
    }
    return dup;
}

// const pathToRoot = 'd:\\test';
const pathToRoot = 'd:\\books\\.NET';
const ext = '.pdf';

const fileList = [];
walkSync(pathToRoot, ext, fileList);

fileList.sort();

console.log(fileList.length);
console.log(fileList);

const duplicates = findDuplicates(fileList);

console.log(duplicates);
