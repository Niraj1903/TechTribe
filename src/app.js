const express = require("express"); // this is getting express from node modules
const validator = require("validator");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookierParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express(); // this is calling express js application / instance of express js application
require("./config/database");
const { User } = require("./models/user");

const { connectDatabase } = require("./config/database");

app.use(express.json()); // this is middleware for reading json file & convets to js Object & add js object back to request obj in the body
app.use(cookierParser());
//SignUp API

app.post("/signUp", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    const token = await jwt.sign({ _id: user._id }, "Tiger@Lion");
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
    res.status(400).send("Error : " + err.message);
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
    res.status(400).send("Error : " + err.message);
  }
});

//Delete User

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findOneAndDelete(userId);
    res.send("User Deleted");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

// Update Data of a user

app.patch("/user", async (req, res) => {
  const data = req.body;
  const userId = req.body.userId;

  try {
    const user = await User.findOneAndUpdate(userId, data, {
      returnDocument: "after",
    });
    console.log(user);
    res.send("update sucess");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//Profile API

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    console.log(cookies);
    res.send("Cookies send successfully.");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
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
