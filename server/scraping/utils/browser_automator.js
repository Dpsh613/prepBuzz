// scraping/utils/browser_automator.js

// CHANGE 1: Import puppeteer-extra and the stealth plugin
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import dotenv from "dotenv";

dotenv.config();

// CHANGE 2: Apply the stealth plugin
puppeteer.use(StealthPlugin());

export async function getDynamicPageContent(url, waitSelector) {
  if (!process.env.CHROME_EXECUTABLE_PATH) {
    throw new Error("CHROME_EXECUTABLE_PATH is not set in the .env file.");
  }

  let browser = null;
  console.log(`   -> Launching stealth browser for: ${url}`);
  try {
    browser = await puppeteer.launch({
      executablePath: process.env.CHROME_EXECUTABLE_PATH,
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // CHANGE 3 (Optional but recommended): Set a realistic viewport
    await page.setViewport({ width: 1280, height: 800 });

    // Use 'load' or 'domcontentloaded' as they are less likely to time out than 'networkidle2'
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    if (waitSelector) {
      console.log(`   -> Waiting for selector: "${waitSelector}"`);
      await page.waitForSelector(waitSelector, { timeout: 30000 });
    }

    const content = await page.content();
    console.log(`   -> Successfully fetched dynamic content.`);
    return content;
  } catch (error) {
    console.error(
      `❌ Error getting dynamic page content for ${url}:`,
      error.message
    );
    return "";
  } finally {
    if (browser) {
      await browser.close();
      console.log(`   -> Browser closed.`);
    }
  }
}
