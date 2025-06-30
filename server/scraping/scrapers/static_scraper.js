import { loadStaticPage } from "../utils/html_parser.js";
import {
  standardizeAgeLimit,
  standardizeQualification,
} from "../utils/data_transformer.js";

export async function scrapeStaticData(config) {
  console.log(`   -> Scraping (STATIC): ${config.url}`);
  const $ = await loadStaticPage(config.url);

  const dynamicData = {}; // Start with an empty object

  // --- Handler 1: Scrape Eligibility Data (like for UPSC) ---
  if (config.selectors.ageLimit && config.selectors.education) {
    const rawAge = $(config.selectors.ageLimit).text();
    const rawQual = $(config.selectors.education).text();
    dynamicData.eligibility = {
      ageLimit: standardizeAgeLimit(rawAge),
      educationalQualification: standardizeQualification(rawQual),
    };
    console.log(`   -> Found eligibility data.`);
  }

  // --- Handler 2: Scrape a List of Notices/Updates ---
  if (config.selectors.noticeList) {
    dynamicData.updates = []; // Use a more generic name
    const noticeElements = $(config.selectors.noticeList);

    noticeElements.each((index, element) => {
      if (index >= 5) return; // Limit to the latest 5 notices to keep it clean

      const title = $(element).find(config.selectors.noticeTitle).text().trim();
      let link =
        $(element).find(config.selectors.noticeLink)?.attr("href") || "";

      // Make sure link is a full URL
      if (link && !link.startsWith("http")) {
        link = new URL(link, config.url).href;
      }

      if (title && link) {
        dynamicData.updates.push({ title, link });
      }
    });
    console.log(`   -> Found ${dynamicData.updates.length} notices.`);
  }

  // --- Handler 3: Scrape a Single "Latest News" Box (like for SSC) ---
  if (config.selectors.latestNewsBox) {
    const newsBox = $(config.selectors.latestNewsBox);
    const title = newsBox
      .find(config.selectors.newsTitle)
      .first()
      .text()
      .trim();
    const date = newsBox.find(config.selectors.newsDate).first().text().trim();
    if (title) {
      dynamicData.latestUpdate = { title, date };
      console.log(`   -> Found latest news item.`);
    }
  }

  return dynamicData;
}
