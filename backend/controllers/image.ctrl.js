const path = require("path");

const ImageModel = require("../models/image.mdl");
const _deleteImage = require("../utils/deleteImage");

const uploadDir = path.join(__dirname, '..', 'uploads');

exports.getAllImages = async (req, res) => {
  try {
    const images = await ImageModel.find();
    if(!images) 
      return res.json({ success: false, msg: "images not found" });
    return res.json({ success: true, data: images });
  } catch (err) {
    console.error("Failed to fetch images: ", err);
    return res.status(500).json({ success: false, msg: err.message });
  }
}

exports.createImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "image is required" });
  if (!req.body.description) return res.status(400).json({ msg: "description is required" });
  if (typeof req.body.description !== 'string') 
      return res.status(400).json({ msg: "description must be string" });

  try {
    const { filename } = req.file;
    const { description } = req.body;
    const url = '/uploads/' + filename;
  
    const createdImage = await ImageModel.create({ 
      filename: filename, 
      description: description,
      url: url
    });
    return res.status(200).json({ success: true, msg: "Image created" }); 

  } catch (err) {
    console.error("failed to create image: ", err);
    return res.status(500).json({ success: false, msg: err.message });
  }
}

exports.updateImage = async (req, res) => {
  if (!req.body.description) return res.status(400).json({ msg: "description is required" });
  if (typeof req.body.description !== 'string' ) 
    return res.status(400).json({ msg: "description must be string"});

  try {
    const { filename } = req.file || req.body;
    const { id } = req.params;
    const { description } = req.body;
    const url = "/uploads/" + filename;

    //when new image uploaded, delete old uploaded image
    if (req.file)
    {
      const oldImage = await ImageModel.findById(id);
      if(!oldImage) 
        return res.status(400).json({ success: false, msg: "image not found" });
      const full_url = path.join(uploadDir, oldImage.filename);
      _deleteImage(full_url);
    }

    const updatedImage = await ImageModel.findByIdAndUpdate(id, {
      filename: filename,
      description: description,
      url: url
    }, {
      new: true
    }); 
    return res.status(200).json({ success: true, data: updatedImage });
  } catch (err) {
    console.error("Image update failed: ", err);
    return res.status(500).json({ success: false, msg: err.message });
  }
}

exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    const oldImage = await ImageModel.findById(id);
    if(!oldImage || oldImage == undefined) 
      return res.status(400).json({ success: false, msg: "image not found" });

    //delete old image
    const full_url = path.join(uploadDir, oldImage.filename);
    const deleted = _deleteImage(full_url);
    if (!deleted) return res.status(400).json({ success: false, msg: "previous image not deleted" });
    await ImageModel.deleteOne({ _id: id });
    return res.status(200).json({ success: true, msg: "image deleted" });
    
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message});
  }
}
