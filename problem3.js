const mongoose = require('mongoose');
const { User, Restaurant, Order, Review } = require('./models/restaurantModel');
mongoose.connect('mongodb://localhost:27017/restaurantDB', { useNewUrlParser: true, useUnifiedTopology: true });

const addFoodItemsToMenu = async () => {
    try {
        const vocoFastFood = await Restaurant.findOne({ name: 'Voco Fast Food' });
        const newMenuItems = [
            { name: 'Küçük boy peynirli pizza', price: 50, content: 'Peynirli pizza içerisinde peynir bulunur.' , image: 'peynirli-pizza.jpg'},
            { name: 'Orta boy mantarlı pizza', price: 100 , content: 'Mantarlı pizza içerisinde mantar bulunur.' , image: 'mantarli-pizza.jpg'},
            { name: 'Hamburger', price: 120 , content: 'Hamburger içerisinde et bulunur.' , image: 'hamburger.jpg'},
        ];
        vocoFastFood.menu.push(...newMenuItems);
        await vocoFastFood.save();

        console.log('Yeni yemekler eklendi.');
    } catch (error) {
        console.error('Hata Mesaji:', error);
    } finally {
        mongoose.connection.close();
    }
};

addFoodItemsToMenu();
