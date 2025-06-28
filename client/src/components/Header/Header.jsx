import React, { useState } from "react";
import styles from "./Header.module.css"; // Import the CSS Module

// --- Mock Data & Icons ---
// Since these were imported from other files, we'll define them here for a complete example.
const NAVIGATION_LINKS = [
  { name: "Home", href: "#" },
  { name: "Exams", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Contact", href: "#" },
];

// Simple SVG Icon Components to replace HeroIcons
const Bars3Icon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const XMarkIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
// --- End Mock Data & Icons ---

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Note: The 'container' class comes from your global App.css */}
      <div className="container">
        <div className={styles.headerContent}>
          <div className="flex-shrink-0">
            <a href="#" className={styles.logo}>
              GovExam Navigator
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            {NAVIGATION_LINKS.map((item) => (
              <a key={item.name} href={item.href} className={styles.navLink}>
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Sign Up */}
          <div className={styles.desktopActions}>
            <button className={styles.signUpButton}>Sign Up</button>
          </div>

          {/* Mobile Menu Button */}
          <div className={styles.mobileMenuButton}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={styles.mobileMenuButton}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className={styles.icon} />
              ) : (
                <Bars3Icon className={styles.icon} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {NAVIGATION_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={styles.mobileNavLink}
            >
              {item.name}
            </a>
          ))}
          <div className={styles.mobileActions}>
            <button className={styles.signUpButton}>Sign Up</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
