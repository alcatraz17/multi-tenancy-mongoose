const mongoose = require("mongoose");

const getTenantModel = (tenantId, modelName, schemaName) => {
  const schema = require(`../models/${schemaName}`);

  const db = mongoose.connection.useDb(tenantId);
  return db.model(modelName, schema);
};

module.exports = getTenantModel;
