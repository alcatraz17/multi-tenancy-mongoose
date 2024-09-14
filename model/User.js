const { Schema } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  country: String,
});

module.exports = userSchema;
