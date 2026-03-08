import { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import ExamCard from "../../components/ExamCard/ExamCard";

const HomePage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllExams = async () => {
      try {
        const res = await fetch("https://prepbuzz-6vh9.onrender.com/api/exams");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        setExams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllExams();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            <span className={styles.titleMain}>PrepBuzz</span>
            <span className={styles.titleSub}>Your Modern Exam Hub</span>
          </h1>
          <p className={styles.heroDesc}>
            Everything you need to crack your next competitive exam. Syllabi,
            strategies, and top-tier resources in one unified platform.
          </p>
        </div>
      </header>

      <main className="container">
        <section className={styles.features}>
          <div className={styles.featuresGrid}>
            <div className={styles.featureBox}>
              <h3>Exam Info Simplified</h3>
              <p>
                Complete details for every major exam including syllabus,
                pattern, and eligibility.
              </p>
            </div>
            <div className={styles.featureBox}>
              <h3>Smart Book Suggestions</h3>
              <p>
                Carefully chosen books for each exam to perfectly guide your
                preparation.
              </p>
            </div>
            <div className={styles.featureBox}>
              <h3>Buy Books Instantly</h3>
              <p>
                Easily access recommended books through direct links. Skip the
                search.
              </p>
            </div>
            <div className={styles.featureBox}>
              <h3>Helpful YouTube Videos</h3>
              <p>
                Curated video lectures and strategy guides to keep you focused
                and on track.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.exams}>
          <h2 className="section-title">Government & Competitive Exams</h2>

          {loading && <p className={styles.statusMsg}>Loading exams...</p>}
          {error && <p className={styles.statusMsg}>Error: {error}</p>}

          <div className={styles.examsList}>
            {!loading &&
              !error &&
              exams.map((exam) => (
                <ExamCard key={exam.shortName} exam={exam} />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
