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
    img.name = img.name.replace(" ", "_");
    img.mv(photo_folder + date + "_" + img.name);
    _obj[image] = date + "_" + img.name;
  }
  return _obj;
};
module.exports = saveImg;
