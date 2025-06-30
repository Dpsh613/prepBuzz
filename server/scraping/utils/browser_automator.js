import puppeteer from "puppeteer-core";
import dotenv from "dotenv";

dotenv.config();
/**
 * Fetches a dynamic page, waits for a selector, and returns the final HTML content.
 * @param {string} url - The URL to navigate to.
 * @param {string} [waitSelector] - An optional CSS selector to wait for before getting content.
 * @returns {Promise<string>} The full page HTML after JavaScript has executed.
 */

export async function getDynamicPageContent(url, waitSelector) {
  // Add a check to ensure the path is available
  if (!process.env.CHROME_EXECUTABLE_PATH) {
    throw new Error("CHROME_EXECUTABLE_PATH is not set in the .env file.");
  }

  let browser = null;
  console.log(`   -> Launching browser for: ${url}`);
  try {
    browser = await puppeteer.launch({
      executablePath: process.env.CHROME_EXECUTABLE_PATH, // Read from .env
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    }); // Use the new headless mode

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 }); // Wait until network is quiet, 60s timeout

    if (waitSelector) {
      console.log(`   -> Waiting for selector: "${waitSelector}"`);
      await page.waitForSelector(waitSelector, { timeout: 30000 }); // 30s timeout
    }

    const content = await page.content();
    console.log(`   -> Successfully fetched dynamic content.`);
    return content;
  } catch (error) {
    console.error(
      `❌ Error getting dynamic page content for ${url}:`,
      error.message
    );
    // Return empty string on failure so the scraper can handle it gracefully
    return "";
  } finally {
    if (browser) {
      await browser.close();
      console.log(`   -> Browser closed.`);
    }
  }
}
