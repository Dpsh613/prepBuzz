import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import * as Icons from "../../components/Icons";
import CallToActionSection from "../../components/CallToActionSection/CallToActionSection";
import FeatureSection from "../../components/FeatureSection/FeatureSection";

// --- THEME & ICON MAPPING ---
// This map assigns an icon AND a color theme to each exam.
// This is a powerful pattern for creating varied, dynamic UIs.
const examConfigMap = {
  "ssc-cgl": { icon: Icons.BuildingLibraryIcon, theme: "blue" },
  "upsc-cse": { icon: Icons.BuildingLibraryIcon, theme: "purple" },
  "ibps-po": { icon: Icons.BanknotesIcon, theme: "green" },
  nda: { icon: Icons.ShieldCheckIcon, theme: "yellow" },
  // Add other exams here
  default: { icon: Icons.BookOpenIcon, theme: "blue" }, // A fallback
};

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
    return (
      <div className="container">
        <h1 className={styles.statusMessage}>Loading exams...</h1>
      </div>
    );
  if (error)
    return (
      <div className="container">
        <h1 className={styles.statusMessage}>Error: {error}</h1>
      </div>
    );

  return (
    <>
      <CallToActionSection />
      <FeatureSection />

      {/* This is our new "Exam Categories" section */}
      <section className={styles.examSection}>
        <div className="container">
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Explore Exam Categories</h2>
            <p className={styles.sectionSubtitle}>
              Find detailed information for a wide range of government exams.
            </p>
          </div>

          {/* The Grid of New Cards */}
          <div className={styles.examGrid}>
            {exams.map((exam) => {
              // Get the specific config (icon and theme) for this exam
              const config =
                examConfigMap[exam.shortName] || examConfigMap.default;
              const IconComponent = config.icon;
              // The `theme` string (e.g., "blue") will be used to select CSS classes
              const theme = config.theme;

              return (
                // The entire card is now a link for better UX
                <Link
                  key={exam.shortName}
                  to={`/exams/${exam.shortName}`}
                  className={styles.cardLink}
                >
                  <div className={`${styles.categoryCard} ${styles[theme]}`}>
                    <div className={styles.iconCircle}>
                      <IconComponent className={styles.categoryIcon} />
                    </div>
                    <h3 className={styles.cardTitle}>{exam.name}</h3>
                    <p className={styles.cardDescription}>{exam.description}</p>
                    <span className={styles.exploreLink}>View Details →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
