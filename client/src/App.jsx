// client/src/App.jsx

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ExamDetailPage from "./pages/ExamDetailPage/ExamDetailPage";
import "./App.css"; // For global styles

function App() {
  return (
    // The main div and BrowserRoutes were removed from here
    // and moved to main.jsx
    <Routes>
      {/* Route for the home page */}
      <Route path="/" element={<HomePage />} />

      {/* Route for the exam detail page, with a dynamic parameter */}
      <Route path="/exams/:shortName" element={<ExamDetailPage />} />
    </Routes>
  );
}

export default App;
