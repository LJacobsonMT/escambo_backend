const Product = require('../models/Product')
const User = require('../models/User');
const checkAuth = require('../utils/check-auth')

module.exports = {

    Query: {
        profile: async (_, { id }, context) => {
            const userAuth = checkAuth(context);

            // Check if the userId provided is the same as userAuth has. 
            if (id === userAuth.id) {

                const user = await User.findById(id);
                const productList = []

                const promises = user.products.map(async (id) => {
                    const product = await Product.findById(id);
                    productList.push(product)
                })

                await Promise.all(promises);
                return productList;

            } else {
                return;
            }
        }

    }

}