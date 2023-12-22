const mongoose = require('mongoose');
const { Restaurant } = require('./models/restaurantModel');
mongoose.connect('mongodb://localhost:27017/restaurantDB', { useNewUrlParser: true, useUnifiedTopology: true });

const findRestaurantsQuery = async () => {
    try {
      const result = await Restaurant.aggregate([
        {
          $match: {
            $or: [
              { restaurantType: 'Fast Food' },
              { restaurantType: 'Ev Yemekleri' },
              { description: { $regex: /fast/i } }
            ],
          }
        },
        {
          $match: {
            totalRating: { $gte: 4 }
          }
        },
        {
          $project: {
            _id: 0,
            name: 1,
            restaurantType: 1,
            description: 1
          }
        }
      ]);
  
      console.log('Sonuçlar:', result);
    } catch (error) {
      console.error('Hata Mesaji:', error);
    } finally {
      mongoose.connection.close();
    }
  };

findRestaurantsQuery();
