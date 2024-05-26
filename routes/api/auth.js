const express = require("express");
const AuthController = require("../../controllers/authController.js");
const User = require("../../models/user.js");
const colors = require("colors");
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

// TODO GET /users/logout
router.get("/logout", AuthController.validateAuth, async (req, res, next) => {
  try {
    const header = req.get("authorization");
    if (!header) {
      return res
        .status(401)
        .json({ message: "E nevoie de autentificare pentru aceasta ruta." });
    }

    console.log(colors.bgYellow.italic.bold("--- Logout! ---"));
    const token = header.split(" ")[1];
    const payload = AuthController.getPayloadFromJWT(token);

    if (!payload) {
      console.log("Invalid token payload");
      return res.status(401).json({ message: "Invalid token." });
    }

    const filter = { _id: payload.userId };
    const user = await User.findOne(filter);

    if (!user) {
      console.log("User not found:", filter);
      return res.status(401).json({ message: "Not authorized" });
    }

    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// TODO GET /users/current
router.get("/current", AuthController.validateAuth, async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
