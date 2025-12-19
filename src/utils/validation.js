const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName) {
    throw new Error("Please enter your Name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please Enter valid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter a Strong Password");
  }
};

module.exports = validateSignupData;
