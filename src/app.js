const express = require("express");
const app = express();
const connectDatabase = require("./config/database");
const cookierParser = require("cookie-parser");
app.use(express.json()); // this is middleware for reading json file & convets to js Object & add js object back to request obj in the body
app.use(cookierParser());

//ROUTES

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
