const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../src/config");

module.exports = (context) => {
	const authHeader = context.accesstoken;

	if (authHeader) {
		// Bearer ...
		// TODO: I guess this is not needed anymore since this logic is running on app.js
		// Delete?
		const token = authHeader.split("Bearer ")[1];

		if (token) {
			try {
				const user = jwt.verify(token, SECRET_KEY);
				return user;
			} catch (err) {
				throw new AuthenticationError("401 - Invalid/Expired token");
			}
		}
		throw new Error("401 - Authentication Token must be 'Bearer [token]");
	}
	throw new Error("401 - Authentication header must be provided");
};

// 17:13
