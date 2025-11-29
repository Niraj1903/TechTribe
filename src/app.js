const express = require("express"); // this is getting express from node modules

const app = express(); // this is calling express js application / instance of express js application
require("./config/database");
const { User } = require("./models/user");

const { connectDatabase } = require("./config/database");

app.post("/signUp", async (req, res) => {
  const userObj = {
    firstName: "Niraj",
    lastName: "Singh",
    gender: "M",
    emailId: "nirajsingh@test.com",
    password: "test.com",
    age: 55,
  };
  const user = new User(userObj);
  await user.save();
  res.send("user data added succesfully");
});

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
