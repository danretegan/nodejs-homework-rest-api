const colors = require("colors");
const User = require("../models/user.js");

const AuthController = {
  signup,
};

// TODO SIGNUP:
async function signup(data) {
  console.log(colors.bgYellow.italic.bold("--- Signup: ---"));

  const newUser = new User({
    email: data.email,
    subscription: "starter",
  });

  //! Setăm parola utilizând metoda definită în schema utilizatorului:
  newUser.setPassword(data.password);

  await newUser.save();

  return newUser;
}

module.exports = AuthController;
