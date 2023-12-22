
const mongoose = require('mongoose');
const { User, Restaurant, Order, Review } = require('./models/restaurantModel');
const { ObjectId } = require('mongodb');
mongoose.connect('mongodb://localhost:27017/restaurantDB', { useNewUrlParser: true, useUnifiedTopology: true });


const usersData = [
    {
        username: 'john_doe',
        password: 'securepassword',
        email: 'john@example.com',
        age: 25,
        gender: 'male',
        profileImage: 'avatar1.jpg',
        addresses: [
            { city: 'City1', district: 'District1', street: 'Street1', location: { coordinates: [40.7128, -74.0060] } },
            { city: 'City2', district: 'District2', street: 'Street2', location: { coordinates: [34.0522, -118.2437] } },
        ],
    },
    {
        username: 'jane_doe',
        password: 'strongpassword',
        email: 'jane@example.com',
        age: 30,
        gender: 'female',
        profileImage: 'avatar2.jpg',
        addresses: [
            { city: 'City3', district: 'District3', street: 'Street3', location: { coordinates: [41.8781, -87.6298] } },
            { city: 'City4', district: 'District4', street: 'Street4', location: { coordinates: [51.5074, -0.1278] } },
        ],
    },
    {
        username: 'user3',
        password: 'password3',
        email: 'user3@example.com',
        age: 28,
        gender: 'male',
        profileImage: 'avatar3.jpg',
        addresses: [
            { city: 'City5', district: 'District5', street: 'Street5', location: { coordinates: [45.4215, -75.6993] } },
            { city: 'City6', district: 'District6', street: 'Street6', location: { coordinates: [35.6895, 139.6917] } },
        ],
    },
    {
        username: 'user4',
        password: 'password4',
        email: 'user4@example.com',
        age: 32,
        gender: 'female',
        profileImage: 'avatar4.jpg',
        addresses: [
            { city: 'City7', district: 'District7', street: 'Street7', location: { coordinates: [39.9042, 116.4074] } },
            { city: 'City8', district: 'District8', street: 'Street8', location: { coordinates: [55.7558, 37.6173] } },
        ],
    },
    {
        username: 'user5',
        password: 'password5',
        email: 'user5@example.com',
        age: 26,
        gender: 'male',
        profileImage: 'avatar5.jpg',
        addresses: [
            { city: 'City9', district: 'District9', street: 'Street9', location: { coordinates: [52.5200, 13.4050] } },
            { city: 'City10', district: 'District10', street: 'Street10', location: { coordinates: [48.8566, 2.3522] } },
        ],
    },
];




const restaurantsData = [
    {
        name: 'Turkish Restaurant',
        description: ' Description of Turkish Restaurant Lahmacun, Kebab and baklava',
        logo: 'logo1.jpg',
        addresses: [
            { city: 'İstanbul', district: 'District1', street: 'Street1', location: { coordinates: [40.7128, -74.0060] } },
        ],
        branches: [
            { city: 'Ankara', district: 'District2', street: 'Street2', location: { coordinates: [34.0522, -118.2437] } },
            { city: 'İzmir', district: 'District3', street: 'Street3', location: { coordinates: [37.7749, -122.4194] } },
        ],
        menu: [
            { name: 'Lahmacun', price: 20, content: 'Description of Dish1', image: 'dish1.jpg' },
            { name: 'Baklava', price: 15, content: 'Description of Dish2', image: 'dish2.jpg' },
            { name: 'Kebab', price: 25, content: 'Description of Dish3', image: 'dish3.jpg' },
            { name: 'Pizza', price: 30, content: 'Description of Dish4', image: 'dish4.jpg' },
        ],
        restaurantType: 'Turkish',
    },
    {
        name: 'Italian Restaurant',
        description: ' Description of Italian Restaurant Pasta and pizza',
        logo: 'logo2.jpg',
        addresses: [
            { city: 'İstanbul', district: 'District4', street: 'Street4', location: { coordinates: [41.8781, -87.6298] } },
        ],
        branches: [
            { city: 'Ankara', district: 'District5', street: 'Street5', location: { coordinates: [51.5074, -0.1278] } },
        ],
        menu: [
            { name: 'Pasta', price: 20, content: 'Description of Dish5', image: 'dish5.jpg' },
            { name: 'Pizza', price: 15, content: 'Description of Dish6', image: 'dish6.jpg' },
            { name: 'Pasta', price: 25, content: 'Description of Dish7', image: 'dish7.jpg' },
            { name: 'Pizza', price: 30, content: 'Description of Dish8', image: 'dish8.jpg' },
        ],
        restaurantType: 'Italian',
    },
    {
        name: 'Chinese Restaurant',
        description: ' Description of Chinese Restaurant Delicious chineese food Lahmacun',
        logo: 'logo3.jpg',
        addresses: [
            { city: 'İstanbul', district: 'District6', street: 'Street6', location: { coordinates: [45.4215, -75.6993] } },
        ],
        branches: [
            { city: 'Ankara', district: 'District7', street: 'Street7', location: { coordinates: [35.6895, 139.6917] } },
        ],
        menu: [
            { name: 'Sushi', price: 20, content: 'Description of Dish9', image: 'dish9.jpg' },
            { name: 'Noodle', price: 15, content: 'Description of Dish10', image: 'dish10.jpg' },
            { name: 'Sushi', price: 25, content: 'Description of Dish11', image: 'dish11.jpg' },
            { name: 'Noodle', price: 30, content: 'Description of Dish12', image: 'dish12.jpg' },
        ],
        restaurantType: ' Chinese',
    }
];



const ordersData = [
    {
        userId: new ObjectId('65848dcaad9bb7b8a0f4402d'),
        restaurantId: new ObjectId('65848dcaad9bb7b8a0f4403e'),
        items: [{ name: 'Lahamacun', quantity: 2 }],
        dateTime: new Date(),
    },
    {
        userId: new ObjectId('65848dcaad9bb7b8a0f44030'),
        restaurantId: new ObjectId('65848dcaad9bb7b8a0f44046'),
        items: [{ name: 'Pizza', quantity: 1 }],
        dateTime: new Date(),
    },
    {
        userId: new ObjectId('65848dcaad9bb7b8a0f44033'),
        restaurantId: new ObjectId('65848dcaad9bb7b8a0f4404d'),
        items: [{ name: 'Sushi', quantity: 1 }],
        dateTime: new Date(),
    },
];

const reviewsData = [
    {
        userId: new ObjectId('65848dcaad9bb7b8a0f44033'),
        restaurantId: new ObjectId('65848dcaad9bb7b8a0f4404d'),
        rating: 5,
        comment: 'Comment1',
    },
    {
        userId: new ObjectId('65848dcaad9bb7b8a0f44030'),
        restaurantId: new ObjectId('65848dcaad9bb7b8a0f44046'),
        rating: 4,
        comment: 'Comment2',
    },
    {
        userId: new ObjectId('65848dcaad9bb7b8a0f4402d'),
        restaurantId: new ObjectId('65848dcaad9bb7b8a0f4403e'),
        rating: 3,
        comment: 'Comment3',
    }
];


async function seedDatabase() {
    try {
        await User.insertMany(usersData);
        await Restaurant.insertMany(restaurantsData);
        await Order.insertMany(ordersData);
        await Review.insertMany(reviewsData);
        

        console.log('Data successfully added to the database.');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        mongoose.disconnect();
    }
}

seedDatabase();