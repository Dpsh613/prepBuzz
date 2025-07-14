import React from "react";
import { Link } from "react-router-dom";
import styles from "./ExamCard.module.css";

// The 'exam' prop contains data for one exam from the array fetched in HomePage
const ExamCard = ({ exam }) => {
  return (
    <div className={styles.examCard}>
      <div className={styles.examCard__info}>
        {/* We use the classes from our specific module CSS */}
        <h3 className={styles.heading3}>{exam.name}</h3>
        <p className={styles.description}>{exam.description}</p>
      </div>
      <div className={styles.examCard__actions}>
        <a
          href={exam.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary" // Global style from index.css
        >
          Official Website
        </a>
        <Link
          to={`/exam/${exam.shortName}`}
          className="btn btn--secondary" // Global style from index.css
        >
          More Details
        </Link>
      </div>
    </div>
  );
};

export default ExamCard;
