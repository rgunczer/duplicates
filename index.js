const ora = require('ora');

const walker = require('./walker');
const {
    findDuplicatesUsingFiltering,
    findDuplicatesUsingSingleLoop
} = require('./duplicate-finder');

// const pathToRoot = 'd:/test';
// const pathToRoot = 'd:\\books\\.NET';
const pathToRoot = 'd:\\books';
const extension = '.pdf';

const msg = `Discovering files in [${pathToRoot}] with extension [${extension}]`;
const spinner = ora(msg).start();

walker(pathToRoot, extension)
    .then(fileList => {
        spinner.text = 'Finding duplicates';
        spinner.render();

        findDuplicatesUsingFiltering(fileList)
            .then(duplicates => {
                spinner.text = 'Done';
                spinner.render();

                console.log('\n\nDuplicates [Filtering]:\n\n', duplicates);

                console.log('\n---------------')
                console.log(`files: [${fileList.length}]`);
                console.log(`dupliacates: [${duplicates.length}]`);

                spinner.stop();
            });

        findDuplicatesUsingSingleLoop(fileList)
            .then(duplicates => {
                spinner.text = 'Done';
                spinner.render();

                console.log('\n\nDuplicates [Loop]:\n\n', duplicates);

                console.log('\n---------------')
                console.log(`files: [${fileList.length}]`);
                console.log(`dupliacates: [${duplicates.length}]`);

                spinner.stop();
            });
    });


