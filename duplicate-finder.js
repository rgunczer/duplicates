function getFileInfo(fileObj) {
    return `${fileObj.path} - ${fileObj.size} MB`;
}

function compare(a, b) {
    return (a.file > b.file) ? 1 : -1;
}

function findDuplicatesUsingFiltering(files) {
    const prom = new Promise((resolve, reject) => {
        const dup = [];

        files.forEach(fileObj => {
            const filtered = files.filter(obj => obj.file === fileObj.file);
            const inDups = dup.filter(obj => obj.file === fileObj.file);

            if (filtered.length > 1 && inDups.length === 0) {
                dup.push({
                    file: fileObj.file,
                    dup: filtered.map(x => getFileInfo(x))
                });
            }
        });

        dup.sort(compare);

        resolve(dup);
    });
    return prom;
}

function findDuplicatesUsingSingleLoop(files) {

    const prom = new Promise((resolve, reject) => {
        const dups = [];

        files.sort(compare);

        let currentFile = files[0].file;
        for (let i = 1; i < files.length - 1; ++i) {
            if (files[i].file === currentFile) {
                const lastFile = dups.length > 0 ? dups[dups.length - 1].file : '';
                if (lastFile !== currentFile) {
                    dups.push({
                        file: currentFile,
                        dup: [getFileInfo(files[i])]
                    });
                } else {
                    dups[dups.length - 1].dup.push(getFileInfo(files[i]));
                }
            } else {
                currentFile = files[i].file;
            }
        }

        dups.sort(compare);

        resolve(dups);
    });
    return prom;
}

module.exports = {
    findDuplicatesUsingFiltering,
    findDuplicatesUsingSingleLoop
};
