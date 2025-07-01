// src/pages/ExamDetailPage/UpdatesFeed.jsx
import React from "react";
import styles from "./UpdatesFeed.module.css";
import { ExternalLinkIcon } from "../../components/Icons";

const UpdatesFeed = ({ updates }) => {
  if (!updates || updates.length === 0) {
    return <p className={styles.noUpdates}>No recent updates available.</p>;
  }

  return (
    <ul className={styles.updatesList}>
      {updates.map((update, index) => (
        <li key={index} className={styles.updateItem}>
          <a
            href={update.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.updateLink}
          >
            <span>{update.title}</span>
            <ExternalLinkIcon className={styles.externalIcon} />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default UpdatesFeed;