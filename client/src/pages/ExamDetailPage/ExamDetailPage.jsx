import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./ExamDetailPage.module.css";

const ExamDetailPage = () => {
  const { shortName } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchExamDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        // This is your existing API endpoint
        const res = await fetch(`/api/exams/${shortName}`);
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        const data = await res.json();
        setExam(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExamDetails();
  }, [shortName]);

  // --- Loading and Error States ---
  if (loading) {
    return (
      <p
        className="page-title"
        style={{ textAlign: "center", padding: "5rem" }}
      >
        Loading Details...
      </p>
    );
  }
  if (error) {
    return (
      <p
        className="page-title"
        style={{ textAlign: "center", padding: "5rem" }}
      >
        {error}
      </p>
    );
  }
  if (!exam) {
    return (
      <p
        className="page-title"
        style={{ textAlign: "center", padding: "5rem" }}
      >
        Exam not found.
      </p>
    );
  }

  // --- JSX from your new design, populated with live data ---
  return (
    <>
      <header className={styles["page-header"]}>
        <div className="container">
          <Link to="/" className={styles["back-link"]}>
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="container">
        <article className={styles["exam-content"]}>
          <h1 className="page-title">{exam.name}</h1>
          <p className={styles["exam-intro"]}>{exam.description}</p>

          <div className={styles["meta-info"]}>
            <p className={styles["conducting-body"]}>
              <strong>Conducted by:</strong> {exam.conductingBody}
            </p>
            <a
              href={exam.officialWebsite}
              className="btn btn--secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Website →
            </a>
          </div>

          {exam.latestUpdate && (
            <div className={styles["latest-update-box"]}>
              <span className={styles.icon}>⚡</span>
              <div className={styles["update-text"]}>
                <strong>Latest Update:</strong>
                <a
                  href={exam.latestUpdate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {exam.latestUpdate.title}
                </a>
              </div>
            </div>
          )}

          <section id="timeline">
            <h2 className="section-title">Important Dates & Timeline</h2>
            <div className="card">
              <dl className={styles["definition-list"]}>
                <dt>Notification Date</dt>
                <dd>{exam.timeline.notificationDate}</dd>
                <dt>Application Dates</dt>
                <dd>{`${exam.timeline.applicationStartDate} to ${exam.timeline.applicationEndDate}`}</dd>
                <dt>Exam Dates</dt>
                <dd>{exam.timeline.examDate}</dd>
                <dt>Final Result</dt>
                <dd>{exam.timeline.resultDate}</dd>
              </dl>
            </div>
          </section>

          <section id="eligibility">
            <h2 className="section-title">Eligibility Criteria</h2>
            <div className="card">
              <dl className={styles["definition-list"]}>
                <dt>Age Limit</dt>
                <dd>{exam.eligibility.ageLimit}</dd>
                <dt>Educational Qualification</dt>
                <dd>{exam.eligibility.educationalQualification}</dd>
                <dt>Nationality</dt>
                <dd>{exam.eligibility.nationality}</dd>
              </dl>
            </div>
          </section>

          <section id="pattern">
            <h2 className="section-title">Exam Pattern</h2>
            <div className="card">
              <ol className={styles["stages-list"]}>
                {exam.examPattern.stages.map((stage, index) => (
                  <li key={index}>
                    <strong>{stage.name}</strong>
                    <p>{stage.description}</p>
                  </li>
                ))}
              </ol>
              <hr className={styles.separator} />
              <p>
                <strong>Marking Scheme:</strong>{" "}
                {exam.examPattern.markingScheme}
              </p>
            </div>
          </section>

          <section id="syllabus">
            <h2 className="section-title">Core Syllabus</h2>
            <div className={styles["syllabus-grid"]}>
              {exam.syllabus.map((subject, index) => (
                <div key={index} className={`${styles["syllabus-card"]} card`}>
                  <h4>{subject.name}</h4>
                  <ul>
                    {subject.topics.map((topic, i) => (
                      <li key={i}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="books">
            <h2 className="section-title">Recommended Books</h2>
            <div className={styles["books-grid"]}>
              {exam.books.map((book, index) => (
                <div key={index} className={styles["book-card"]}>
                  <h3 className="gradient-text">{book.title}</h3>
                  <p>by {book.author}</p>
                  <a
                    href={book.link || "#"}
                    className="btn btn--secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {book.link ? "Buy on Amazon" : "Link not available"}
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section id="youtube">
            <h2 className="section-title">Helpful YouTube Channels</h2>
            <div className={styles["books-grid"]}>
              {exam.youtubeVideos.map((video, index) => (
                <div key={index} className={styles["book-card"]}>
                  <h3 className="gradient-text">{video.channelName}</h3>
                  <p>{video.title}</p>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--secondary"
                  >
                    Visit Channel
                  </a>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
    </>
  );
};

export default ExamDetailPage;
