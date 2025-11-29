const express = require("express"); // this is getting express from node modules

const app = express(); // this is calling express js application / instance of express js application
require("./config/database");

const { connectDatabase } = require("./config/database");

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
