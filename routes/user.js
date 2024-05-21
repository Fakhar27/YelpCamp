const express = require('express')
const router = express.Router()
const passport = require('passport');
const users = require('../controllers/users')
const { storeReturnTo } = require('../middleware');
const catchAsync = require('../utils/CatchAsync')

router.get('/register', users.renderUserregister)

router.post('/register', catchAsync(users.registerUserPost))

router.get('/login', users.userLoginRender)

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: 'login' }), users.login)

router.get('/logout', users.logout);

module.exports = router