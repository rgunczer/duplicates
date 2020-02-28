const ora = require('ora');

const walker = require('./walker');
const duplicateFinder = require('./duplicate-finder');


const spinner = ora('Discovering files...').start();

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
// const pathToRoot = 'd:\\books\\.NET';
const pathToRoot = 'd:\\books';
const extension = '.pdf';

const fileList = [];
walker(pathToRoot, extension, fileList).then(() => {

    fileList.sort(compare);

    // console.log(fileList);

    const duplicates = duplicateFinder(fileList);

    console.log(duplicates);

    console.log(`files: [${fileList.length}]`);
    console.log(`dupliacates: [${duplicates.length}]`);

    spinner.stop();

});


