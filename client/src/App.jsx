import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ExamDetailPage from "./pages/ExamDetailPage/ExamDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/exam/:shortName" element={<ExamDetailPage />} />
    </Routes>
  );
}

export default App;
