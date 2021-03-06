const Product = require("../models/Product");
const User = require("../models/User");
const checkAuth = require("../utils/check-auth");

module.exports = {
	Query: {
		//Product Queries
		products: () => Product.find(),
		product: (_, { id }) => Product.findById(id),
	},
	Mutation: {
		//Product Mutation
		createProduct: async (
			_,
			{ user_id, title, description, category, images, value },
			context
		) => {
			const user = checkAuth(context);
			user_id = user.id;

			const newProduct = new Product({
				user_id,
				title,
				description,
				category,
				images,
				value,
			});

			const product = await newProduct.save();

			// Adding product to user portfolio:
			const addProductOperation = await User.findByIdAndUpdate(user_id, {
				$push: { products: product.id },
			});

			return product;
		},

		deleteProductById: async (_, { id }, context) => {
			try {
				const user = checkAuth(context);
				const deletedProduct = await Product.findByIdAndRemove(id);
				await User.findByIdAndUpdate(user.id, {
					$pull: { products: id },
				});
				return deletedProduct;
			} catch (err) {
				console.log(err);
				throw new Error("Error: " + err.message);
			}
		},

		updateProduct: (_, { id, productInput }) =>
			Product.findByIdAndUpdate(id, productInput, { new: true }),
	},
};
