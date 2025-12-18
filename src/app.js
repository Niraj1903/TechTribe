const express = require("express"); // this is getting express from node modules
const validator = require("validator");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookierParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

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

//Profile API

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
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
