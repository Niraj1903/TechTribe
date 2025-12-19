const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validateSignupData = require("../utils/validation");

const authRouter = express.Router();

//SignUp API

authRouter.post("/signUp", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    validateSignupData(req);

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("user data sucessfully added");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//LOGIN API

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    const token = await user.getJWT();
    res.cookie("token", token);

    if (!user) {
      throw new Error("Invalid Credentails");
    }

    const validPassord = await bcrypt.compare(password, user.password);
    if (!validPassord) {
      throw new Error("Invalid Credentails");
    } else {
      res.send("Login successful");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//logout API

authRouter.post("/logout", async (req, res) => {
  await res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("Logout Successfull");
});

module.exports = authRouter;
