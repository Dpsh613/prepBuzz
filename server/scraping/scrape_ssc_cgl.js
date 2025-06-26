import mongoose from "mongoose";
import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";
import Exam from "../models/exam.model.js";

dotenv.config();

// Changed the function name for clarity
const scrapeAndSaveSscCgl = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully.");

        // NOTE: The official SSC website is a portal. We link to the main site.
        // We will manually add most data for SSC as it's not on one page.
        console.log("Preparing data for SSC CGL...");
        
        // Assemble the Data Object for SSC CGL
        const examData = {
            name: "SSC Combined Graduate Level (CGL)",
            shortName: "ssc-cgl",
            description: "The SSC CGL is a national-level exam conducted to recruit candidates for Group B and Group C posts in various ministries, departments, and organizations of the Government of India.",
            officialWebsite: "https://ssc.gov.in/",
            eligibility: {
                // Hardcoded this data for reliability
                ageLimit: "Varies by post (typically 18-32 years)",
                educationalQualification: "Bachelor's Degree from a recognised university.",
            },
            books: [
                {
                    title: "Lucent's General Knowledge",
                    author: "Dr. Binay Karna",
                    amazonLink: "https://www.amazon.in/Lucents-General-Knowledge-Binay-Karna/dp/938797300X/"
                },
                {
                    title: "Quantitative Aptitude for Competitive Examinations",
                    author: "R.S. Aggarwal",
                    amazonLink: "https://www.amazon.in/Quantitative-Aptitude-Competitive-Examinations-Aggarwal/dp/93550199Quantitative/"
                }
            ],
            youtubeVideos: [
                {
                    title: "SSC CGL Complete Strategy",
                    url: "https://www.youtube.com/watch?v=k8P2GaV7Gik", // Example video
                    channelName: "Gagan Pratap Maths"
                },
                {
                    title: "English for SSC CGL",
                    url: "https://www.youtube.com/watch?v=FqSj_d6yG2g", // Example video
                    channelName: "Unacademy"
                }
            ]
        };

        // This smart save/update logic remains the same
        console.log("Saving data for SSC CGL to the database...");
        const result = await Exam.findOneAndUpdate(
            { shortName: examData.shortName },
            examData,
            { new: true, upsert: true, runValidators: true }
        );

        console.log("✅ Success! Data saved/updated for:");
        console.log(result.name);

    } catch (error) {
        console.error("❌ An error occurred during the process:", error);
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB disconnected.");
    }
};

// Run the scraper for SSC CGL
scrapeAndSaveSscCgl();