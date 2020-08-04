const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    user_id: String,
    title: String,
    description: String,
    category: String,
    images: Array,
    value: String,
})

module.exports = mongoose.model('Product', ProductSchema);