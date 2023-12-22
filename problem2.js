const mongoose = require('mongoose');
const { Restaurant } = require('./models/restaurantModel');
mongoose.connect('mongodb://localhost:27017/restaurantDB', { useNewUrlParser: true, useUnifiedTopology: true });

const findRestaurantsNearCoordinates = async () => {
    try {
        const coordinates = [39.93, 32.85];
        const radius = 10000; 

        const nearbyRestaurants = await Restaurant.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: coordinates,
                    },
                    distanceField: 'distance',
                    maxDistance: radius,
                    spherical: true,
                },
            },
            {
                $match: {
                    description: { $regex: /lahmacun/i }, 
                },
            },
            {
                $limit: 5,
            },
        ]);
        console.log('Açıklamasında "lahmacun" geçen 5 restoran:' , nearbyRestaurants);
    } catch (error) {
        console.error('Hata mesaji:', error);
    } finally {
        mongoose.connection.close();
    }
};

findRestaurantsNearCoordinates();
