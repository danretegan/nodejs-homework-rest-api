const passport = require("passport");
const colors = require("colors");
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const AuthController = {
  signup,
  login,
  validateAuth,
  getPayloadFromJWT,
};

const secretForToken = process.env.TOKEN_SECRET;

// TODO SIGNUP:
async function signup(data) {
  //! Validare pentru email și password:
  const { email, password } = data;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  //! Verificarea existenței utilizatorului:
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email in use");
  }

  //! Crearea unui nou utilizator:
  const newUser = new User({
    email: data.email,
    subscription: "starter",
  });

  //! Setarea parolei:
  newUser.setPassword(data.password);

  await newUser.save();

  return newUser;
}

// TODO LOGIN:
async function login(data) {
  const { email, password } = data;

  //! Validare pentru email și password:
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email or password is wrong");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Email or password is wrong");
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    secretForToken,
    {
      expiresIn: "1h",
    }
  );

  user.token = token;
  await user.save();

  return { token, user };
}

function getPayloadFromJWT(token) {
  try {
    const payload = jwt.verify(token, secretForToken);

    return payload;
  } catch (err) {
    console.error(err);
  }
}

function validateAuth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
}

module.exports = AuthController;
