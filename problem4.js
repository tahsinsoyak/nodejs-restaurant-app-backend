const mongoose = require('mongoose');
const { User, Review } = require('./models/restaurantModel');
mongoose.connect('mongodb://localhost:27017/restaurantDB', { useNewUrlParser: true, useUnifiedTopology: true });

const getLast20MaleUsersByAge = async () => {
    try {
        const last20MaleUsers = await Review.aggregate([
            {   
                $lookup: {
                    from: 'users', 
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {  
                $unwind: '$user',
            },
            {   
                $match: {
                    'user.gender': 'male',
                },
            },
            {
                $sort: {
                    'user.age': -1,
                },
            },
            {
                $limit: 20,
            },
            {
                $project: {
                    'user._id': 1,
                    'user.username': 1,
                    'user.age': 1,
                },
            },
        ]);

        console.log('Son 20 erkek:', last20MaleUsers);
    } catch (error) {
        console.error('Hata Mesaji:', error);
    } finally {
        mongoose.connection.close();
    }
};

getLast20MaleUsersByAge();
