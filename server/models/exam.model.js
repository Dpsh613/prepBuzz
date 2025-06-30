import mongoose from "mongoose";
const { Schema } = mongoose;

// --- Sub-Schemas for better organization ---

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  source: { type: String, default: "Amazon" }, // e.g., Amazon, NCERT, Government Portal
  link: { type: String, required: true }, // Generic link (was amazonLink)
});

const VideoSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  channelName: String,
});

// NEW: To store important dates
const TimelineSchema = new Schema({
  notificationDate: Date,
  applicationStartDate: Date,
  applicationEndDate: Date,
  examDate: String, // String to accommodate multiple dates like "1st, 5th, 10th June"
  resultDate: Date,
});

// NEW: To store the structure of the exam
const ExamPatternSchema = new Schema({
  mode: { type: String, enum: ["Online", "Offline", "Both"] }, // CBT or Pen-and-paper
  stages: [String], // e.g., ["Prelims", "Mains", "Interview"]
  negativeMarking: { type: Boolean, default: false },
  markingScheme: String, // e.g., "+1 for correct, -0.25 for incorrect"
});

// NEW: To store the syllabus in a structured way
const SyllabusTopicSchema = new Schema({
  topic: String,
  subtopics: [String],
});

const SyllabusStageSchema = new Schema({
  stageName: String, // "Prelims", "Mains Paper I", etc.
  papers: [
    {
      paperName: String,
      topics: [SyllabusTopicSchema],
    },
  ],
});

// --- The Main Exam Schema ---

const ExamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    shortName: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    conductingBody: { type: String, required: true },
    officialWebsite: { type: String, required: true },

    // More detailed eligibility
    eligibility: {
      ageLimit: String,
      educationalQualification: String,
      nationality: String,
      numberOfAttempts: Number,
    },

    // Using the new sub-schemas
    timeline: TimelineSchema,
    examPattern: ExamPatternSchema,
    syllabus: [SyllabusStageSchema],

    latestUpdate: {
      title: String,
      date: String,
      link: String,
    },
    updates: [
      {
        title: String,
        link: String,
      },
    ],
    // Existing schemas
    books: [BookSchema],
    youtubeVideos: [VideoSchema],

    // Status fields for the scraper
    lastScraped: { type: Date },
    isScraping: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", ExamSchema);

export default Exam;
