const router = require("express").Router({
  mergeParams: true,
});

const { tenantExists, getDatabase } = require("../db/connectionManager");
const { generateToken } = require("../utils/jwt");

const masterDbMiddleware = require("../middleware/masterDbMiddleware");

router.use(masterDbMiddleware);
router.post("/registration", async (req, res) => {
  // Change the endpoint to /school-registration
  try {
    const { email, password, username, role = "SCHOOL" } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json("Email and password or username are required!"); // Validate it using JOI instead of this block.
    }

    const doesTenantExist = await tenantExists(username, email);

    const isEmailOrUsernameTaken =
      doesTenantExist?.email === email
        ? "Email"
        : doesTenantExist
        ? "Username"
        : null;

    if (isEmailOrUsernameTaken) {
      return res.status(400).json({
        message: `${isEmailOrUsernameTaken} is already registered with us!`,
      });
    }

    const user = await req.db.collection("users").insertOne({
      email,
      password,
      username,
      role,
      tenantId: username,
    });

    const token = generateToken({ email, role, tenantId: username });
    return res.status(201).json({
      message: "User registered successfully!",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Email and password are required!");
    }

    const user = await req.db.collection("users").findOne({ email, password });
    if (!user) {
      return res.status(401).json("Incorrect email or password!");
    }

    const token = generateToken({
      email,
      role: user.role,
      tenantId: user.tenantId,
    });
    return res.status(200).json({
      message: "User logged in successfully!",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
