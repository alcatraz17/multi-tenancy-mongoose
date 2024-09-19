const mongoose = require("mongoose");
const { snakeCase } = require("lodash");

const schemas = require("../schemas");

async function masterDbMiddleware(req, res, next) {
  const db = mongoose.connection.useDb("master");

  const models = {};
  for (const [modelName, schema] of Object.entries(schemas)) {
    models[modelName] = db.model(modelName, schema, snakeCase(modelName));
  }

  req.db = models;

  next();
}

module.exports = masterDbMiddleware;
