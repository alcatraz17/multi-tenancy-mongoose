const Router = require("express").Router;
const { faker } = require("@faker-js/faker");

const router = Router({
  mergeParams: true,
});

router.post("/add-data", async (req, res) => {
  try {
    const db = await req.db;

    const data = Array.from({ length: 10 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
    }));

    await db.collection("testing").insertMany(data);

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
    const db = await req.db;

    // Fetch data from the database and limit 10 records
    const data = await db.collection("testing").find().limit(10).toArray();

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
