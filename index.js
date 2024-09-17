require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./db/connectionManager");
const routes = require("./routes/");

const app = express();
app.use(express.json());

(async () => {
  try {
    await connectToDatabase();
    console.log("Connected to MongoDB");

    // Use the test routes
    app.use("/api", routes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
})();
