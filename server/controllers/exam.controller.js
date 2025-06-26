import Exam from "../models/exam.model.js";

// Get all exams (a summary for the main page)
export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().select("name shortName description");
    res.status(200).json(exams); // Send the data back as JSON
  } catch (error) {
    res.status(500).json({ message: "Error fetching exams", error });
  }
};

// Get one specific exam by its shortName (for the detail page)
export const getExamByShortName = async (req, res) => {
  try {
    const exam = await Exam.findOne({ shortName: req.params.shortName });
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.status(200).json(exam);
  } catch (error) {
    // Log the detailed error for your own debugging
    console.error("Error in getExamByShortName:", error);

    // Send a generic, safe error message to the client
    res.status(500).json({ message: "An internal server error occurred." });
  }
};
