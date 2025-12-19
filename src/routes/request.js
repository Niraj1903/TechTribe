const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middlewares/auth");

requestRouter.post("/sendRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " sent you a connection request");
  } catch (err) {
    res.status(400).send("Skills mismatch");
  }
});

module.exports = requestRouter;
