// server/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import puppeteer from "puppeteer-core";
import examRoutes from "./routes/exam.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/exams", examRoutes);

// 2. ADD A NEW ROUTE TO USE PUPPETEER
app.get("/api/screenshot", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send("Please provide a URL query parameter.");
  }

  let browser = null;
  try {
    // IMPORTANT: puppeteer-core requires you to provide the path
    // to a browser executable you have installed on your system.
    browser = await puppeteer.launch({
      executablePath: process.env.CHROME_EXECUTABLE_PATH, // Read from .env
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Recommended for servers
    });

    const page = await browser.newPage();
    await page.goto(url);
    const screenshotBuffer = await page.screenshot();

    res.setHeader("Content-Type", "image/png");
    res.send(screenshotBuffer);
  } catch (error) {
    console.error("Puppeteer error:", error);
    res.status(500).send("Failed to capture screenshot.");
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB. Server not started.", err);
    process.exit(1);
  }
};

startServer();
