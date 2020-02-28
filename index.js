const ora = require('ora');

const walker = require('./walker');
const duplicateFinder = require('./duplicate-finder');

// const pathToRoot = 'd:/test';
const pathToRoot = 'd:\\books\\.NET';
// const pathToRoot = 'd:\\books';
const extension = '.pdf';

const msg = `Discovering files in [${pathToRoot}] with extension [${extension}]`;
const spinner = ora(msg).start();
const fileList = [];

walker(pathToRoot, extension, fileList)
    .then(() => {
        const duplicates = duplicateFinder(fileList);

        console.log('\n\nDuplicates:\n\n', duplicates);

        console.log('\n---------------')
        console.log(`files: [${fileList.length}]`);
        console.log(`dupliacates: [${duplicates.length}]`);

        spinner.stop();
    });


