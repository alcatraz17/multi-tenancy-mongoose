const { Schema } = require("mongoose");

const userSchema = new Schema({
  email: String,
  password: String,
  username: String,
  tenantId: String,
  role: String,
});

module.exports = userSchema;
