// src/pages/ExamDetailPage/LinkItemCard.jsx
import React from "react";
import styles from "./ExamDetailPage.module.css";
import { ExternalLinkIcon } from "../../components/Icons";

const LinkItemCard = ({ item }) => {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.linkCard}
    >
      <div className={styles.linkCardIcon}>{item.icon}</div>
      <div className={styles.linkCardText}>
        <h3 className={styles.linkCardTitle}>{item.title}</h3>
        <p className={styles.linkCardDescription}>{item.description}</p>
      </div>
      <ExternalLinkIcon className={styles.linkCardExternalIcon} />
    </a>
  );
};

export default LinkItemCard;
