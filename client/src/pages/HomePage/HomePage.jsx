import React, { useState, useEffect } from "react";
import styles from "./HomePage.module.css"; // Your new homepage styles
import ExamCard from "../../components/ExamCard/ExamCard";

const HomePage = () => {
  // --- Logic from your old structure ---
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllExams = async () => {
      try {
        // This endpoint should return the array of all 29 exams
        const res = await fetch("/api/exams");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        setExams(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching exams:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllExams();
  }, []); // Empty dependency array means this runs once on mount

  // --- JSX from your new design ---
  return (
    <main>
      <header className={styles.header}>
        <h1 className={styles.heading}>
          <span className={styles["heading-main"]}>PrepBuzz</span>
          <span className={styles["heading-sub"]}>Your Modern Exam Hub</span>
        </h1>
      </header>

      <section className={styles.features}>
        <h2 className={styles["section-title"]}>
          What You’ll Find on PrepBuzz
        </h2>
        <div className={styles.features__grid}>
          {/* Feature boxes are static, so we just copy them */}
          <div className={styles["feature-box"]}>
            <h3 className={styles["heading-3"]}>Exam Info Simplified</h3>
            <p className={styles.description}>
              Find complete details for every major exam - Including syllabus,
              pattern, and eligibility.
            </p>
          </div>
          <div className={styles["feature-box"]}>
            <h3 className={styles["heading-3"]}>Smart Book Suggestions</h3>
            <p className={styles.description}>
              Get carefully chosen books for each exam. Just the right resources
              to guide your prep.
            </p>
          </div>
          <div className={styles["feature-box"]}>
            <h3 className={styles["heading-3"]}>Buy Books Instantly</h3>
            <p className={styles.description}>
              Easily access recommended books through direct Amazon links. Skip
              the search.
            </p>
          </div>
          <div className={styles["feature-box"]}>
            <h3 className={styles["heading-3"]}>Helpful YouTube Videos</h3>
            <p className={styles.description}>
              Watch curated youtube videos, from lectures to strategy guides, to
              stay focused.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.exams}>
        <h2 className={styles["section-title"]}>
          Quick Look: Govt & Competitive Exams
        </h2>
        <div className={styles.exams__list}>
          {loading && <p className={styles.description}>Loading exams...</p>}
          {error && <p className={styles.description}>Error: {error}</p>}
          {!loading &&
            !error &&
            exams.map((exam) => <ExamCard key={exam.shortName} exam={exam} />)}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
