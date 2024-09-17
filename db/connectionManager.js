const mongoose = require("mongoose");

const connectToDatabase = async () => {
  await mongoose.connect("mongodb://localhost:27017/admin");
};

module.exports = connectToDatabase;
