const Comment = require("../models/commentModel");
const Christian = require("../models/commentModel"); // for user info

// Create a comment
const createComment = async (req, res) => {
  try {
    const { eventId, text } = req.body;
    const userId = req.user.id; // Make sure your auth middleware attaches user

    const comment = await Comment.create({ eventId, userId, text });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments for an event
const getCommentsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const comments = await Comment.find({ eventId })
      .populate("userId", "username") // only populate fields that exist 
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { createComment, getCommentsByEvent };
