// src/pages/HomePage/ExamSection.jsx
import React from "react";
import ExamCard from "../../components/ExamCard/ExamCard";
import styles from "./ExamSection.module.css";
// I'll create a shared SectionHeader component later if needed, for now this is fine.

const ExamSection = React.forwardRef(({ exams }, ref) => {
  return (
    <section ref={ref} className={styles.examSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore Exam Categories</h2>
          <p className={styles.sectionSubtitle}>
            Find detailed information for a wide range of government exams.
          </p>
        </div>
        <div className={styles.examGrid}>
          {exams.map((exam) => (
            <ExamCard key={exam.shortName} exam={exam} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default ExamSection;