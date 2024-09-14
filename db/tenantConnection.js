const mongoose = require('mongoose');

const getTenantModel = (tenantId, modelName, schema) => {
  const db = mongoose.connection.useDb(tenantId);
  return db.model(modelName, schema);
};

module.exports = getTenantModel;