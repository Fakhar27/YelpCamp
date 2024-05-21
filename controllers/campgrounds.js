const Campground = require('../models/campground');
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res) => {
    const perPage = 10; // Number of campgrounds per page
    const page = req.query.page || 1; // Current page number, default is 1

    try {
        const campgrounds = await Campground.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec();

        const count = await Campground.countDocuments();

        res.render('index', {
            campground: campgrounds,
            current: page,
            pages: Math.ceil(count / perPage)
        });
    } catch (err) {
        console.error('Error fetching campgrounds:', err);
        req.flash('error', 'Failed to fetch campgrounds');
        res.redirect('/campgrounds');
    }
};


// module.exports.index = async (req, res) => {
//     const campground = await Campground.find({})
//     res.render('index', { campground })
// }

module.exports.createcamptemplate = (req, res) => {
    res.render('create');
}

module.exports.createcamprequest = async (req, res, next) => {
    const geodata = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    const campground = new Campground(req.body.campground);
    campground.geometry = geodata.body.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showcampgrounds = async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('read', { campground, longitude: campground.geometry.coordinates[0], latitude: campground.geometry.coordinates[1] });
}

module.exports.editform = async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    // const camp = await Campground.findById(req.params.id)

    res.render('update', { campground });
}

module.exports.updateform = async (req, res) => {
    // const { id } = req.params;
    // const campground = await Campground.findById(id)
    // if (campground.author.equals(req.user._id)) {
    //     req.flash('error', 'SORRY,YOU DONT HAVE PERMISSION TO DO THAT')
    //     return res.redirect(`/campgrounds/${id}`)
    // }
    // req.flash('success', 'Successfully updated campground!');
    // res.redirect(`/campgrounds/${campground._id}`)

    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs);
    await campground.save();
    if (req.body.deleteimages) {
        for (let filename of req.body.deleteimages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deletemages } } } })
    }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deletecamps = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if (campground.author.equals(req.user._id)) {
        req.flash('error', 'SORRY,YOU DONT HAVE PERMISSION TO DO THAT')
        return res.redirect(`/campgrounds/${id}`)
    }
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}