// src/pages/ExamDetailPage/SectionCard.jsx
import React from "react";
import styles from "./ExamDetailPage.module.css";

const SectionCard = ({ title, icon, children }) => {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionCardHeader}>
        {icon}
        <h2 className={styles.sectionCardTitle}>{title}</h2>
      </div>
      <div className={styles.sectionCardContent}>{children}</div>
    </div>
  );
};

export default SectionCard;
