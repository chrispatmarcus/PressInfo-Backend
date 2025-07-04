const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadHandler");
const { uploadSingle, uploadMultiple } = require("../middleware/uploadHandler");
const {
  getNews,
  getNewsBySection,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");
const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);

router.route("/").get(getNews).post(uploadMultiple, createNews); // File upload

router
  .route("/:id")
  
   .get(getNewsBySection)
  // .put(upload.single("image"), updateNews)
  .put(uploadMultiple, updateNews) // Update with multiple images
  .delete(deleteNews);

module.exports = router;
