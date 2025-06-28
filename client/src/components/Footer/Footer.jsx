import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* The global 'container' class ensures consistent padding and width */}
      <div className="container">
        <div className={styles.grid}>
          {/* Column 1: About */}
          <div>
            <h3 className={styles.title}>GovExam Navigator</h3>
            <p className={styles.description}>
              Your trusted partner in navigating the complexities of government
              exam preparation.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className={styles.linksTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#" className={styles.link}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Social */}
          <div>
            <h4 className={styles.linksTitle}>Legal</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#" className={styles.link}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Terms of Service
                </a>
              </li>
            </ul>
            <div className={styles.socials}>
              <h4 className={styles.linksTitle}>Follow Us</h4>
              <div className={styles.socialIcons}>
                {/* In a real app, you'd replace these with SVG icon components */}
                <a href="#" className={styles.link}>
                  Facebook
                </a>
                <a href="#" className={styles.link}>
                  Twitter
                </a>
                <a href="#" className={styles.link}>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className={styles.copyright}>
          <p>© {currentYear} GovExam Navigator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
