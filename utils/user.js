const { getDatabase } = require("../db/connectionManager");

const findTenantByUser = async (email) => {
  const db = await getDatabase("master");

  const userDetails = await db.collection("users").findOne({ email });

  if (!userDetails) {
    return null;
  }

  return userDetails.tenantId;
};
