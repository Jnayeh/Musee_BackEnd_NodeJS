const fs = require("fs");

const deleteImg = (photo_folder, img) => {
  const path = photo_folder + img;
  console.log(path);
  try {
    //file removed
    fs.unlinkSync(path);
  } catch (err) {
    console.error(err);
  }
};

module.exports = deleteImg;
