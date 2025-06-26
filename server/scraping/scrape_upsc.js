import mongoose from "mongoose";
import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";
import Exam from "../models/exam.model.js"; // Our blueprint

// --- Configuration ---

// This tells dotenv to look in the current directory (server/)
dotenv.config();

// --- The Main Scraper Function ---
const scrapeAndSaveUPSC = async () => {
  try {
    // 1. Connect to the Database
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");

    // 2. Fetch the Web Page
    const url =
      "https://upsc.gov.in/examinations/active-examinations/civil-services-examination";
    console.log(`Fetching data from ${url}...`);
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // 3. Extract Data using Cheerio
    // IMPORTANT: These selectors can break if the website changes its HTML structure.
    const ageLimit = $(".field--name-field-age-limits .field--item")
      .text()
      .trim();
    const educationalQualification = $(
      ".field--name-field-minimum-educational-qualifi .field--item"
    )
      .text()
      .trim();

    // 4. Assemble the Data Object (matching your schema)
    const examData = {
      name: "UPSC Civil Services Examination",
      shortName: "upsc-cse",
      description:
        "The Civil Services Examination (CSE) is a nationwide competitive examination in India conducted by the Union Public Service Commission for recruitment to various Civil Services of the Government of India.",
      officialWebsite: "https://upsc.gov.in",
      eligibility: {
        // Use the scraped data, but have a fallback in case scraping fails
        ageLimit: ageLimit || "21-32 years (General Category)",
        educationalQualification:
          educationalQualification || "A degree from a recognised university.",
      },
      // For now, we will add books and videos manually
      books: [
        {
          title: "Indian Polity for Civil Services",
          author: "M. Laxmikanth",
          amazonLink:
            "https://www.amazon.in/Indian-Polity-M-Laxmikanth/dp/935260363X",
        },
        {
          title: "A Brief History of Modern India",
          author: "Rajiv Ahir",
          amazonLink:
            "https://www.amazon.in/Brief-History-Modern-India/dp/8179306886",
        },
      ],
      youtubeVideos: [
        {
          title: "UPSC CSE Preparation Strategy",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          channelName: "StudyIQ",
        },
        {
          title: "How to Read The Hindu Newspaper",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          channelName: "Dr. Vikas Divyakirti",
        },
      ],
    };

    // 5. Save to Database (The Smart Way)
    // This command finds an exam with the same 'shortName'.
    // If it exists, it updates it. If not, it creates it (upsert: true).
    // This prevents creating duplicate entries if you run the script again.
    console.log("Saving data to the database...");
    const result = await Exam.findOneAndUpdate(
      { shortName: examData.shortName },
      examData,
      { new: true, upsert: true, runValidators: true }
    );

    console.log("✅ Success! Data saved/updated for:");
    console.log(result.name);
  } catch (error) {
    console.error("❌ An error occurred during the scraping process:", error);
  } finally {
    // 6. Disconnect from the Database
    // This is crucial to ensure the script doesn't hang.
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

// --- Run the Scraper ---
scrapeAndSaveUPSC();
