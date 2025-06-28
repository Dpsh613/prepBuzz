import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./ExamDetailPage.module.css";
// Import our new UI components
import SectionCard from "./SectionCard";
import LinkItemCard from "./LinkItemCard";
// Import all the icons we'll need
import {
  ExternalLinkIcon,
  BookIcon,
  YouTubeIcon,
  AmazonIcon,
} from "../../components/Icons";

function ExamDetailPage() {
  const { shortName } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        setLoading(true);
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

  if (loading)
    return (
      <div className="container">
        <h1 className={styles.statusMessage}>Loading details...</h1>
      </div>
    );
  if (error)
    return (
      <div className="container">
        <h1 className={styles.statusMessage}>{error}</h1>
      </div>
    );
  if (!exam)
    return (
      <div className="container">
        <h1 className={styles.statusMessage}>Exam not found.</h1>
      </div>
    );

  return (
    <div className="container">
      <div className={styles.detailPage}>
        <Link to="/" className={styles.backLink}>
          ← Back to all exams
        </Link>

        {/* --- New Gradient Header --- */}
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>{exam.name}</h1>
          <p className={styles.headerDescription}>{exam.description}</p>
          {exam.officialWebsite && (
            <a
              href={exam.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.headerButton}
            >
              Official Website{" "}
              <ExternalLinkIcon className={styles.headerButtonIcon} />
            </a>
          )}
        </header>

        <div className={styles.contentGrid}>
          {/* --- Key Information Section --- */}
          <SectionCard
            title="Key Information"
            icon={<BookIcon className={styles.sectionIcon} />}
          >
            {exam.eligibility ? (
              <>
                <p>
                  <strong>Age Limit:</strong> {exam.eligibility.ageLimit}
                </p>
                <p>
                  <strong>Education:</strong>{" "}
                  {exam.eligibility.educationalQualification}
                </p>
              </>
            ) : (
              <p>Eligibility details not available yet.</p>
            )}
          </SectionCard>

          {/* --- Syllabus Section (Placeholder) --- */}
          {/* The new design has a complex syllabus. We'll add a placeholder for it. */}
          <SectionCard
            title="Syllabus Overview"
            icon={<BookIcon className={styles.sectionIcon} />}
          >
            <p>Detailed syllabus breakdown coming soon!</p>
          </SectionCard>

          {/* --- YouTube Resources Section --- */}
          <SectionCard
            title="Helpful YouTube Videos"
            icon={
              <YouTubeIcon
                className={`${styles.sectionIcon} ${styles.youtubeColor}`}
              />
            }
          >
            {exam.youtubeVideos && exam.youtubeVideos.length > 0 ? (
              <div className={styles.linksGrid}>
                {exam.youtubeVideos.map((video) => (
                  <LinkItemCard
                    key={video._id || video.url}
                    item={{
                      title: video.title,
                      description: video.channelName,
                      url: video.url,
                      icon: <YouTubeIcon className={styles.youtubeColor} />,
                    }}
                  />
                ))}
              </div>
            ) : (
              <p>No YouTube videos available yet.</p>
            )}
          </SectionCard>

          {/* --- Recommended Books Section --- */}
          <SectionCard
            title="Recommended Books"
            icon={
              <AmazonIcon
                className={`${styles.sectionIcon} ${styles.amazonColor}`}
              />
            }
          >
            {exam.books && exam.books.length > 0 ? (
              <div className={styles.linksGrid}>
                {exam.books.map((book) => (
                  <LinkItemCard
                    key={book._id || book.title}
                    item={{
                      title: book.title,
                      description: `by ${book.author}`,
                      url: book.amazonLink,
                      icon: <AmazonIcon className={styles.amazonColor} />,
                    }}
                  />
                ))}
              </div>
            ) : (
              <p>No recommended books available yet.</p>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

export default ExamDetailPage;
