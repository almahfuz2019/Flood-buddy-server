const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRouter = require("./routes/authRouters");
const areaRoutes = require("./routes/areaRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Set up CORS to allow multiple origins
const allowedOrigins = [
  process.env.MAIN_URL, // Local React app
  "https://flood-buddy.netlify.app", // Netlify frontend URL
  "https://your-vercel-app-url.vercel.app", // Vercel frontend URL (replace with actual if applicable)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// Middleware to parse incoming JSON
app.use(express.json());

// Define API routes
app.use("/api", userRoutes);
app.use("/api", contactRoutes);
app.use("/api", authRouter);
app.use("/api", areaRoutes);
app.use("/api", paymentRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
