const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

//Profile API

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((i) => (loggedInUser[i] = req.body[i]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} Ypur Profile is Updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouter;
