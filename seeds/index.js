const mongo = require('mongoose')
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: '../.env' });
const { descriptors, places } = require('./seedHelpers')
const dburl = process.env.DB_ENV
const cities = require('./cities')
const axios = require('axios');

mongo.connect(dburl)
    .then(() => {
        console.log('CONNECTED TO MONGO')
        // app.listen(3000, () => {
        //     console.log('LISTENIING TO PORT 3000')
        //     console.log('--     YELP CAMP    --')
        // })
    })
    .catch((err) => {
        console.log('ERROR CONNECTING TO MONGO')
        console.log(err)
    })
const Campground = require('../models/campground')
const fs = require('fs');

const sample = array => array[Math.floor(Math.random() * array.length)];
const campgrounds = []

const fetchRandomImage = async (query) => {
    try {
        const response = await axios.get(`https://source.unsplash.com/900x900/?camp`);
        if (response.data && response.data.urls && response.data.urls.regular) {
            return response.data.urls.regular;
        }
    } catch (error) {
        console.error('Error fetching image from Unsplash:', error.message);
    }
    return null;
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 100);
        const imageQuery = `${sample(descriptors)} ${sample(places)} ${cities[random1000].city} ${cities[random1000].country} camping`;
        const imageUrl = await fetchRandomImage(imageQuery)
        const camp = new Campground({
            author: '65faaea37396b13f6e5e2c96',
            location: `${cities[random1000].city}, ${cities[random1000].country}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: imageUrl || 'https://source.unsplash.com/900x900/?camp',
                    filename: ''
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            price: Math.floor(Math.random() * 20) + 10,
        })
        await camp.save();
        campgrounds.push(camp);
    }
    generateGeoJSON(campgrounds);
}

const generateGeoJSON = (campgrounds) => {
    const geoJSONFeatures = campgrounds.map(camp => ({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [camp.geometry.coordinates[0], camp.geometry.coordinates[1]]
        },
        properties: {
            title: camp.title,
            description: camp.description,
            price: camp.price,
            location: camp.location
        }
    }));

    const geoJSON = {
        type: 'FeatureCollection',
        features: geoJSONFeatures
    };

    const filePath = path.join(__dirname, '..', 'static', 'campgrounds.geojson');
    // if (!fs.existsSync(directoryPath)) {
    //     fs.mkdirSync(directoryPath);
    // }

    fs.writeFileSync(filePath, JSON.stringify(geoJSON, null, 2));

    console.log('GeoJSON file saved:', filePath);
};

seedDB()
    .then(data => {
        console.log('DATA ENTERED')
        console.log(data)
    })