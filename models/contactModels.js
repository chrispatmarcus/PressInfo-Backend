const mongoose = require("mongoose");
const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "please add the contact email address"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "please add the contact phone number"],
    },
  },
  {
    Timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
