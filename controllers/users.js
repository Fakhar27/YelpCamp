const User = require('../models/user')

module.exports.renderUserregister = (req, res) => {
    res.render('register')
}

module.exports.registerUserPost = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeruser = await User.register(user, password)
        req.login(registeruser, err => {
            if (err) {
                return next(err)
            }
            req.flash('success', 'WELCOME TO YELP CAMP!')
            res.redirect('/campgrounds')
        })
    }
    catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.userLoginRender = (req, res) => {
    res.render('login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!')
    const redirectUrl = res.locals.returnTo || '/campgrounds'
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            req.flash('error', 'Failed to logout');
            res.redirect('/');
        } else {
            req.flash('success', 'GOODBYE!!');
            res.redirect('/campgrounds');
        }
    });
}