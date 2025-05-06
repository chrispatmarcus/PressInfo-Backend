const express = require("express");
const router = express.Router();
const {
  createComment,
  getCommentsByEvent,
} = require("../controllers/commentController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/", validateToken, createComment); // post comment
router.get("/:eventId", getCommentsByEvent); // get comments for a specific event

module.exports = router;
