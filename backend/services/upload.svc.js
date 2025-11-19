const multer = require("multer");
const path = require("path");
const fs = require("fs");

//set store configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("uploads folder created.");
}

//validate mime type
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("only JPG, JPEG, PNG allowed"), false);
}

const upload = multer({
  storage,
  fileFilter
});

module.exports = {
  uploadSingle: upload.single('file'),
  uploadSingleImage: upload.single('image'),
}
