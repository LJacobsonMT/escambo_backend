const Product = require('../models/Product')
const checkAuth = require('../utils/check-auth')

module.exports = {
    Query: {
        //Product Queries
        products: () => Product.find(),
        product: (_, { id }) => Product.findById(id),
    },
    Mutation: {
        //Product Mutation
        createProduct: async (_, {
            user_id,
            title,
            description,
            category,
            images,
        }, context) => {
            const user = checkAuth(context);
            console.log(user)

            user_id = user.id;

            console.log(user_id)

            const newProduct = new Product({
                user_id,
                title,
                description,
                category,
                images,
            })

            const product = await newProduct.save();

            return product;

        },
        deleteProductById: (_, { id }) => Product.findByIdAndRemove(id),
        updateProduct: (_, { id, productInput }) => Product.findByIdAndUpdate(id, productInput, { new: true }),
    },
}