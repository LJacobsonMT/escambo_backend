const ApolloClient = require("apollo-boost").default;
const fetch = require('node-fetch')
const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    fetch: fetch
})

module.exports = { client };