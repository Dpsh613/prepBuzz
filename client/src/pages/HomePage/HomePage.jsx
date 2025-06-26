// client/src/pages/HomePage/HomePage.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// 1. Import the CSS module. It exports a 'styles' object.
import styles from "./HomePage.module.css";

function HomePage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/exams")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setExams(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <h1 className={styles.statusMessage}>Loading exams...</h1>;
  if (error) return <h1 className={styles.statusMessage}>Error: {error}</h1>;

  return (
    // 2. Use the styles object to apply classes. This prevents style conflicts.
    <div className={styles.homePage}>
      <h1>Government Exam Guides</h1>
      <div className={styles.examList}>
        {exams.map((exam) => (
          <div key={exam.shortName} className={styles.examCard}>
            <h2>{exam.name}</h2>
            <p>{exam.description}</p>
            <Link
              to={`/exams/${exam.shortName}`}
              className={styles.detailsButton}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
