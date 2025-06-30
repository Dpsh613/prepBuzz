import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Fetches and loads a static HTML page into Cheerio.
 * @param {string} url - The URL of the page to fetch.
 * @returns {Promise<cheerio.CheerioAPI>} A Cheerio instance ready for querying.
 */
export async function loadStaticPage(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    return cheerio.load(data);
  } catch (error) {
    console.error(`Error fetching static page ${url}:`, error.message);
    throw new Error(`Could not load static page: ${url}`);
  }
}
