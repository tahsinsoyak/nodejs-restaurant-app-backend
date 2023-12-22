const mongoose = require('mongoose');
const { Restaurant, Review } = require('./models/restaurantModel');
mongoose.connect('mongodb://localhost:27017/restaurantDB', { useNewUrlParser: true, useUnifiedTopology: true });

const addReviewAndUpdateTotalRating = async (restaurantId, userId, rating) => {
    try {
      const review = new Review({ restaurantId, userId, rating });
      await review.save();
      const reviews = await Review.find({ restaurantId });
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      await Restaurant.findByIdAndUpdate(
        restaurantId,
        { $set: { totalRating } },
        { new: true }
      );
      console.log(`Review eklendi yeni totalrating: ${totalRating}`);
    } catch (error) {
      console.error('Hata mesaji:', error);
    }
};

const userId = '65848dcaad9bb7b8a0f44030';
const restaurantId = '65848dcaad9bb7b8a0f4403e';
const rating = 3;

addReviewAndUpdateTotalRating(restaurantId, userId, rating);
