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

exports.handler = async event => {
    try {
        // If a filter is passed in, check whether it returns any results
        // TODO figure out how to reduce the amount of code
        if (event['params']['querystring']['filter']) {

            const filter = event['params']['querystring']['filter']

            const withFilter = await Query.find({
                requester: filter
            }).sort('-date').limit(10)

            if (withFilter && withFilter.length === 0) {
                console.info("no results")
                return []
            }

            else return withFilter
        }
        
        // If a filter is not passed in, return all results
        else {
            return await Query.find().sort('-date').limit(50)
        }

    } catch (err) {
        console.error("There was an error retrieving queries", err, event)
        process.exit(1)
    }
}
