// scraping/scrape-runner.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Exam from "../models/exam.model.js";
import { EXAMS_TO_SCRAPE } from "./scraper-config.js";

dotenv.config();

const runAllScrapers = async () => {
  console.log("🚀 Starting scraper for DYNAMIC updates...");

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for scraping updates.");

    for (const examConfig of EXAMS_TO_SCRAPE) {
      // Skip exams that don't have a scraper function defined yet
      if (!examConfig.scraperFunction) {
        // console.log(`   -> Skipping ${examConfig.name} (no scraper function).`);
        continue;
      }

      console.log(`\n--- Scraping updates for: ${examConfig.name} ---`);

      try {
        // The scraper function should ONLY return dynamic data.
        // e.g., { timeline: {...}, eligibility: { ageLimit: '21-30' } }
        const dynamicData = await examConfig.scraperFunction(
          examConfig.scraperConfig
        );

        if (Object.keys(dynamicData).length === 0) {
          console.log(
            `   -> No new dynamic data found for ${examConfig.name}.`
          );
          continue;
        }

        // Add the last scraped timestamp
        dynamicData.lastScraped = new Date();

        // Use $set to update ONLY the fields returned by the scraper.
        // This will NOT overwrite the static data seeded earlier.
        const result = await Exam.findOneAndUpdate(
          { shortName: examConfig.shortName },
          { $set: dynamicData },
          { new: true } // 'new: true' returns the updated document
        );

        if (result) {
          console.log(
            `   -> ✅ Success! Updated dynamic data for ${examConfig.name}.`
          );
        } else {
          console.warn(
            `   -> ⚠️ Warning: Could not find exam ${examConfig.name} to update. Run the seeder first.`
          );
        }
      } catch (error) {
        console.error(
          `   -> ❌ Error processing ${examConfig.name}:`,
          error.message
        );
      }
    }
  } catch (error) {
    console.error(
      "❌ A critical error occurred during the scraping process:",
      error
    );
  } finally {
    await mongoose.disconnect();
    console.log("\nMongoDB disconnected.");
    console.log("🏁 Scraper update process finished.");
  }
};

runAllScrapers();
