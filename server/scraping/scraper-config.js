/**
 * ==================================================================================
 * Master Configuration for All Scrapers
 * ==================================================================================
 * This file serves as the central "work order" for the scrape-runner.
 * Each object in the array represents a single exam to be scraped.
 *
 * To add a new exam:
 * 1. Add a new object to the EXAMS_TO_SCRAPE array.
 * 2. Fill in the static data (name, shortName, conductingBody, etc.).
 * 3. Initially, set scraperConfig and scraperFunction to null.
 *
 * Later, a developer will:
 * 1. Analyze the officialWebsite to determine the scraping strategy (static/dynamic/pdf).
 * 2. Define the scraperConfig object with URL, selectors, etc.
 * 3. Assign the appropriate scraperFunction (e.g., scrapeWithCheerio, scrapeWithPuppeteer).
 * ==================================================================================
 */

// Import scraper functions
import { scrapeStaticData } from "./scrapers/static_scraper.js";
import { scrapeDynamicData } from "./scrapers/dynamic_scraper.js";

export const EXAMS_TO_SCRAPE = [
  // =============================================
  // 1. Engineering, Medical & University Entrance Exams
  // =============================================
  {
    name: "JEE (Joint Entrance Examination - Main & Advanced)",
    shortName: "jee-main-advanced",
    conductingBody: "NTA & IITs",
    description:
      "A national-level engineering entrance examination for admission to NITs, IIITs (Main), and IITs (Advanced).",
    officialWebsite: "https://jeemain.nta.ac.in/",
    scraperConfig: {
      strategy: "DYNAMIC",
      url: "https://jeemain.nta.ac.in/",
      waitForSelector: "#public-notices",
      selectors: {
        noticeList: "#public-notices li",
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeDynamicData,
  },
  {
    name: "NEET-UG (National Eligibility cum Entrance Test)",
    shortName: "neet-ug",
    conductingBody: "NTA",
    description:
      "The single, national-level entrance examination for students wishing to study any undergraduate medical course (MBBS, BDS).",
    officialWebsite: "https://exams.nta.ac.in/NEET/",
    scraperConfig: {
      strategy: "DYNAMIC",
      url: "https://exams.nta.ac.in/NEET/",
      waitForSelector: "#public-notices",
      selectors: {
        noticeList: "#public-notices li",
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeDynamicData,
  },
  {
    name: "CUET (Common University Entrance Test)",
    shortName: "cuet",
    conductingBody: "NTA",
    description:
      "A standardized test for admission to multiple undergraduate, postgraduate, and diploma programs in Central Universities of India.",
    officialWebsite: "https://cuet.samarth.ac.in/",
    scraperConfig: {
      strategy: "DYNAMIC",
      url: "https://cuet.samarth.ac.in/",
      waitForSelector: ".public-notice-card",
      selectors: {
        noticeList: ".public-notice-card li",
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeDynamicData,
  },
  {
    name: "GATE (Graduate Aptitude Test in Engineering)",
    shortName: "gate",
    conductingBody: "IISc & IITs",
    description:
      "A national-level examination on the comprehensive understanding of various undergraduate subjects in engineering and science for admission into a master's program and recruitment by some public sector companies.",
    officialWebsite: "https://gate.iisc.ac.in/",
    scraperConfig: {
      strategy: "STATIC",
      url: "https://gate.iisc.ac.in/",
      selectors: {
        noticeList: "#announcements p", // Each announcement is in a paragraph
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "CAT (Common Admission Test)",
    shortName: "cat",
    conductingBody: "Indian Institutes of Management (IIMs)",
    description:
      "A computer-based test for admission into postgraduate management programs at IIMs and other top business schools in India.",
    officialWebsite: "https://iimcat.ac.in/",
    scraperConfig: {
      strategy: "STATIC",
      url: "https://iimcat.ac.in/",
      selectors: {
        noticeList: ".whats-new-scroll li",
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeStaticData,
  },

  // =============================================
  // 2. Civil Services & Defence Exams
  // =============================================
  {
    name: "UPSC Civil Services Exam (CSE)",
    shortName: "upsc-cse",
    conductingBody: "UPSC",
    description:
      "A nationwide competitive examination for recruitment to various Civil Services of the Government of India, including IAS, IFS, and IPS.",
    officialWebsite: "https://upsc.gov.in",
    scraperConfig: {
      strategy: "STATIC",
      url: "https://upsc.gov.in/examinations/active-examinations/civil-services-examination",
      selectors: {
        ageLimit: ".field--name-field-age-limits .field--item",
        education:
          ".field--name-field-minimum-educational-qualifi .field--item",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "UPSC CDS (Combined Defence Services) Exam",
    shortName: "upsc-cds",
    conductingBody: "UPSC",
    description:
      "Recruitment of Commissioned Officers in the Indian Military Academy, Officers Training Academy, Indian Naval Academy and Indian Air Force Academy.",
    officialWebsite: "https://upsc.gov.in",
    scraperConfig: {
      strategy: "STATIC",
      url: "https://upsc.gov.in/examinations/active-examinations/combined-defence-services-examination-i",
      selectors: {
        // Using the same structure as UPSC CSE for consistency
        ageLimit: ".field--name-field-age-limits .field--item",
        education:
          ".field--name-field-minimum-educational-qualifi .field--item",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "UPSC NDA & NA (National Defence Academy) Exam",
    shortName: "upsc-nda-na",
    conductingBody: "UPSC",
    description:
      "Admission to the Army, Navy and Air Force wings of the NDA, and for the Indian Naval Academy Course (INAC).",
    officialWebsite: "https://upsc.gov.in",
    scraperConfig: {
      strategy: "STATIC",
      url: "https://upsc.gov.in/examinations/active-examinations/national-defence-academy-and-naval-academy-examination-i",
      selectors: {
        ageLimit: ".field--name-field-age-limits .field--item",
        education:
          ".field--name-field-minimum-educational-qualifi .field--item",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "AFCAT (Air Force Common Admission Test)",
    shortName: "afcat",
    conductingBody: "Indian Air Force",
    description:
      "A national-level entrance exam for selecting officers in Flying and Ground Duty (Technical and Non-Technical) branches of the Indian Air Force.",
    officialWebsite: "https://afcat.cdac.in/afcatreg/",
    scraperConfig: {
      strategy: "DYNAMIC",
      url: "https://afcat.cdac.in/afcatreg/",
      waitForSelector: "#NewsAndEvents",
      selectors: {
        noticeList: "#NewsAndEvents .news_item",
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeDynamicData,
  },
  {
    name: "UPSC IES/ESE (Engineering Services Exam)",
    shortName: "upsc-ies-ese",
    conductingBody: "UPSC",
    description:
      "Recruitment for engineering positions in various departments of the Government of India.",
    officialWebsite: "https://upsc.gov.in",
    scraperConfig: {
      strategy: "STATIC",
      url: "https://upsc.gov.in/examinations/active-examinations/engineering-services-main-examination",
      selectors: {
        ageLimit: ".field--name-field-age-limits .field--item",
        education:
          ".field--name-field-minimum-educational-qualifi .field--item",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "UPSC CMS (Combined Medical Services)",
    shortName: "upsc-cms",
    conductingBody: "UPSC",
    description:
      "Recruitment of medical graduates into various central government organizations and services.",
    officialWebsite: "https://upsc.gov.in",
    scraperConfig: {
      strategy: "STATIC",
      url: "https://upsc.gov.in/examinations/active-examinations/combined-medical-services-examination",
      selectors: {
        ageLimit: ".field--name-field-age-limits .field--item",
        education:
          ".field--name-field-minimum-educational-qualifi .field--item",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "IB ACIO (Intelligence Bureau Exam)",
    shortName: "ib-acio",
    conductingBody: "Ministry of Home Affairs",
    description:
      "Recruitment for the post of Assistant Central Intelligence Officer (Grade-II/Executive) in the Intelligence Bureau.",
    officialWebsite: "https://www.mha.gov.in/notifications/vacancies",
    scraperConfig: {
      strategy: "STATIC",
      url: "https://www.mha.gov.in/notifications/vacancies",
      selectors: {
        noticeList: "tbody tr", // Each table row is a notice
        noticeTitle: "td:nth-of-type(2)", // Text content of the 2nd cell
        noticeLink: "td:nth-of-type(2) a", // Link inside the 2nd cell
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "State Civil Services Exams (e.g., PCS)",
    shortName: "state-pcs",
    conductingBody: "State Public Service Commissions (PSC)",
    description:
      "Recruitment for state-level administrative posts like SDM, DSP, etc. The pattern and website vary by state.",
    officialWebsite: "https://uppsc.up.nic.in/", // Example: Uttar Pradesh PSC
    scraperConfig: {
      strategy: "STATIC",
      url: "https://uppsc.up.nic.in/",
      selectors: {
        noticeList: "#ContentPlaceHolder1_UpdatePanel5 li",
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeStaticData,
  },

  // =============================================
  // 3. General Government (SSC & Railways)
  // =============================================
  {
    name: "SSC CGL (Combined Graduate Level Exam)",
    shortName: "ssc-cgl",
    conductingBody: "SSC",
    description:
      "Recruits staff for various Group B and C posts in ministries, departments and organisations of the Government of India.",
    officialWebsite: "https://ssc.gov.in",
    scraperConfig: {
      strategy: "STATIC",
      url: "https://ssc.gov.in/",
      selectors: {
        latestNewsBox: "#latest-news",
        newsTitle: ".title",
        newsDate: ".date",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "SSC CHSL (Combined Higher Secondary Level Exam)",
    shortName: "ssc-chsl",
    conductingBody: "SSC",
    description:
      "Recruits staff for posts such as Lower Divisional Clerk, Junior Secretariat Assistant, and Data Entry Operator.",
    officialWebsite: "https://ssc.gov.in",
    scraperConfig: {
      // Same config as SSC CGL
      strategy: "STATIC",
      url: "https://ssc.gov.in/",
      selectors: {
        latestNewsBox: "#latest-news",
        newsTitle: ".title",
        newsDate: ".date",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "SSC GD Constable Exam",
    shortName: "ssc-gd",
    conductingBody: "SSC",
    description:
      "Recruitment of Constable (General Duty) in Border Security Force (BSF), Central Industrial Security Force (CISF), and other Central Armed Police Forces.",
    officialWebsite: "https://ssc.gov.in",
    scraperConfig: {
      // Same config as SSC CGL
      strategy: "STATIC",
      url: "https://ssc.gov.in/",
      selectors: {
        latestNewsBox: "#latest-news",
        newsTitle: ".title",
        newsDate: ".date",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "SSC CPO (Central Police Organization Exam)",
    shortName: "ssc-cpo",
    conductingBody: "SSC",
    description:
      "Recruitment of Sub-Inspectors in Delhi Police and Central Armed Police Forces (CAPFs).",
    officialWebsite: "https://ssc.gov.in",
    scraperConfig: {
      // Same config as SSC CGL
      strategy: "STATIC",
      url: "https://ssc.gov.in/",
      selectors: {
        latestNewsBox: "#latest-news",
        newsTitle: ".title",
        newsDate: ".date",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "RRB NTPC (Non-Technical Popular Categories)",
    shortName: "rrb-ntpc",
    conductingBody: "Railway Recruitment Boards (RRB)",
    description:
      "Recruitment for various non-technical posts like Clerk, Goods Guard, Station Master, etc., in the Indian Railways.",
    officialWebsite: "https://www.rrbcdg.gov.in/", // Note: Website varies by RRB region
    scraperConfig: {
      strategy: "STATIC",
      url: "https://www.rrbcdg.gov.in/active_notice_board.php", // More stable URL
      selectors: {
        noticeList: "tbody tr",
        noticeTitle: "td:nth-of-type(2)",
        noticeLink: "td:nth-of-type(3) a",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "RRB Group D",
    shortName: "rrb-group-d",
    conductingBody: "Railway Recruitment Boards (RRB)",
    description:
      "Recruitment for Level 1 posts like Track Maintainer, Helper, Assistant Pointsman, etc., in the Indian Railways.",
    officialWebsite: "https://www.rrbcdg.gov.in/", // Note: Website varies by RRB region
    scraperConfig: {
      // Same config as RRB NTPC
      strategy: "STATIC",
      url: "https://www.rrbcdg.gov.in/active_notice_board.php",
      selectors: {
        noticeList: "tbody tr",
        noticeTitle: "td:nth-of-type(2)",
        noticeLink: "td:nth-of-type(3) a",
      },
    },
    scraperFunction: scrapeStaticData,
  },

  // =============================================
  // 4. Banking & Insurance
  // =============================================
  {
    name: "IBPS PO (Probationary Officer)",
    shortName: "ibps-po",
    conductingBody: "IBPS",
    description:
      "Recruitment of Probationary Officers/Management Trainees in participating public sector banks.",
    officialWebsite: "https://www.ibps.in",
    scraperConfig: {
      strategy: "STATIC",
      url: "https://www.ibps.in",
      selectors: {
        noticeList: "#horizontal-ticker li",
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "IBPS Clerk",
    shortName: "ibps-clerk",
    conductingBody: "IBPS",
    description:
      "Recruitment of clerical cadre in participating public sector banks.",
    officialWebsite: "https://www.ibps.in",
    scraperConfig: {
      // Same config as IBPS PO
      strategy: "STATIC",
      url: "https://www.ibps.in",
      selectors: {
        noticeList: "#horizontal-ticker li",
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "SBI PO (Probationary Officer)",
    shortName: "sbi-po",
    conductingBody: "State Bank of India",
    description:
      "Recruitment of Probationary Officers in the State Bank of India, one of the most coveted banking jobs.",
    officialWebsite: "https://sbi.co.in/web/careers",
    scraperConfig: {
      strategy: "DYNAMIC",
      url: "https://sbi.co.in/web/careers/current-openings",
      waitForSelector: "#accordionExample",
      selectors: {
        noticeList: "#accordionExample .card",
        noticeTitle: ".card-header h5",
        noticeLink: ".card-body a.btn",
      },
    },
    scraperFunction: scrapeDynamicData,
  },
  {
    name: "SBI Clerk (Junior Associates)",
    shortName: "sbi-clerk",
    conductingBody: "State Bank of India",
    description:
      "Recruitment for the clerical cadre (Junior Associates) in various branches of the State Bank of India.",
    officialWebsite: "https://sbi.co.in/web/careers",
    scraperConfig: {
      // Same config as SBI PO
      strategy: "DYNAMIC",
      url: "https://sbi.co.in/web/careers/current-openings",
      waitForSelector: "#accordionExample",
      selectors: {
        noticeList: "#accordionExample .card",
        noticeTitle: ".card-header h5",
        noticeLink: ".card-body a.btn",
      },
    },
    scraperFunction: scrapeDynamicData,
  },
  {
    name: "RBI Grade B Officer",
    shortName: "rbi-grade-b",
    conductingBody: "Reserve Bank of India",
    description:
      "Recruitment for the prestigious officer level post in the Reserve Bank of India.",
    officialWebsite: "https://opportunities.rbi.org.in/",
    scraperConfig: {
      strategy: "STATIC",
      url: "https://opportunities.rbi.org.in/Scripts/Vacancies.aspx",
      selectors: {
        noticeList: "#Table1 tbody tr:not(:first-child)",
        noticeTitle: "td:nth-of-type(2) a",
        noticeLink: "td:nth-of-type(2) a",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "RBI Assistant",
    shortName: "rbi-assistant",
    conductingBody: "Reserve Bank of India",
    description:
      "Recruitment for the post of 'Assistant' in various offices of the Reserve Bank of India.",
    officialWebsite: "https://opportunities.rbi.org.in/",
    scraperConfig: {
      // Same config as RBI Grade B
      strategy: "STATIC",
      url: "https://opportunities.rbi.org.in/Scripts/Vacancies.aspx",
      selectors: {
        noticeList: "#Table1 tbody tr:not(:first-child)",
        noticeTitle: "td:nth-of-type(2) a",
        noticeLink: "td:nth-of-type(2) a",
      },
    },
    scraperFunction: scrapeStaticData,
  },

  // =============================================
  // 5. Teaching & Research
  // =============================================
  {
    name: "CTET (Central Teacher Eligibility Test)",
    shortName: "ctet",
    conductingBody: "CBSE",
    description:
      "An eligibility test for teachers for classes 1 to 8 in central government schools like KVS, NVS.",
    officialWebsite: "https://ctet.nic.in/",
    scraperConfig: {
      strategy: "STATIC",
      url: "https://ctet.nic.in/",
      selectors: {
        noticeList: ".news-block li",
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "UGC-NET (National Eligibility Test)",
    shortName: "ugc-net",
    conductingBody: "NTA",
    description:
      "Determines eligibility for 'Assistant Professor' and 'Junior Research Fellowship' in Indian universities and colleges.",
    officialWebsite: "https://ugcnet.nta.nic.in/",
    scraperConfig: {
      strategy: "DYNAMIC",
      url: "https://ugcnet.nta.nic.in/",
      waitForSelector: ".news-block",
      selectors: {
        noticeList: ".news-block li",
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeDynamicData,
  },
  {
    name: "State TET (Teacher Eligibility Test)",
    shortName: "state-tet",
    conductingBody: "State Education Boards",
    description:
      "Eligibility test for teachers in state government schools. The pattern and website vary by state.",
    officialWebsite: "https://updeled.gov.in/", // Example: Uttar Pradesh TET
    scraperConfig: {
      strategy: "STATIC",
      url: "https://updeled.gov.in/",
      selectors: {
        noticeList: ".notification-list li",
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeStaticData,
  },

  // =============================================
  // 6. Professional Certifications
  // =============================================
  {
    name: "CA (Chartered Accountancy) Exams",
    shortName: "icai-ca",
    conductingBody: "ICAI",
    description:
      "The professional examination for becoming a Chartered Accountant in India, with Foundation, Intermediate, and Final levels.",
    officialWebsite: "https://www.icai.org/",
    scraperConfig: {
      strategy: "STATIC",
      url: "https://www.icai.org/post/announcements", // Specific announcements page
      selectors: {
        noticeList: ".t-body p",
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeStaticData,
  },
  {
    name: "CS (Company Secretary) Exams",
    shortName: "icsi-cs",
    conductingBody: "ICSI",
    description:
      "A professional examination for becoming a Company Secretary, covering corporate laws, governance, and finance.",
    officialWebsite: "https://www.icsi.edu/",
    scraperConfig: {
      strategy: "DYNAMIC",
      url: "https://www.icsi.edu/",
      waitForSelector: "#CSIAccordion",
      selectors: {
        noticeList: "#CSIAccordion li",
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeDynamicData,
  },
  {
    name: "CMA (Cost and Management Accountancy) Exams",
    shortName: "icmai-cma",
    conductingBody: "ICMAI",
    description:
      "A professional examination focusing on cost accounting, management accounting, and financial management.",
    officialWebsite: "https://icmai.in/icmai/",
    scraperConfig: {
      strategy: "DYNAMIC",
      url: "https://icmai.in/icmai/",
      waitForSelector: ".updates-slider",
      selectors: {
        noticeList: ".updates-slider .item",
        noticeTitle: "a",
        noticeLink: "a",
      },
    },
    scraperFunction: scrapeDynamicData,
  },
];
