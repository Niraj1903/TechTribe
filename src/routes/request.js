const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middlewares/auth");
const connectionToSendRequest = require("../models/connectionRequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const friendRequest = new connectionToSendRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await friendRequest.save();

      res.json({
        message: "Connection Request send successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  }
);

module.exports = requestRouter;
