import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import Exam from "./models/exam.model.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "exam-data");

const seedDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in your .env file!");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding...");

    // 2. READ ALL JSON FILES
    const files = fs.readdirSync(dataDir);
    console.log(`🔍 Found ${files.length} files in exam-data/`);

    for (const file of files) {
      if (path.extname(file) === ".json") {
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const examData = JSON.parse(fileContent);

        await Exam.findOneAndUpdate(
          { shortName: examData.shortName },
          examData,
          {
            upsert: true,
            runValidators: true,
          }
        );
        console.log(`  -> Successfully seeded/updated: ${examData.name}`);
      }
    }

    console.log("🏆 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error during database seeding:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected.");
  }
};

seedDatabase();
