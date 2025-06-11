const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add an event title"],
    },
    imagePaths: [
      {
        type: String,
        required: [true, "Please upload an image"],
      },
    ],
    description: {
      type: String,
      required: [true, "Please add an event description"],
    },
    sectionType: {
      type: String,
      enum: ["Presbytery", "Congregation"],
      required: true,
    },
    sectionName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("News", newsSchema);
