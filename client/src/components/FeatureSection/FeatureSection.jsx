import React from "react";
import styles from "./FeatureSection.module.css";

// Import the icons we'll need for the features
import {
  BookOpenIcon,
  BellAlertIcon,
  CheckBadgeIcon,
  MagnifyingGlassIcon,
} from "../Icons";

// --- Define the Features Data ---
// We create the data right here. Notice how the 'icon' property is the actual JSX component.
const FEATURES = [
  {
    icon: <BookOpenIcon />,
    title: "Comprehensive Guides",
    description:
      "Detailed, step-by-step guides for every major government exam syllabus.",
  },
  {
    icon: <BellAlertIcon />,
    title: "Latest Notifications",
    description:
      "Never miss a deadline with instant updates on exam dates, results, and news.",
  },
  {
    icon: <CheckBadgeIcon />,
    title: "Verified Content",
    description:
      "All our content is created and verified by subject matter experts to ensure accuracy.",
  },
  {
    icon: <MagnifyingGlassIcon />,
    title: "Practice Quizzes",
    description:
      "Sharpen your skills and test your knowledge with our extensive library of quizzes.",
  },
];

// --- Sub-component for a single Feature Card ---
// Since this card is only used in this section, defining it here is a clean pattern.
const FeatureCard = ({ feature }) => {
  return (
    <div className={styles.featureCard}>
      <div className={styles.iconWrapper}>{feature.icon}</div>
      <h3 className={styles.cardTitle}>{feature.title}</h3>
      <p className={styles.cardDescription}>{feature.description}</p>
    </div>
  );
};

// --- The Main FeatureSection Component ---
const FeatureSection = () => {
  return (
    <section className={styles.featureSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
          <p className={styles.sectionSubtitle}>
            We provide everything you need to stay ahead in your government exam
            preparation journey.
          </p>
        </div>
        <div className={styles.grid}>
          {FEATURES.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
