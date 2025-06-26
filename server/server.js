// server/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// Import your new routes
import examRoutes from "./routes/exam.routes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
// Mount your exam routes under the /api/exams prefix
app.use("/api/exams", examRoutes);

// --- Start MongoDB Server Function ---
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB. Server not started.", err);
    process.exit(1); // Exit the process with an error code
  }
};

startServer();
