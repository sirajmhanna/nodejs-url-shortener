const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
      unique: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    views: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("url", URLSchema);
