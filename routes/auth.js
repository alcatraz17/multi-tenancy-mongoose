const router = require("express").Router({
  mergeParams: true,
});

const { tenantExists } = require("../utils/user");
const { generateToken } = require("../utils/jwt");

const { getModelForDatabase } = require("../utils/dbModelHelper");

router.post("/registration", async (req, res) => {
  try {
    const { email, password, username, role = "SCHOOL" } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json("Email and password or username are required!"); // Validate it using JOI instead of this block.
    }

    const User = getModelForDatabase({
      databaseName: "master",
      modelName: "User",
    });

    const doesTenantExist = await tenantExists(username, email);

    const isUsernameMatched = doesTenantExist?.tenantId === username;
    const isEmailMatched = doesTenantExist?.email === email;

    if (isUsernameMatched) {
      return res.status(400).json({
        success: false,
        message:
          "Username is already taken, please enter a different Username!",
      });
    } else if (isEmailMatched) {
      return res.status(400).json({
        success: false,
        message: "Email is already taken, please enter a different email!",
      });
    }

    const user = await User.create({
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

    const User = getModelForDatabase({
      databaseName: "master",
      modelName: "User",
    });

    const user = await User.findOne({ email, password });

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
