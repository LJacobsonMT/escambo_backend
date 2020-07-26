const mongoose = require('mongoose')

const config = process.env.NODE_ENV

if (config == 'test') {
    console.log('Test mode: connecting with graphqlnodetest')
    mongoose.connect('mongodb://localhost:27017/graphqlnodetest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
} else {
    mongoose.connect('mongodb://localhost:27017/graphqlnode', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
}


