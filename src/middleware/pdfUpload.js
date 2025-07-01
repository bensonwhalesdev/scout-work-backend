const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // timestamp.pdf
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /pdf/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDFs allowed"));
  }
};

const uploadResume = multer({ storage, fileFilter });

module.exports = uploadResume;
