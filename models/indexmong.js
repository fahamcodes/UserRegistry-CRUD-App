const mongoose = require('mongoose');

// Connecting to local MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/testapp1");

// Defining structure of user data
const userSchema = mongoose.Schema({
    image: String,
    email: String,
    name: String
});

// Exporting model so it can be used in routes
module.exports = mongoose.model('user', userSchema);
