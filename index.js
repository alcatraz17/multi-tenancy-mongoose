const express = require("express");
const connectToDatabase = require("./db/connectionManager");
const testRoutes = require("./routes/test");

const app = express();
app.use(express.json());

(async () => {
  try {
    await connectToDatabase();
    console.log("Connected to MongoDB");

    // Use the test routes
    app.use("/api", testRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
})();
