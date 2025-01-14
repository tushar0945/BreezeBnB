const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewController = require("../controllers/reviewController.js");
const {
  validateReviews,
  isLoggedIn,
  isReviewAuthor,
} = require("../midelware.js");

//Review
//Post review route
router.post(
  "/",
  isLoggedIn,
  validateReviews,
  wrapAsync(reviewController.createReview)
);

//Delete Review route

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
