const mongoose = require("mongoose");
const { snakeCase } = require("lodash");

const schemas = require("../schemas");

const tenantModelMiddleware = (req, res, next) => {
  const { tenantId } = req.user;
  const db = mongoose.connection.useDb(tenantId);

  const models = {};
  for (const [modelName, schema] of Object.entries(schemas)) {
    models[modelName] = db.model(modelName, schema, snakeCase(modelName));
  }

  req.db = models;

  next();
};

module.exports = tenantModelMiddleware;
