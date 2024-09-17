const Router = require("express").Router;
const { faker } = require("@faker-js/faker");
const getTenantModel = require("../db/getTenantModel");

const router = Router({
  mergeParams: true,
});

router.post("/add-data", async (req, res) => {
  try {
    const { tenantId } = req.user;

    const Testing = getTenantModel(tenantId, "testing", "Testing");

    const data = Array.from({ length: 10 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
    }));

    // Insert data into the database
    await Testing.insertMany(data);

    return res.status(201).json({
      message: "Data added successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-data", async (req, res) => {
  try {
    const { tenantId } = req.user;
    const Testing = getTenantModel(tenantId, "testing", "Testing");

    // Fetch data from the database and limit 10 records
    const data = await Testing.find().limit(10);

    return res.status(200).json({
      message: "Data fetched successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
