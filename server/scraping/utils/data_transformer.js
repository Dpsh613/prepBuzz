/**
 * Takes a raw scraped age string and standardizes it.
 * @param {string} rawAge - The raw text scraped from the website.
 * @returns {string} A cleaned-up age string.
 */
export function standardizeAgeLimit(rawAge) {
  if (!rawAge) return "Not Available";
  // Example: "A candidate must be between 21 and 32 years." -> "21-32 years"
  const match = rawAge.match(/(\d{2}).*?(\d{2})\s*years/);
  if (match) {
    return `${match[1]}-${match[2]} years`;
  }
  // Fallback to the raw text, but clean it up a bit
  return rawAge.trim().replace(/\s\s+/g, " ");
}

/**
 * Takes a raw scraped qualification string and standardizes it.
 * @param {string} rawQualification - The raw text scraped from the website.
 * @returns {string} A cleaned-up qualification string.
 */
export function standardizeQualification(rawQualification) {
  if (!rawQualification) return "Not Available";
  // A simple example of standardization
  if (
    rawQualification
      .toLowerCase()
      .includes("degree from a recognised university")
  ) {
    return "A degree from a recognised university.";
  }
  return rawQualification.trim().replace(/\s\s+/g, " ");
}
