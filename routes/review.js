const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews.js')
const catchAsync = require('../utils/CatchAsync');
const { isLoggedin, validateReview, isReviewAuthor } = require('../middleware.js')



router.post('/', isLoggedin, validateReview, catchAsync(reviews.postreview))

router.delete('/:reviewId', isLoggedin, isReviewAuthor, catchAsync(reviews.deletereview))

module.exports = router;