const mongoose = require("mongoose");
const colors = require("colors");

async function connectToDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://danretegan:5od6kQSetAFW311A@cluster0.hmnlbw5.mongodb.net/contactsdb"
    );
    console.log(colors.bgGreen.italic.bold("Database connection successful!"));
  } catch (error) {
    console.error(colors.bgRed.italic.bold(error));
    process.exit(1);
  }
}

module.exports = connectToDb;
