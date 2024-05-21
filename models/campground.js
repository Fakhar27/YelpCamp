const mongo = require('mongoose')
const Review = require('./review')
const User = require('./user')


const imageSchema = new mongo.Schema({
    url: String,
    filename: String,
})

imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

const opts = { toJSON: { virtuals: true } };

const Campground = new mongo.Schema({
    title: String,
    images: [
        imageSchema
    ],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: mongo.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

Campground.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 20)}...</p>`
})

Campground.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongo.model('Campground', Campground)