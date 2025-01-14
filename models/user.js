//const { string, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const possportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(possportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
