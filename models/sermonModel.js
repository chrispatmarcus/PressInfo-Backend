const mongoose = require("mongoose");

const sermonSchema = new mongoose.Schema(
  {
    congregation: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    preacher: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sermon", sermonSchema);
