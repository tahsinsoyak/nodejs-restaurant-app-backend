const express = require('express');
const mongoose = require('mongoose');
const { Restaurant, Review } = require('./models/restaurantModel');

const app = express();
const port = 3000;
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/restaurantDB', {useNewUrlParser: true, useUnifiedTopology: true, });

app.get('/restaurants', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const restaurants = await Restaurant.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'restaurantId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $skip: (page - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
    ]);

    res.json(restaurants);
  } catch (error) {
    console.error('Hata Mesaji:', error);
    res.status(500).json({ error: 'Server Hatasi' });
  }
});

app.listen(port, () => {
  console.log(`Server Calisiyor ${port}`);
});
