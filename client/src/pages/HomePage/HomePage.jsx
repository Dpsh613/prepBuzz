// src/pages/HomePage/HomePage.jsx
import { useState, useEffect, useRef } from "react";
import CallToActionSection from "../../components/CallToActionSection/CallToActionSection";
import FeatureSection from "../../components/FeatureSection/FeatureSection";
import ExamSection from "./ExamSection";

function HomePage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const examSectionRef = useRef(null); // Ref for the exam section

  useEffect(() => {
    fetch("/api/exams")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setExams(data))
      .catch((err) => setError("Failed to fetch exams."))
      .finally(() => setLoading(false));
  }, []);

  const handleExploreClick = () => {
    examSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <div className="container"><h1>Loading exams...</h1></div>;
  if (error) return <div className="container"><h1>{error}</h1></div>;

  return (
    <>
      <CallToActionSection onExploreClick={handleExploreClick} />
      <FeatureSection />
      <ExamSection ref={examSectionRef} exams={exams} />
    </>
  );
}

export default HomePage;