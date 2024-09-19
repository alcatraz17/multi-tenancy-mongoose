const router = require("express").Router({
  mergeParams: true,
});
const { faker } = require("@faker-js/faker");

router.post("/add-data", async (req, res) => {
  try {
    const data = Array.from({ length: 10 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
    }));

    await req.db.TestingTwo.create(data);

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
    // Fetch data from the database and limit 10 records
    const data = await req.db.TestingTwo.find().limit(10);

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
