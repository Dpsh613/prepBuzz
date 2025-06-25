// server/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
// 1. Enable Cross-Origin Resource Sharing for all routes
app.use(cors());

// 2. Enable the express.json() middleware to parse JSON request bodies
// This is the modern, built-in replacement for the 'body-parser' library.
app.use(express.json());

// --- MongoDB Connection ---
// The connection options are no longer needed in Mongoose v6+
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- API Routes ---
// A simple test route to verify the server is working
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the updated MERN backend!" });
});

// Add more of your API routes here...

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
