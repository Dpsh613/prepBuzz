import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./ExamDetailPage.module.css";

function ExamDetailPage() {
  // Get the 'shortName' parameter from the URL (e.g., "upsc-cse")
  const { shortName } = useParams();

  // State to hold the detailed exam data, loading status, and errors
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function fetches data for the specific exam
    const fetchExamDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/exams/${shortName}`);
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setExam(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [shortName]); // The effect re-runs if the URL parameter changes

  // --- Render logic based on state ---
  if (loading)
    return <h1 className={styles.statusMessage}>Loading details...</h1>;
  if (error) return <h1 className={styles.statusMessage}>{error}</h1>;
  if (!exam) return <h1 className={styles.statusMessage}>Exam not found.</h1>;

  return (
    <div className={styles.detailPage}>
      <Link to="/" className={styles.backLink}>
        ← Back to all exams
      </Link>
      <h1>{exam.name}</h1>
      <p className={styles.description}>{exam.description}</p>

      <div className={styles.section}>
        <h2>Official Website</h2>
        <a
          href={exam.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
        >
          {exam.officialWebsite}
        </a>
      </div>

      <div className={styles.section}>
        <h2>Eligibility</h2>
        <p>
          <strong>Age Limit:</strong> {exam.eligibility.ageLimit}
        </p>
        <p>
          <strong>Education:</strong>{" "}
          {exam.eligibility.educationalQualification}
        </p>
      </div>

      <div className={styles.section}>
        <h2>Recommended Books</h2>
        <ul>
          {exam.books.map((book) => (
            <li key={book._id || book.title}>
              {book.title} by {book.author} -{" "}
              <a
                href={book.amazonLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy on Amazon
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>YouTube Resources</h2>
        <ul>
          {exam.youtubeVideos.map((video) => (
            <li key={video._id || video.url}>
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                {video.title}
              </a>{" "}
              ({video.channelName})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExamDetailPage;
