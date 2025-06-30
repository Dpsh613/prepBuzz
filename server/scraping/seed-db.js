import mongoose from "mongoose";
import dotenv from "dotenv";
import Exam from "../models/exam.model.js";
import { EXAMS_TO_SCRAPE } from "./scraper-config.js";

dotenv.config();

const seedDatabase = async () => {
  console.log("🌱 Starting database seeding process...");

  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI not found in .env file. Seeding aborted.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding.");
    let seededCount = 0;
    let updatedCount = 0;

    for (const examData of EXAMS_TO_SCRAPE) {
      const staticData = {
        name: examData.name,
        shortName: examData.shortName,
        conductingBody: examData.conductingBody,
        description: examData.description,
        officialWebsite: examData.officialWebsite,
      };

      const existingExam = await Exam.findOne({
        shortName: examData.shortName,
      });

      if (existingExam) {
        // If it exists, update it with the static data from the config
        await Exam.updateOne({ _id: existingExam._id }, { $set: staticData });
        updatedCount++;
      } else {
        // If it doesn't exist, create it
        await Exam.create(staticData);
        seededCount++;
      }
    }

    console.log(`\n--- Seeding Summary ---`);
    console.log(`✨ ${seededCount} new exams created.`);
    console.log(`🔄 ${updatedCount} existing exams updated with static data.`);
    console.log("✅ Seeding process completed successfully!");
  } catch (error) {
    console.error("❌ An error occurred during the seeding process:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

seedDatabase();
