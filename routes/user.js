const router = require("express").Router({
  mergeParams: true,
});

router.post("/register-user", async (req, res) => {
  try {
    const { email, role } = req.body;
    const { tenantId } = req.user;
    if (!email || !role) {
      return res.status(400).json("Email and role are required!");
    }

    const masterDb = await getDatabase("master");

    const user = await masterDb.collection("users").findOne({ email });
    if (user) {
      return res.status(400).json("User already exists.");
    }

    await masterDb.collection("users").insertOne({
      email,
      role,
      tenantId,
    });

    return res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
