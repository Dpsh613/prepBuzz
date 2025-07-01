// src/config/exam-themes.js
import * as Icons from "../components/Icons";

export const examConfigMap = {
  // Engineering, Medical & University
  "jee-main-advanced": { icon: Icons.BookOpenIcon, theme: "blue" },
  "neet-ug": { icon: Icons.BookOpenIcon, theme: "green" },
  "cuet": { icon: Icons.BookOpenIcon, theme: "purple" },
  "gate": { icon: Icons.BookOpenIcon, theme: "yellow" },
  "cat": { icon: Icons.BookOpenIcon, theme: "red" },
  
  // Civil Services & Defence
  "upsc-cse": { icon: Icons.BuildingLibraryIcon, theme: "purple" },
  "upsc-cds": { icon: Icons.ShieldCheckIcon, theme: "gray" },
  "upsc-nda-na": { icon: Icons.ShieldCheckIcon, theme: "blue" },
  "afcat": { icon: Icons.ShieldCheckIcon, theme: "blue" },
  
  // Government (SSC & Railways)
  "ssc-cgl": { icon: Icons.BuildingLibraryIcon, theme: "green" },
  "rrb-ntpc": { icon: Icons.BuildingLibraryIcon, theme: "red" },

  // Banking & Insurance
  "ibps-po": { icon: Icons.BanknotesIcon, theme: "green" },
  "sbi-po": { icon: Icons.BanknotesIcon, theme: "blue" },
  "rbi-grade-b": { icon: Icons.BanknotesIcon, theme: "red" },

  // Teaching & Research
  "ctet": { icon: Icons.CheckBadgeIcon, theme: "yellow" },
  "ugc-net": { icon: Icons.CheckBadgeIcon, theme: "purple" },

  // Default fallback
  default: { icon: Icons.BookOpenIcon, theme: "gray" },
};  