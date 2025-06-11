const asyncHandler = require("express-async-handler");
const News = require("../models/newsModel");

// @desc Get all News
// @route GET /api/news
// @access Private
const getNews= asyncHandler(async (req, res) => {
  const events = await News.find();
  res.status(200).json(events);
});

// @desc Get News by Section Type (e.g., Presbytery or Congregation)
// @route GET /api/news/:sectionType
// @access Private
const getNewsBySection = asyncHandler(async (req, res) => {
  const { sectionType } = req.params;
  const events = await News.find({ sectionType }); // Filtering by sectionType
  if (!events) {
    res.status(404);
    throw new Error("No events found for this section");
  }
  res.status(200).json(events);
});

// @desc Create a new News
// @route POST /api/news
// @access Private
const createNews = async (req, res) => {
  try {
    console.log("===> Hitting createEvent endpoint");
    console.log("===> Title:", req.body.title);
    console.log("===> Description:", req.body.description);
    console.log("===> SectionType:", req.body.sectionType); // Capture sectionType
    console.log("===> SectionName:", req.body.sectionName); // Capture sectionName
    console.log("===> File:", req.file);

    
    const news = await News.create({
      title: req.body.title,
      description: req.body.description,
      sectionType: req.body.sectionType,
      sectionName: req.body.sectionName,
      imagePaths: req.files.map((file) => file.path), // map all file paths
    });

    console.log("===> Event saved:", news);

    res.status(201).json(news);
  } catch (error) {
    console.error("===> Error creating event:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Update News
// @route PUT /api/news/:id
// @access Private
const updateNews = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    res.status(404);
    throw new Error("Event not found");
  }

  const updatedData = { ...req.body };
  if (req.file) {
    updatedData.imagePath = req.file.path;
  }

  const updatedEvent = await News.findByIdAndUpdate(
    req.params.id,
    updatedData,
    {
      new: true,
    }
  );

  res.status(200).json(updatedEvent);
});

// @desc Delete News
// @route DELETE /api/news/:id
// @access Private
const deleteNews = asyncHandler(async (req, res) => {
  const event = await News.findById(req.params.id);
  if (!news) {
    res.status(404);
    throw new Error("Event not found");
  }

  await News.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Event deleted successfully" });
});
module.exports = { getNews, getNewsBySection, createNews, updateNews, deleteNews };
