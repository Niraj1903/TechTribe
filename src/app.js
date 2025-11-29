const { login } = require("./middlewares/auth");

const express = require("express"); // this is getting express from node modules

const app = express(); // this is calling express js application / instance of express js application

// app.use("/test", (req, res) => {
//This will match all the HTTP method API call to /test
//   res.send("Hello form Nodemon");
// });

// app.get("/user", (req, res) => {
//   res.send("This is GET Request"); // This will only handle GET call to /user
// });

// app.post("/user", (req, res) => {
//   res.send("This is POST Request ");
// });

// app.use("/hello/2", (req, res) => {
//   res.send("This is hello 2");
// });

// app.use("/hello", (req, res) => {
//   res.send("This is hello ");
// });

// app.use("/", (req, res) => {
//   res.send("This is Dashboard"); //In Routes order Matters (** Very Important**)
// });

// app.get(
//   "/test",
//   (req, res) => {
//     res.send("This is 1st rest Handle");
//   },
//   next(),
//   (req, res) => {
//     res.send("This is 2nd response ");
//   }
// );

// app.use(
//   "/test",
//   (req, res, next) => {
//     res.send("1st Response");
//     next();
//   },

//   (req, res, next) => {
//     res.send("2nd Response");
//     next();
//   },
//   (req, res) => {
//     res.send("3rd Response");
//   }
// );

// app.get(
//   "/test",
//   (req, res, next) => {
//     next();
//     res.send("1st Response");
//   },
//   [
//     (req, res, next) => {
//       next();
//       res.send("2nd Response");
//     },
//     (req, res) => {
//       res.send("3rd Response");
//     },
//   ]
// );

// app.use("/", (req, res, next) => {
//   next();
// });

// app.get(
//   "/test",
//   (req, res, next) => {
//     res.end("This is the end ");
//     next();

//     res.send("This is request handle");
//   },
//   (req, res) => {
//     res.send("this is request handler not middleware");
//   }
// );

// app.use("/admin/user", login, (req, res) => {
//   res.send("Login success");
// });

app.get("/getUserData", (req, res) => {
  throw new Error("test");
  res.send("User Data Send");
});
// app.use((err, req, res, next) => {
//   if (err) {
//     res.status(500).send("This is status 500 server error");
//   }
// });

app.listen(3000); // app is listrning to 3000 port
