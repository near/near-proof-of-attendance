const fs = require('fs');

const writeFileSync = (filename, write) => {
  fs.writeFileSync(filename, write, console.log("file has been created"));
}

module.exports = {
  writeFileSync
}