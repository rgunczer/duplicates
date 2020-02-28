const walker = require('./walker');
const duplicateFinder = require('./duplicate-finder');

console.log('duplicates');
console.log(__dirname);


function compare(a, b) {
    if (a.file < b.file) {
        return -1;
    }
    if (a.file > b.file) {
        return 1;
    }
    return 0;
}

// const pathToRoot = 'd:/test';
const pathToRoot = 'd:\\books\\.NET';
const extension = '.pdf';

const fileList = [];
walker(pathToRoot, extension, fileList);

fileList.sort(compare);

console.log(fileList.length);
console.log(fileList);

const duplicates = duplicateFinder(fileList);

console.log(`dupliacates - [${duplicates.length}]`);
// console.log(JSON.stringify(duplicates));
console.log(duplicates);
