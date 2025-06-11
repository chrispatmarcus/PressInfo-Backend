const Sermon = require("../models/sermonModel");

const postSermon = async (req, res) => {
  try {
    const { congregation, title, text, preacher } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "File is required." });

    const fileUrl = `http://localhost:5001/uploads/sermons/${file.filename}`;

    const newSermon = new Sermon({
      congregation,
      title,
      text,
      fileUrl,
      preacher,
    });

    await newSermon.save();

    res
      .status(201)
      .json({ message: "Sermon uploaded successfully", sermon: newSermon });
  } catch (error) {
    console.error("Error uploading sermon:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getSermons = async (req, res) => {
  const sermons = await Sermon.find();
  res.status(200).json(sermons);
};

const getSermonsByCongregation = async (req, res) => {
  try {
    const { congregation } = req.params;

    const sermons = await Sermon.find({ congregation }).sort({ createdAt: -1 });

    res.status(200).json(sermons);
  } catch (error) {
    console.error("Error fetching sermons:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { postSermon, getSermonsByCongregation, getSermons };
