const express = require("express"); // this is getting express from node modules

const app = express(); // this is calling express js application / instance of express js application
require("./config/database");
const { User } = require("./models/user");

const { connectDatabase } = require("./config/database");

app.use(express.json()); // this is middleware for reading json file & convets to js Object & add js object back to request obj in the body

app.post("/signUp", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user data sucessfully added");
  } catch (err) {
    res.status(400).send("request failed" + err.status);
  }
});

//Get User by Email

app.get("/user", async (req, res) => {
  const user = req.body.emailId;
  try {
    const userByEmail = await User.find({ emailId: user });
    if (userByEmail.length === 0) {
      res.status(404).send("Cannot Find Email");
    } else {
      res.send(userByEmail);
    }
  } catch (err) {
    res.status(400).send("Cannot find your search" + err.status);
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

//Delete User

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findOneAndDelete(userId);
    res.send("User Deleted");
  } catch (err) {
    res.status(400).send("Data canot be deleted" + err);
  }
});

// Update Data of a user

app.patch("/user", async (req, res) => {
  const data = req.body;
  const userId = req.body.userId;

  try {
    await User.findOneAndUpdate(userId, data);
    res.send("update sucess");
  } catch (err) {
    res.status(400).send("Update failed");
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
