const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require("../../src/config");
const checkAuth = require('../utils/check-auth');

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name
    }, SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    Query: {
        //User Queries
        users: () => User.find(),
        user: async (_, { id }, context) => {
            checkAuth(context);
            const user = await User.findById(id);
            return user;
        },
    },

    Mutation: {
        //User Mutation
        createUser: async (_, {
            name,
            email,
            cpf,
            phone,
            city,
            uf,
            address,
            address_number,
            cep,
            complement,
            birth,
            password,
            products
        }) => {
            // TODO: Validate User Data
            // TODO: Hash password and create an auth token
            const existingUser = await User.findOne({ email: email })
            if (existingUser) {
                throw new Error('User exists already.')
            } else {
                password = await bcrypt.hash(password, 12);

                const newUser = new User({
                    name,
                    email,
                    cpf,
                    phone,
                    city,
                    uf,
                    address,
                    address_number,
                    cep,
                    complement,
                    birth,
                    password,
                    products
                })

                const res = await newUser.save()

                const token = generateToken(res)

                return {
                    ...res._doc,
                    id: res._id,
                    token
                };
            }
        },

        deleteUserById: async (_, { id }) => {
            const existingUser = await User.findOne({ _id: id })
            if (existingUser) {
                return User.findByIdAndRemove(id, { new: true })
            } else {
                throw new Error('User not found.')
            }

        },
        updateUser: (_, { id, userInput }) => User.findByIdAndUpdate(id, userInput, { new: true }),

        loginUser: async (_, { loginInput }) => {

            const inputEmail = loginInput.email
            const inputPassword = loginInput.password
            const user = await User.findOne({ email: inputEmail })
            const match = await bcrypt.compare(inputPassword, user.password)

            if (!match) {
                throw new Error('Wrong credential')
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },

    },
}