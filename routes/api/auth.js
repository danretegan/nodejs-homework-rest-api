const express = require("express");
const AuthController = require("../../controllers/authController.js");
const router = express.Router();

// TODO Validare payload pentru signup:
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

// TODO Validare payload pentru LOGIN:
function validateLoginPayload(data) {
  const { email, password } = data;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    return "Email and password are required";
  }

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  return null;
}

// TODO POST /users/signup
router.post("/signup", async (req, res) => {
  try {
    const validationError = validateSignupPayload(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const newUser = await AuthController.signup(req.body);
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    if (error.message === "Email in use") {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

// TODO POST /users/login
router.post("/login", async (req, res) => {
  try {
    const validationError = validateLoginPayload(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { token, user } = await AuthController.login(req.body);
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
