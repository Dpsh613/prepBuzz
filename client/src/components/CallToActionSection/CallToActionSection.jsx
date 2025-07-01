// src/components/CallToActionSection/CallToActionSection.jsx
import React from "react";
import styles from "./CallToActionSection.module.css";

const CallToActionSection = ({ onExploreClick }) => {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>Ready to Start Your Journey?</h2>
          <p className={styles.subtitle}>
            Join thousands of aspirants who trust GovExam Navigator for their
            exam preparation. Get started today!
          </p>
          <div className={styles.buttonGroup}>
            <button
              onClick={onExploreClick} // <-- Use the passed-in function
              className={`${styles.button} ${styles.primaryButton}`}
            >
              Explore All Exams
            </button>
            <a
              href="#"
              className={`${styles.button} ${styles.accentButton}`}
            >
              Sign Up for Updates
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;