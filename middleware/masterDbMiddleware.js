const { getDatabase } = require("../db/connectionManager");

async function masterDbMiddleware(req, res, next) {
  try {
    req.db = await getDatabase("master");
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to connect to the master database",
    });
  }
}

module.exports = masterDbMiddleware;
