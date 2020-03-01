const fs = require('fs');
const path = require('path');

function save(obj, fileName) {
    let fullPath = path.join(__dirname, 'output');

    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
    }

    fullPath = path.join(fullPath, fileName);

    const data = JSON.stringify(obj, null, 2);

    fs.writeFileSync(fullPath, data);
}

module.exports = {
    save
};
