// src/pages/ExamDetailPage/ExamDetailPage.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./ExamDetailPage.module.css";
import SectionCard from "./SectionCard";
import LinkItemCard from "./LinkItemCard";
import UpdatesFeed from "./UpdatesFeed";
import * as Icons from "../../components/Icons";

// The function starts here
function ExamDetailPage() {
  const { shortName } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error on new fetch
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

  // All the logic and early returns for loading/error states go here, inside the function.
  if (loading) {
    return (
      <div className="container">
        <h1 className={styles.statusMessage}>Loading details...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1 className={styles.statusMessage}>{error}</h1>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="container">
        <h1 className={styles.statusMessage}>Exam not found.</h1>
      </div>
    );
  }

  // This is the main return statement for a successful data load.
  // It is INSIDE the ExamDetailPage function.
  return (
    <div className="container">
      <div className={styles.detailPage}>
        <Link to="/" className={styles.backLink}>
          ← Back to all exams
        </Link>

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
              <Icons.ExternalLinkIcon className={styles.headerButtonIcon} />
            </a>
          )}
        </header>

        <div className={styles.contentGrid}>
          {/* Latest Updates Section */}
          {exam.updates && exam.updates.length > 0 && (
            <SectionCard
              title="Latest Updates"
              icon={<Icons.BellAlertIcon className={styles.sectionIcon} />}
            >
              <UpdatesFeed updates={exam.updates} />
            </SectionCard>
          )}

          {/* Key Information Section */}
          <SectionCard
            title="Key Information"
            icon={<Icons.BookIcon className={styles.sectionIcon} />}
          >
            {exam.eligibility?.ageLimit ||
            exam.eligibility?.educationalQualification ? (
              <div className={styles.infoGrid}>
                {exam.eligibility.ageLimit && (
                  <p>
                    <strong>Age Limit:</strong> {exam.eligibility.ageLimit}
                  </p>
                )}
                {exam.eligibility.educationalQualification && (
                  <p>
                    <strong>Education:</strong>{" "}
                    {exam.eligibility.educationalQualification}
                  </p>
                )}
              </div>
            ) : (
              <p>Eligibility details not available yet.</p>
            )}
          </SectionCard>

          {/* Syllabus Overview Section */}
          <SectionCard
            title="Syllabus Overview"
            icon={<Icons.BookIcon className={styles.sectionIcon} />}
          >
            <p>Detailed syllabus breakdown coming soon!</p>
          </SectionCard>

          {/* Helpful YouTube Videos Section */}
          {exam.youtubeVideos && exam.youtubeVideos.length > 0 && (
            <SectionCard
              title="Helpful YouTube Videos"
              icon={
                <Icons.YouTubeIcon
                  className={`${styles.sectionIcon} ${styles.youtubeColor}`}
                />
              }
            >
              <div className={styles.linksGrid}>
                {exam.youtubeVideos.map((video) => (
                  <LinkItemCard
                    key={video._id || video.url}
                    item={{
                      title: video.title,
                      description: video.channelName,
                      url: video.url,
                      icon: (
                        <Icons.YouTubeIcon className={styles.youtubeColor} />
                      ),
                    }}
                  />
                ))}
              </div>
            </SectionCard>
          )}

          {/* Recommended Books Section */}
          {exam.books && exam.books.length > 0 && (
            <SectionCard
              title="Recommended Books"
              icon={
                <Icons.AmazonIcon
                  className={`${styles.sectionIcon} ${styles.amazonColor}`}
                />
              }
            >
              <div className={styles.linksGrid}>
                {exam.books.map((book) => (
                  <LinkItemCard
                    key={book._id || book.title}
                    item={{
                      title: book.title,
                      description: `by ${book.author}`,
                      url: book.link, // Corrected from amazonLink to link
                      icon: <Icons.AmazonIcon className={styles.amazonColor} />,
                    }}
                  />
                ))}
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    </div>
  );
} // The function ends here, after the return statement

export default ExamDetailPage;
