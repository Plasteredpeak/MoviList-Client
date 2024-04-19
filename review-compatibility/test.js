// Test cases

const { calculateCompatibilityChange } = require("./index");

// Test case 1: First review with review count 0 and prev compatibility 0
let prevCompatibility = 0;
let worldRating = 10;
let myRating = 10;
let numReviews = 0;

let compatibilityChange = calculateCompatibilityChange(
  prevCompatibility,
  worldRating,
  myRating,
  numReviews,
);
console.log(
  `Compatibility Change after ${numReviews} reviews: ${compatibilityChange.toFixed(2)}%`,
); // the previous reviews are 0 so whatever the current change is will be the compatibility change which is 10/10

// Test case 2: Second review with review count 1 and prev compatibility 100
prevCompatibility = 100;
worldRating = 10;
myRating = 8;
numReviews = 1;

compatibilityChange = calculateCompatibilityChange(
  prevCompatibility,
  worldRating,
  myRating,
  numReviews,
);
console.log(
  `Compatibility Change after ${numReviews} reviews: ${compatibilityChange.toFixed(2)}%`,
); // the previous reviews are 1 so the compatibility change will be the weighted average of the previous compatibility and the new compatibility which is (100+80)/2

// Test case 3: Tenth review with review count 9 and prev compatibility 50
prevCompatibility = 70;
worldRating = 10;
myRating = 1;
numReviews = 9;

compatibilityChange = calculateCompatibilityChange(
  prevCompatibility,
  worldRating,
  myRating,
  numReviews,
);
console.log(
  `Compatibility Change after ${numReviews} reviews: ${compatibilityChange.toFixed(2)}%`,
);
// the previous reviews are 9 so the compatibility change of previous reviews which is 50 will have 9 times the weight of the current compatibility change which is 90/10
