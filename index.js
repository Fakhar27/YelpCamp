//  ***     REQUIREMENTS     ***
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express')
const helmet = require('helmet')
const app = express()
const mongosanitize = require('express-mongo-sanitize')
const joi = require('joi')
const campgrounds = require('./routes/campground');
const reviews = require('./routes/review');
const users = require('./routes/user');
const path = require('path')
const ejsMate = require('ejs-mate')
const cookieParser = require('cookie-parser')
const mongo = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local')
const morgan = require('morgan')
const AppError = require('./utils/AppError')
const MongoDBStore = require("connect-mongo")
const dburl = process.env.DB_ENV
// const sessionOption = { secret: 'hello', resave: false, saveUninitialized: false }
const CatchAsync = require('./utils/CatchAsync')
mongo.connect(dburl)
    .then(() => {
        console.log('CONNECTED TO MONGO')
        app.listen(3000, () => {
            console.log('LISTENIING TO PORT 3000')
            console.log('--     YELP CAMP    --')
        })
    })
    .catch((err) => {
        console.log('ERROR CONNECTING TO MONGO')
        console.log(err)
    })
const Campground = require('./models/campground')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const Joi = require('joi')
const User = require('./models/user.js')
const { campgroundSchema, reviewSchema } = require('./schema.js');
const user = require('./models/user.js');

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = MongoDBStore.create({
    mongoUrl: dburl, // Provide the MongoDB connection URL
    secret: secret, // Provide the secret for encrypting session data
    touchAfter: 24 * 60 * 60, // Touch session after specified time (optional)
});



const sessionconfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


//   ***    MIDDLEWARE  ***
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

// app.use(cookieParser('secret'))
app.use(session(sessionconfig))

app.use(flash());
// app.use(helmet())

app.use(passport.initialize());
app.use(passport.session());
app.use(mongosanitize());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// const scriptSrcUrls = [
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://api.mapbox.com/",
//     "https://kit.fontawesome.com/",
//     "https://cdnjs.cloudflare.com/",
//     "https://cdn.jsdelivr.net",
// ];
// const styleSrcUrls = [
//     "https://kit-free.fontawesome.com/",
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.mapbox.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://fonts.googleapis.com/",
//     "https://use.fontawesome.com/",
// ];
// const connectSrcUrls = [
//     "https://api.mapbox.com/",
//     "https://a.tiles.mapbox.com/",
//     "https://b.tiles.mapbox.com/",
//     "https://events.mapbox.com/",
// ];
// const fontSrcUrls = [];
// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: [],
//             connectSrc: ["'self'", ...connectSrcUrls],
//             scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//             styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//             workerSrc: ["'self'", "blob:"],
//             objectSrc: [],
//             imgSrc: [
//                 "'self'",
//                 "blob:",
//                 "data:",
//                 "https://res.cloudinary.com/daustuebj/",
//                 "https://images.unsplash.com/",
//             ],
//             fontSrc: ["'self'", ...fontSrcUrls],
//         },
//     })
// );

// if (!['/login', '/register', '/'].includes(req.originalUrl)) {
//     console.log(req.originalUrl);
//     req.session.returnTo = req.originalUrl;
// }

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get('/', (req, res) => {
    res.render('home')
});

app.use('/', users)
app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)





