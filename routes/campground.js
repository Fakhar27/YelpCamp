const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds.js')
const CatchAsync = require('../utils/CatchAsync');
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const { isLoggedin, validateCampground, isAuthor } = require('../middleware.js')

router.get('/', CatchAsync(campgrounds.index));

router.get('/new', isLoggedin, campgrounds.createcamptemplate)

router.post('/', isLoggedin, upload.array('images'), validateCampground, CatchAsync(campgrounds.createcamprequest))

router.get('/:id', CatchAsync(campgrounds.showcampgrounds));

router.get('/:id/edit', isLoggedin, isAuthor, CatchAsync(campgrounds.editform))

router.put('/:id', isLoggedin, isAuthor, upload.array('images'), validateCampground, CatchAsync(campgrounds.updateform));

router.delete('/:id', isLoggedin, isAuthor, CatchAsync(campgrounds.deletecamps));

module.exports = router;

//wedding hall fyp