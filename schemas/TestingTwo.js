const { Schema } = require("mongoose");

const TestingTwoSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

module.exports = TestingTwoSchema;
