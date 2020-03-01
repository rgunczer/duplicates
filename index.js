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

const hrstart = process.hrtime();

walker(pathToRoot, extension)
    .then(fileList => {
        spinner.text = 'Finding duplicates';
        spinner.render();

        const prom1 = findDuplicatesUsingFiltering(fileList);
        const prom2 = findDuplicatesUsingSingleLoop(fileList);

        Promise.all([prom1, prom2])
            .then(duplicates => {
                spinner.text = 'Done';
                spinner.render();

                console.log('\n\nDuplicates [Filtering]:\n\n', duplicates);

                console.log('\n---------------')
                console.log(`files: [${fileList.length}]`);
                console.log(`dupliacates: [${duplicates.length}]`);

                console.log('\n\nDuplicates [Loop]:\n\n', duplicates);

                console.log('\n---------------')
                console.log(`files: [${fileList.length}]`);
                console.log(`dupliacates: [${duplicates.length}]`);

                spinner.stop();

                const hrend = process.hrtime(hrstart);
                console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
            });
    });


