const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true
})

const QuerySchema = new mongoose.Schema({
    "requester": String,
    "geographicalAttributes": {
        "city-name": String,
        "elevation": Number,
        "latitude": Number,
        "longitude": Number,
        "state": String
    },
    "date": Date,
    "uuid": String,
    "shortName": String,
    "isGreaterThanOneWeek": Boolean,
    "isGreaterThanOneMonth": Boolean,
    "isGreaterThanOneYear": Boolean,
    "numberOfPredictedDays": Number,
    "rangeFrom": Date,
    "rangeTo": Date,
    "version": String,
    "placeID": String,
    "historical": [{
        "day": String,
        "date": Date,
        "min": Number,
        "max": Number
    }],
    "predictions": [{
        "day": String,
        "date": Date,
        "min": Number,
        "max": Number
    }],
    "actual": [{
        "day": String,
        "date": Date,
        "min": Number,
        "max": Number
    }]

}, {
        collection: 'queries'
    })

const Query = mongoose.model('Query', QuerySchema)

exports.handler = async (event) => {
    try {
        return await Query.find().sort('-date')
    }
    catch (err) {
        console.error("There was an error retrieving queries", err)
    }
}