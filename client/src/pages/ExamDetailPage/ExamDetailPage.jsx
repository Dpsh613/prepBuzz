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
        const res = await fetch(
          `https://prepbuzz-6vh9.onrender.com/api/exams/${shortName}`,
        );
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

  if (loading) return <p className={styles.centerMsg}>Loading Details...</p>;
  if (error) return <p className={styles.centerMsg}>{error}</p>;
  if (!exam) return <p className={styles.centerMsg}>Exam not found.</p>;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <Link to="/" className={styles.backLink}>
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="container">
        <article className={styles.article}>
          <div className={styles.titleArea}>
            <h1 className="page-title">{exam.name}</h1>
            <p className={styles.intro}>{exam.description}</p>
          </div>

          <div className={styles.metaBox}>
            <p>
              <strong>Conducted by:</strong> {exam.conductingBody}
            </p>
            <a
              href={exam.officialWebsite}
              className="btn btn--secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Website ↗
            </a>
          </div>

          {exam.latestUpdate && (
            <div className={styles.alertBox}>
              <span className={styles.alertIcon}>⚡</span>
              <div>
                <strong>Latest Update: </strong>
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

          <section className={styles.section}>
            <h2 className="section-title">Important Dates & Timeline</h2>
            <div className="card">
              <dl className={styles.defList}>
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

          <section className={styles.section}>
            <h2 className="section-title">Eligibility Criteria</h2>
            <div className="card">
              <dl className={styles.defList}>
                <dt>Age Limit</dt>
                <dd>{exam.eligibility.ageLimit}</dd>
                <dt>Educational Qualification</dt>
                <dd>{exam.eligibility.educationalQualification}</dd>
                <dt>Nationality</dt>
                <dd>{exam.eligibility.nationality}</dd>
              </dl>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className="section-title">Exam Pattern</h2>
            <div className="card">
              <ol className={styles.stageList}>
                {exam.examPattern.stages.map((stage, index) => (
                  <li key={index}>
                    <strong>{stage.name}</strong>
                    <p>{stage.description}</p>
                  </li>
                ))}
              </ol>
              <div className={styles.markingScheme}>
                <strong>Marking Scheme:</strong>{" "}
                {exam.examPattern.markingScheme}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className="section-title">Core Syllabus</h2>
            <div className={styles.grid}>
              {exam.syllabus.map((subject, index) => (
                <div key={index} className="card">
                  <h4 className={styles.subjectTitle}>{subject.name}</h4>
                  <ul className={styles.topicList}>
                    {subject.topics.map((topic, i) => (
                      <li key={i}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className="section-title">Recommended Books</h2>
            <div className={styles.grid}>
              {exam.books.map((book, index) => (
                <div key={index} className="card flex-col">
                  <h3 className={styles.resourceTitle}>{book.title}</h3>
                  <p className={styles.resourceAuthor}>by {book.author}</p>
                  <a
                    href={book.link || "#"}
                    className="btn btn--primary mt-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {book.link ? "View on Amazon" : "Unavailable"}
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className="section-title">Helpful YouTube Channels</h2>
            <div className={styles.grid}>
              {exam.youtubeVideos.map((video, index) => (
                <div key={index} className="card flex-col">
                  <h3 className={styles.resourceTitle}>{video.channelName}</h3>
                  <p className={styles.resourceAuthor}>{video.title}</p>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--secondary mt-auto"
                  >
                    Visit Channel
                  </a>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};

export default ExamDetailPage;
