const router = require("express").Router({
  mergeParams: true,
});

const testRoutes = require("./test");
const authRoutes = require("./auth");

const authMiddleware = require("../middleware/authMiddleware");
const tenantModelMiddleware = require("../middleware/tenantModelMiddleware");

router.use("/auth", authRoutes);

router.use(authMiddleware);
router.use(tenantModelMiddleware);

router.use("/test", testRoutes);

module.exports = router;
