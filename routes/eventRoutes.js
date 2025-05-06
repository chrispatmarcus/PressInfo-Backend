const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadHandler");
const { uploadSingle, uploadMultiple } = require("../middleware/uploadHandler");
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsBySection,
} = require("../controllers/eventsController");
const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);

router.route("/").get(getEvents).post(uploadMultiple, createEvent); // File upload

router
  .route("/:id")
  .get(getEventsBySection)
  // .put(upload.single("image"), updateEvent)
  .put(uploadMultiple, updateEvent) // Update with multiple images
  .delete(deleteEvent);

module.exports = router;
