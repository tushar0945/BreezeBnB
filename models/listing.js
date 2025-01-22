const mongoose = require("mongoose");
const Review = require("./review");
const { string, required } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String, required: true }, // Fixed 'require' to 'required'
  description: { type: String },
  image: {
    url: String,
    filename: String,
  },
  price: { type: Number, required: true },
  location: { type: String },
  country: { type: String },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  category: {
    type: [String], // Array of strings
    enum: [
      "Rooms",
      "Iconic_Cities",
      "Mountains",
      "Castles",
      "Amazing_Pools",
      "Camping",
      "Farms",
      "Arctic",
      "Domes",
      "Beaches",
    ], // Allowed values
    required: true, // Ensures at least one category is provided
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Linstng = mongoose.model("Listing", listingSchema);
module.exports = Linstng;
