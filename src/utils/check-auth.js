const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../src/config')

module.exports = (context) => {
    // Context = { . . . headers }

    console.log(context)
    const authHeader = context.accesstoken

    console.log(context.req)
    if (authHeader) {
        // Bearer ...
        // TODO: I guess this is not needed anymore since this logic is running on app.js
        // Delete?
        const token = authHeader.split('Bearer ')[1];

        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication Token must be \'Bearer [token]')
    }
    throw new Error('Authentication header must be provided')
}

// 17:13