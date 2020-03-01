const ora = require('ora');

const { save } = require('./serializer');
const walker = require('./walker');
const {
    findDuplicatesUsingFiltering,
    findDuplicatesUsingSingleLoop
} = require('./duplicate-finder');

function dumpStat(title, fileList, data) {
    console.log(`\n\nDuplicates [${title}]:\n\n`, data);

    save(data, `duplicates-with-${title.toLowerCase()}.json`);

    console.log('\n---------------')
    console.log(`files: [${fileList.length}]`);
    console.log(`dupliacates: [${data.length}]`);
}

// const pathToRoot = 'd:/test';
const pathToRoot = 'd:\\books\\.NET';
// const pathToRoot = 'd:\\books';
const extension = '.pdf';

const msg = `Discovering files in [${pathToRoot}] with extension [${extension}]`;
const spinner = ora(msg).start();

const hrstart = process.hrtime();

walker(pathToRoot, extension)
    .then(fileList => {
        spinner.text = 'Finding duplicates';
        spinner.render();

        Promise.all([
            findDuplicatesUsingFiltering(fileList),
            findDuplicatesUsingSingleLoop(fileList)
        ])
            .then(duplicates => {
                spinner.text = 'Done';
                spinner.render();

                dumpStat('Filtering', fileList, duplicates[0]);
                dumpStat('Looping', fileList, duplicates[1]);

                spinner.stop();

                const hrend = process.hrtime(hrstart);
                console.info('\nTotal execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
            });
    });


