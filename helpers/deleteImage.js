const fs = require("fs");

function deleteImage(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); 
      return true;
    } else {
      console.log("File not found:", filePath);
      return false;
    }
  } catch (err) {
    console.error("Delete error:", err.message);
    return false;
  }
}

module.exports = deleteImage;
