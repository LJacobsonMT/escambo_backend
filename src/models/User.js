const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    cpf: String,
    phone: String,
    city: String,
    uf: String,
    address: String,
    address_number: String,
    cep: String,
    complement: String,
    birth: String,
    password: String,
    products: Array,
})

module.exports = mongoose.model('User', UserSchema);