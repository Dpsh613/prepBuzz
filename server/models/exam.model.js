// server/models/exam.model.js
import mongoose from "mongoose";
const { Schema } = mongoose;

// --- Sub-Schemas (No changes needed here) ---

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  source: { type: String, default: "Amazon" },
  link: { type: String, required: false },
});

const VideoSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  channelName: String,
});

const TimelineSchema = new Schema({
  notificationDate: String,
  applicationStartDate: String,
  applicationEndDate: String,
  examDate: String,
  resultDate: String,
});

const ExamPatternStageSchema = new Schema({
  name: String,
  description: String,
});

const ExamPatternSchema = new Schema({
  // FIX #2: Removed the restrictive 'enum' to allow for more descriptive modes.
  mode: { type: String },
  stages: [ExamPatternStageSchema],
  negativeMarking: { type: Boolean, default: false },
  markingScheme: String,
});

const SyllabusItemSchema = new Schema({
  name: String,
  topics: [String],
});

// --- The Main Exam Schema ---

const ExamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    shortName: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    conductingBody: { type: String, required: true },
    officialWebsite: { type: String, required: true },
    eligibility: {
      ageLimit: String,
      educationalQualification: String,
      nationality: String,
      // FIX #1: Changed from Number to String to be more flexible.
      numberOfAttempts: String,
    },
    timeline: TimelineSchema,
    examPattern: ExamPatternSchema,
    syllabus: [SyllabusItemSchema],
    latestUpdate: {
      title: String,
      date: String,
      link: String,
    },
    updates: [
      {
        title: String,
        date: String,
        link: String,
      },
    ],
    books: [BookSchema],
    youtubeVideos: [VideoSchema],
    lastScraped: { type: Date },
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", ExamSchema);

export default Exam;
