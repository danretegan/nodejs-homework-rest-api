const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://danretegan:5od6kQSetAFW311A@cluster0.hmnlbw5.mongodb.net/MongoConnection"
    );
    console.log("Database connection successful");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectToDb;
