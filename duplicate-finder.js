function getFileInfo(fileObj) {
    return `${fileObj.path} - ${fileObj.size} MB`;
}

function comparator(a, b) {
    return (a.file > b.file) ? 1 : -1;
}

function findDuplicatesUsingFiltering(files) {

    return new Promise((resolve, reject) => {
        const hrstart = process.hrtime();

        const result = [];

        files.forEach(fileObj => {
            const filtered = files.filter(obj => obj.file === fileObj.file);
            const inDups = result.filter(obj => obj.file === fileObj.file);

            if (filtered.length > 1 && inDups.length === 0) {
                result.push({
                    file: fileObj.file,
                    dup: filtered.map(x => getFileInfo(x))
                });
            }
        });

        result.sort(comparator);

        const hrend = process.hrtime(hrstart);

        resolve({
            result,
            hrend
        });
    });

}

function findDuplicatesUsingSingleLoop(files) {

    return new Promise((resolve, reject) => {
        const hrstart = process.hrtime();

        const result = [];
        let dupObj = {};

        files.sort(comparator);

        let prevFileName = files[0].file;
        for (let i = 1; i < files.length - 1; ++i) {
            const currentFileName = files[i].file;
            if (prevFileName === currentFileName) {

                if (dupObj.file === prevFileName) {
                    dupObj.dup.push(getFileInfo(files[i]));
                } else {
                    dupObj = {
                        file: currentFileName,
                        dup: [getFileInfo(files[i]), getFileInfo(files[i - 1])]
                    };
                    result.push(dupObj);
                }

            }
            prevFileName = currentFileName;
        }

        result.sort(comparator);

        const hrend = process.hrtime(hrstart);

        resolve({
            result,
            hrend
        });
    });

}

module.exports = {
    findDuplicatesUsingFiltering,
    findDuplicatesUsingSingleLoop
};
