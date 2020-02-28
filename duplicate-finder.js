function findDuplicates(files) {
    const dup = [];

    files.forEach(fileObj => {
        const filtered = files.filter(obj => obj.file === fileObj.file);
        const inDups = dup.filter(obj => obj.file === fileObj.file);

        if (filtered.length > 1 && inDups.length === 0) {
            dup.push({
                file: fileObj.file,
                dup: filtered.map(x => `${x.path} - ${x.size} MB`)
            });
        }
    });

    return dup;
}

module.exports = findDuplicates;
