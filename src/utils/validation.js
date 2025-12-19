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

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "emailId",
    "age",
    "gender",
    "firstName",
    "lastName",
    "skills",
    "about",
    "photoURL",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validateSignupData, validateEditProfileData };
