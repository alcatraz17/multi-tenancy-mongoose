const { getDatabase } = require("../db/connectionManager");
const { getModelForDatabase } = require("./dbModelHelper");

const findTenantByUser = async (email) => {
  const db = await getDatabase("master");

  const userDetails = await db.collection("users").findOne({ email });

  if (!userDetails) {
    return null;
  }

  return userDetails.tenantId;
};

async function tenantExists(tenantId, email) {
  const RegisteredUsers = getModelForDatabase({
    databaseName: "master",
    modelName: "User",
  });

  const doesTenantExist = await RegisteredUsers.findOne({
    role: "SCHOOL",
    $or: [{ tenantId }, { email }],
  });

  return doesTenantExist;
}

module.exports = { findTenantByUser, tenantExists };
