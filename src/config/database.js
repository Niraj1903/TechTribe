const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose.connect(
    "mongodb+srv://Niraj:ZECz4ISfftgOo00U@myproject.zsaagvb.mongodb.net/TechTribe"
  );
};

module.exports = connectDatabase;
