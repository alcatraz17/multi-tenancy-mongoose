const Router = require("express").Router;

const router = Router({
  mergeParams: true,
});

const testRoutes = require("./test");
const authRoutes = require("./auth");

const authMiddleware = require("../middleware/authMiddleware");

router.use("/auth", authRoutes);

router.use(authMiddleware);

router.use("/test", testRoutes);

module.exports = router;
