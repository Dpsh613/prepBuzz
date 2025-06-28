import React from "react";
import styles from "./CallToActionSection.module.css";

const CallToActionSection = () => {
  return (
    <section className={styles.ctaSection}>
      {/* We use the global 'container' class for consistent centering and padding */}
      <div className="container">
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>Ready to Start Your Journey?</h2>
          <p className={styles.subtitle}>
            Join thousands of aspirants who trust GovExam Navigator for their
            exam preparation. Get started today!
          </p>
          <div className={styles.buttonGroup}>
            <a
              href="#" // You might want to link this to an anchor on your page
              className={`${styles.button} ${styles.primaryButton}`}
            >
              Explore All Exams
            </a>
            <a
              href="#" // This would link to a signup page or modal
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
