const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRouter = require("./routes/authRouters");
const areaRoutes = require("./routes/areaRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({ origin: process.env.MAIN_URL, credentials: true }));
app.use(express.json()); // Parse incoming JSON

// API Routes
app.use("/api", userRoutes);
app.use("/api", contactRoutes);
app.use("/api", authRouter);
app.use("/api", areaRoutes);
app.use("/api", paymentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
