const { ref } = require("joi");
const mongoose = require("mongoose");
//const { schema } = require("./listing");
const Schema = mongoose.Schema;

const reveiwSchema = new Schema({
  comment: { type: String },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Review", reveiwSchema);
