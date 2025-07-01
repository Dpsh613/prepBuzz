// src/components/ExamCard/ExamCard.jsx
import { Link } from "react-router-dom";
import styles from "./ExamCard.module.css";
import { examConfigMap } from "../../config/exam-theme.js";

const ExamCard = ({ exam }) => {
  const config = examConfigMap[exam.shortName] || examConfigMap.default;
  const IconComponent = config.icon;
  const theme = config.theme;

  return (
    <Link to={`/exams/${exam.shortName}`} className={styles.cardLink}>
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
};

export default ExamCard;
