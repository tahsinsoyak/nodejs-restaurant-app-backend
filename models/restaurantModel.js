const mongoose = require('mongoose');
const { Schema } = mongoose;


// Kullanıcı adı, parola, email adresi , yaş, cinsiyet, profil resmi ve adres (çoklu)
// Kullanıcı 
const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  profileImage: { type: String },
  addresses: [{
    _id: { type: Schema.Types.ObjectId, auto: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    street: { type: String, required: true },
    location: { type: { type: String, default: 'Point' }, coordinates: [Number], default: [0, 0] },
  }],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});


// Restorant adı, açıklama, logosu, adres (çoklu), şubeleri (çoklu), menü (çoklu), restoran tipleri (çoklu), yorumlar (çoklu)
// Restoranlar koleksiyonu
const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  logo: { type: String },
  addresses: [{
    _id: { type: Schema.Types.ObjectId, auto: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    street: { type: String, required: true },
    location: { type: { type: String, default: 'Point' }, coordinates: [Number], default: [0, 0] },
  }],
  branches: [{
    city: { type: String, required: true },
    district: { type: String, required: true },
    street: { type: String, required: true },
    location: { type: { type: String, default: 'Point' }, coordinates: [Number] }
  }],
  menu: [{
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    content: { type: String },
    image: { type: String },
  }],
  restaurantType : { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  totalRating: { type: Number, default: 0 },
});

// Siparişler koleksiyonu
const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String },
    quantity: { type: Number },
  }],
  dateTime: { type: Date, default: Date.now },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});


// Yorumlar koleksiyonu
const ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  comment: { type: String, maxlength: 500 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  dateTime: { type: Date, default: Date.now },
});

// Model bağlantıları
const User = mongoose.model('User', UserSchema);
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
const Order = mongoose.model('Order', OrderSchema);
const Review = mongoose.model('Review', ReviewSchema);

module.exports = { User, Restaurant, Order, Review };
