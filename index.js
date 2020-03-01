const ora = require('ora');

const { save } = require('./serializer');
const walker = require('./walker');
const {
    findDuplicatesUsingFiltering,
    findDuplicatesUsingSingleLoop
} = require('./duplicate-finder');

function dumpResultAndStats(title, data) {
    const { result, hrend } = data;
    // console.log(`\n\nDuplicates [${title}]:\n\n ${JSON.stringify(data.result, null, 2)}`);

    save(result, `duplicates-with-${title.toLowerCase()}.json`);

    console.log(`\nDuplicates found: [${result.length}], "${title}" method took [${hrend[0]}s ${hrend[1] / 1000000}ms]`);
}

// const pathToRoot = 'd:/test';
// const pathToRoot = 'd:\\books\\.NET';
const pathToRoot = 'd:\\books';
const extension = '.pdf';

const msg = `Discovering files in [${pathToRoot}/*${extension}]`;
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

                console.log(`\nFiles found in (${pathToRoot}/*${extension}): [${fileList.length}]`);

                dumpResultAndStats('Filtering', duplicates[0]);
                dumpResultAndStats('Looping', duplicates[1]);

                spinner.stop();

                const hrend = process.hrtime(hrstart);
                console.info('\nTotal execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
            });
    });


