const express = require("express");
const multer = require("multer");
const {
  postSermon,
  getSermonsByCongregation,
  getSermons,
} = require("../controllers/sermonController");

const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/sermons"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// POST: upload sermon
router.post("/upload", upload.single("file"), postSermon);

// GET: sermons for a congregation
router.get("/:congregation", getSermonsByCongregation);
router.get("/", getSermons);

module.exports = router;
