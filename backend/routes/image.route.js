const express = require('express');

const UploadSvc = require("../services/upload.svc");
const ImageController = require('../controllers/image.ctrl');

const router = express.Router();

router.get('/get', ImageController.getAllImages);
router.post('/create', UploadSvc.uploadSingleImage, ImageController.createImage);
router.put('/update/:id', UploadSvc.uploadSingleImage, ImageController.updateImage);
router.delete('/delete/:id', ImageController.deleteImage);

module.exports = router;