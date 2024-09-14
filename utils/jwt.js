const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { JWT_SECRET, JWT_ALGORITHM } = process.env;

const generateToken = (payload) => {
  try {
    return JWT.sign(payload, String(JWT_SECRET), {
      algorithm: "HS256",
    });
  } catch (error) {
    throw new Error("Error generating token");
  }
};

const verifyToken = (token) => {
  try {
    return JWT.verify(token, String(JWT_SECRET), {
      algorithms: [JWT_ALGORITHM],
    });
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const hash = async (data) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(data, salt);
};

const compare = async (data, hash) => {
  return bcrypt.compare(data, hash);
};

module.exports = {
  generateToken,
  verifyToken,
  hash,
  compare,
};
