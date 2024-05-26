const express = require("express");
const User = require("../../models/user.js");

const router = express.Router();

// TODO Validation function:
function validateSignupPayload(data) {
  const { email, password } = data;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    return "Email and password are required";
  }

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  return null;
}

// TODO POST /users/signup:
router.post("/signup", async (req, res) => {
  try {
    //! Validate the request payload:
    const validationError = validateSignupPayload(req.body);

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    const { email, password } = req.body;

    // TODO Check if the user already exists:
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email in use",
      });
    }

    //! Create a new user:
    const newUser = new User({ email });
    newUser.setPassword(password);

    await newUser.save();

    //! Return success response:
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    //! Handle server errors:
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
