const { GraphQLServer } = require('graphql-yoga')
const path = require('path')
const connection = require('../src/database/connection')
const userResolver = require('../src/resolvers/userResolver')
const productResolver = require('../src/resolvers/productResolver')
const profileResolver = require('../src/resolvers/profileResolver')
const { merge } = require('lodash');

const app = new GraphQLServer({
    typeDefs: path.resolve(__dirname, 'schema.graphql'),
    resolvers: merge(
        userResolver,
        productResolver,
        profileResolver
    ),
    context: (req) => {
        return {
            accesstoken: GetAccessToken(req.request)
        }
    },
});

const GetAccessToken = function (request) {
    const token = (request.headers.authorization || '').replace('BEARER ', '');
    return token;
}

module.exports = { app, connection }
