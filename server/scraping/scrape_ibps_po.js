import mongoose from "mongoose";
import dotenv from "dotenv";
import Exam from "../models/exam.model.js";

dotenv.config();

const scrapeAndSaveIbpsPo = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully.");

        console.log("Preparing data for IBPS PO...");

        // Assemble the Data Object for IBPS PO
        const examData = {
            name: "IBPS Probationary Officer (PO)",
            shortName: "ibps-po",
            description: "The Institute of Banking Personnel Selection (IBPS) conducts the PO exam to recruit Probationary Officers for various public sector banks across India.",
            officialWebsite: "https://www.ibps.in/",
            eligibility: {
                ageLimit: "20 to 30 years",
                educationalQualification: "A degree (Graduation) in any discipline from a University recognised by the Govt. Of India.",
            },
            books: [
                {
                    title: "A Modern Approach to Verbal & Non-Verbal Reasoning",
                    author: "R.S. Aggarwal",
                    amazonLink: "https://www.amazon.in/Modern-Approach-Verbal-Non-Verbal-Reasoning/dp/8121905516"
                },
                {
                    title: "Objective General English",
                    author: "S.P. Bakshi",
                    amazonLink: "https://www.amazon.in/Objective-General-English-SP-Bakshi/dp/9312141323"
                }
            ],
            youtubeVideos: [
                {
                    title: "IBPS PO 2024 | English Complete Strategy",
                    url: "https://www.youtube.com/watch?v=kU98iaJen2c", // Example video
                    channelName: "Adda247"
                },
                {
                    title: "Reasoning Strategy for IBPS PO",
                    url: "https://www.youtube.com/watch?v=5YQ_1i5d60A", // Example video
                    channelName: "Bankers Way"
                }
            ]
        };

        console.log("Saving data for IBPS PO to the database...");
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

// Run the scraper for IBPS PO
scrapeAndSaveIbpsPo();