const path = require('path');

module.exports = path.dirname(process.mainModule.filename);

let _path = path.dirname(process.mainModule.filename);

console.log(_path);