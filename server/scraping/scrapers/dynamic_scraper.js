import { getDynamicPageContent } from "../utils/browser_automator.js";
import * as cheerio from "cheerio";

export async function scrapeDynamicData(config) {
  console.log(`   -> Scraping (DYNAMIC): ${config.url}`);
  const htmlContent = await getDynamicPageContent(
    config.url,
    config.waitForSelector
  );

  if (!htmlContent) {
    console.log(`   -> Aborting scrape for ${config.url} due to fetch error.`);
    return {};
  }

  const $ = cheerio.load(htmlContent);
  const dynamicData = {}; // Start with an empty object

  // --- Handler: Scrape a List of Notices/Updates ---
  // (Most dynamic sites will have this structure)
  if (config.selectors.noticeList) {
    dynamicData.updates = [];
    const noticeElements = $(config.selectors.noticeList);

    noticeElements.each((index, element) => {
      if (index >= 5) return; // Limit to the latest 5 notices

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

  // Add other handlers here if dynamic sites provide different data types

  return dynamicData;
}
