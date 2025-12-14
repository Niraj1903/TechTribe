const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
  },
  Gender: {
    type: String,
  },
  age: {
    type: Number,
    min: 18,
  },
  emailId: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
  },
  about: {
    type: String,
    default: "Plese write about your self ",
  },
  photURL: {
    type: String,
  },
  skills: {
    type: [String],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
