const fs = require('fs');
const path = require('path');

//delete file
const deleteFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
    console.log("Old file deleted: ", filePath);
    return true;
  } catch (err) {
    console.log("File delete error: ", err);
    return false;
  }
}

module.exports = deleteFile