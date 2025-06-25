import mongoose from "mongoose";
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  amazonLink: String,
  otherLink: String,
});

const VideoSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  channelName: String,
});

const ExamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    shortName: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    officialWebsite: { type: String, required: true },
    eligibility: {
      ageLimit: String,
      educationalQualification: String,
    },
    books: [BookSchema],
    youtubeVideos: [VideoSchema],
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", ExamSchema);

export default Exam;