// ***  ERROR HANDLING MIDDLEWARE  ***
app.all('*', (req, res, next) => {
    next(new AppError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})



//  ***    METHODS      ***
// const checkPassword = (req, res, next) => {
//     const { password } = req.query
//     if (password === 'Pakistan1') {
//         next()
//     }
//     else {
//         throw new AppError('Sorry, you need a password', 404)
//     }
// }


//  ***    VALIDATION-METHODS      ***

// const validatecampground = (req, res, next) => {
//     const { error } = campgroundSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new AppError(msg, 400)
//     } else {
//         next();
//     }
// }
// const validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new AppError(msg, 400)
//     } else {
//         next();
//     }
// }

// const validatecampground = (req, res, next) => {
//     const campgroundSchema = joi.object({
//         campground: joi.object({
//             title: joi.string().required(),
//             price: joi.number().required().min(0),
//             image: joi.string().required(),
//             description: joi.string().required()
//         }).required()
//     })
//     const { error } = campgroundSchema.validate(req.body)
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new AppError(msg, 400)
//     } else {
//         next()
//     }
// }

// const validateReview = (req, res, next) => {
//     const reviewSchema = Joi.object({
//         review: Joi.object({
//             rating: Joi.number().required().min(1).max(5),
//             body: Joi.string().required()
//         }).required()
//     }).required()
//     const { error } = reviewSchema.validate(req.body)
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new AppError(msg, 400)
//     } else {
//         next()
//     }
// }

// *** ERROR HANDLING ***



//   ***    ROUTES     ***

// app.get('/campground', CatchAsync(async (req, res) => {
//     const camp = await Campground.find({})
//     res.render('index', { camp })
// }))

// app.get('/campground/:id', CatchAsync(async (req, res) => {
//     const { id } = req.params
//     const camp = await Campground.findById(id).populate('reviews')
//     res.render('read', { camp })
// }))

// app.get('/campground/:id/edit', CatchAsync(async (req, res) => {
//     const { id } = req.params
//     const camp = await Campground.findById(id)
//     res.render('update', { camp })
// }))

// app.delete('campground/:id', CatchAsync(async (req, res) => {
//     const { id } = req.params;
//     await Campground.findByIdAndDelete(id);
//     res.redirect('/campground');
// }));

// app.put('campground/:id', validatecampground, CatchAsync(async (req, res, next) => {
//     const { id } = req.params
//     const camp = await Campground.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
//     res.redirect(`/campground/${camp._id}`)
// }))

// app.get('/new', (req, res) => {
//     res.render('create')
// })

// app.post('/new', validatecampground, CatchAsync(async (req, res, next) => {
//     const camp = new Campground(req.body)
//     await camp.save()
//     res.redirect('/campground')
// }))

// app.post('/campground/:id/review/', validateReview, CatchAsync(async (req, res) => {
//     const camp = await Campground.findById(req.params.id)
//     const review = new Review(req.body.review)
//     camp.reviews.push(review)
//     await review.save()
//     await camp.save()
//     res.redirect(`/campground/${camp._id}`)
// }))

// app.delete('/campground/:id/review/:reviewID', CatchAsync(async (req, res) => {
//     const { id, reviewID } = req.params
//     await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewID } })
//     await Review.findById(req.params.reviewID)
//     res.redirect(`/campground/${id}`)
// }))



// app.use('/campground', campground)
// app.use('/campground/:id/review/', reviews)

// app.get('/pageviews', (req, res) => {
//     if (req.session.count) {
//         req.session.count += 1
//     }
//     else {
//         req.session.count = 1
//     }

//     res.send(`VIEWED PAGE: ${req.session.count}`)
// })

// app.get('/register', (req, res) => {
//     const { username = 'abc' } = req.query
//     req.session.username = username
//     res.redirect('/viewname')
// })

// app.get('/viewname', (req, res) => {
//     const { username } = req.session
//     res.send(`HELLO THERE ${username}`)
// })

// app.put('/update/:id', validatecampground, CatchAsync(async (req, res, next) => {
//     const { id } = req.params
//     const camp = await Campground.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
//     res.redirect(`/campground/${camp._id}`)
// }))

// app.get('/new', (req, res) => {
//     res.render('create')
// })

// app.post('/new', validatecampground, CatchAsync(async (req, res, next) => {
//     const camp = new Campground(req.body)
//     await camp.save()
//     res.redirect('/campground')
// }))


// app.get('/cookie', (req, res) => {
//     res.cookie('name', 'baby')
//     console.log(req.cookies)
//     res.send("okay")
// })

// app.get('/getsignedcookie', (req, res) => {
//     res.cookie('fruit', 'grape', { signed: true })
//     res.send('cookie')
// })

// app.get('verifycookie', (req, res) => {
//     console.log(req.cookies)
//     console.log(req.signedCookies)
//     res.send(req.signedCookies)
// })

// app.all('*', (req, res, next) => {
//     next(new AppError('Page Not Found', 404))
// })


// // ***  ERROR HANDLING MIDDLEWARE  ***

// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     if (!err.message) err.message = 'Oh No, Something Went Wrong!'
//     res.status(statusCode).render('error', { err })
// })

// app.use((err, req, res, next) => {
//     console.log(err.name);
//     if (err instanceof AppError) {
//         return res.status(err.statusCode).render('error', { err });
//     }
//     next(err);
// });

// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     if (!err.message) err.message = 'Oh No, Something Went Wrong!';
//     res.status(statusCode).render('error', { err });
// });