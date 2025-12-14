const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["m", "f", "male", "female", "others"].includes(value)) {
          throw new Error("Please Enter a Valid Gender");
        }
      },
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email address is not valid");
        }
      },
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
