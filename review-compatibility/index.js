// index.js

/**
 * Calculate compatibility change based on the previous compatibility,
 * world rating, my rating, and the number of reviews.
 *
 * @param {number} prevCompatibility - Previous compatibility value (0-100).
 * @param {number} worldRating - World rating for the item (1-10).
 * @param {number} myRating - My rating for the item (1-10).
 * @param {number} numReviews - Number of reviews.
 * @returns {number} Compatibility change percentage.
 */
function calculateCompatibilityChange(
  prevCompatibility,
  worldRating,
  myRating,
  numReviews,
) {
  // If there are no previous reviews, return the current compatibility
  if (numReviews === 0) {
    return (myRating / worldRating) * 100;
  }

  // Calculate weighted average for compatibility change
  const currentChange = (myRating / worldRating) * 100;
  const weightedPrevCompatibility = prevCompatibility * numReviews;
  const totalReviews = numReviews + 1; // Including the new review
  const newCompatibilityChange =
    (weightedPrevCompatibility + currentChange) / totalReviews;

  return newCompatibilityChange;
}

module.exports = {
  calculateCompatibilityChange,
};
