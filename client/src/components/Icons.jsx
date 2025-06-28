// src/components/Icons.jsx
// A collection of reusable icon components (converted from TSX to JSX).

import React from "react";

// Note: We've removed the TypeScript :React.FC<IconProps> type annotations.

export const MagnifyingGlassIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);

export const BookOpenIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
    />
  </svg>
);

export const CheckBadgeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

// Corrected BellAlertIcon
export const BellAlertIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
    />
  </svg>
);

export const BuildingLibraryIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
    />
  </svg>
);

export const BanknotesIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
    />
  </svg>
);

export const ShieldCheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
    />
  </svg>
);

// Add these new icon components to your existing Icons.jsx file

export const ExternalLinkIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-4.5 0V6.75A.75.75 0 0 1 14.25 6h4.5m-4.5 0 4.5-4.5"
    />
  </svg>
);

export const ChevronDownIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

// We'll reuse the BookOpenIcon you already have, let's call it BookIcon for clarity if you wish
export { BookOpenIcon as BookIcon } from "./Icons";

export const YouTubeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      fillRule="evenodd"
      d="M19.802 5.802a.75.75 0 0 1 .746.746v10.904a.75.75 0 0 1-.746.746H4.198a.75.75 0 0 1-.746-.746V6.548a.75.75 0 0 1 .746-.746h15.604Zm-4.24 6.375a.75.75 0 0 1-.529 1.28l-4.47-2.582a.75.75 0 0 1 0-1.28l4.47-2.582a.75.75 0 0 1 1.058.64v5.164Z"
      clipRule="evenodd"
    />
  </svg>
);

export const AmazonIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className || "w-6 h-6"}
  >
    <path d="M13.29 8.243c.411-.322.84-.757.84-1.411 0-.964-.993-1.636-2.228-1.636-1.464 0-2.316.71-2.316 1.727 0 .386.106.687.235.84l4.02 3.998c.187.176.341.386.341.634 0 .4-.318.663-.84.663-.65 0-1.138-.4-1.636-.812L7.69 16.17c-1.129 1.05-2.25 1.636-3.836 1.636-1.745 0-2.852-1.164-2.852-2.735 0-2.181 2.375-3.052 4.181-3.052.757 0 1.455.125 2.06.375L12 8.718c.247-.247.532-.494.84-.71Zm-2.07-.318c0-.4.341-.71.757-.71.455 0 .748.33.748.71 0 .398-.318.71-.748.71-.424 0-.757-.322-.757-.71ZM24 12.19c0-5.918-4.444-6.043-4.444-6.043l-1.037.037c.187-.875.293-1.768.293-2.655C18.812 1.487 17.325 0 15.281 0c-2.08 0-3.664 1.455-3.664 3.493a3.42 3.42 0 0 0 .19.98L12 4.5l-.218-.218a3.518 3.518 0 0 0 .152-.92c0-2.045-1.583-3.494-3.664-3.494C6.188 0 4.636 1.47 4.636 3.53a5.55 5.55 0 0 0 .33 1.954L0 12.19l.133.028s4.11-.088 4.11 3.586c0 3.41-.955 4.144-1.618 4.144-.455 0-.618-.22-.618-.466 0-.638 1.018-1.227 1.018-2.655 0-1.79-1.3-2.827-2.61-2.827C.038 14 0 14.814 0 15.68c0 2.873 2.5 4.34 5.08 4.34 2.8 0 4.87-1.8 4.87-4.143 0-2.08-1.2-3.3-2.1-3.6.1.1.2.1.4.1s.4-.1.5-.2c.6.4 1.1.6 1.6.6s1-.2 1.6-.6c.1.1.2.1.4.1s.4-.1.5-.2c-.9.3-2.1 1.5-2.1 3.6 0 2.343 2.073 4.144 4.873 4.144C21.5 24 24 22.528 24 19.654c0-1.008-.037-1.756-.037-1.756l.037.028c0-3.674 4-3.586 4-3.586L24 12.19Z" />
  </svg>
);
