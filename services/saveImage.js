const fs = require("fs");
const deleteImg = require("./deleteImg");

const saveImg = (req, _obj, photo_folder, image, old_img) => {
  if (req.files[image]) {
    //Use the name of the input field (i.e. "img") to retrieve the uploaded file
    let img = req.files[image];
    let date = new Date().getTime();

    // REMOVE OLD IMAGE FROM BACKEND
    if (old_img) {
      deleteImg(photo_folder, old_img);
    }

    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    img.mv(photo_folder + date + " - " + img.name);
    _obj[image] = date + " - " + img.name;
  }
  return _obj;
};
module.exports = saveImg;
