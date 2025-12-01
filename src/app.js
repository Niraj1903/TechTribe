const express = require("express"); // this is getting express from node modules

const app = express(); // this is calling express js application / instance of express js application
require("./config/database");
const { User } = require("./models/user");

const { connectDatabase } = require("./config/database");

app.use(express.json());

app.post("/signUp", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user data sucessfully added");
  } catch (err) {
    res.status(400).send("request failed" + err.status);
  }
});

//feed API

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    if (user.length === 0) {
      res.status(404).send("cannot find");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("cannot find the user Email" + err.status);
  }
});

//connection to DB logic
connectDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log("listeing to port 300");
    }); // app is listrning to 3000 port
    console.log("connection to DB sucess");
  })
  .catch((err) => {
    console.error("DB connection failed");
  });
