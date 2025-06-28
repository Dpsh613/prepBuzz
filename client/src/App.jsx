// client/src/App.jsx

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ExamDetailPage from "./pages/ExamDetailPage/ExamDetailPage";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    // This is the layout structure your App.css is designed for.
    <div className="app-wrapper">
      {<Header />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exams/:shortName" element={<ExamDetailPage />} />
        </Routes>
      </main>
      {<Footer />}
    </div>
  );
}

export default App;
