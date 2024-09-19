const mongoose = require("mongoose");
const { snakeCase } = require("lodash");

const getModelForDatabase = ({ databaseName, modelName }) => {
  let schema;
  try {
    schema = require(`../schemas/${modelName}`);
  } catch (error) {
    console.error(`Schema for model ${modelName} not found.`);
    throw new Error(`Schema for model ${modelName} not found.`);
  }

  const db = mongoose.connection.useDb(databaseName);

  return db.model(modelName, schema, snakeCase(modelName));
};

module.exports = { getModelForDatabase };
