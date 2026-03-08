import { Link } from "react-router-dom";
import styles from "./ExamCard.module.css";

const ExamCard = ({ exam }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.title}>{exam.name}</h3>
        <p className={styles.desc}>{exam.description}</p>
      </div>
      <div className={styles.actions}>
        <Link to={`/exam/${exam.shortName}`} className="btn btn--primary">
          View Details
        </Link>
        <a
          href={exam.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--secondary"
        >
          Official Site
        </a>
      </div>
    </div>
  );
};

export default ExamCard;
