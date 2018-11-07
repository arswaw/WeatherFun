const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rpn = require("requestretry");
const uuid = require("uuid");

async function connect() {
    try {
        mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true
        });
    } catch (err) {
        console.info("Error connecting to MongoDB", err)
    }
}

connect()

const RAW_PLACES_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="
const PLACES_KEY = process.env.PLACES_KEY

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

app.use(bodyParser.json())
app.use(express.static('public'))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    next();
});

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/query', async (req, res) => {
    try {

        const state = await getState(req.body.placeID)

        const uri = `${process.env.MODEL}/weather/weather-pred?requester=${encodeURI(req.body.requester)}&longitude=${req.body.coords.coordinates[0]}&latitude=${req.body.coords.coordinates[1]}&city_name=${encodeURI(req.body.city)}&state=${state}&num_of_days_prediction=7&start_date=${req.body.date}`

        const response = await rpn({
            uri: uri,
            method: 'GET',
            maxAttempts: 1,
            retryDelay: 300,
            retryStrategy: rpn.RetryStrategies.HTTPOrNetworkError,
            fullResponse: false,
            json: true
        })

        await Query.create({
            date: req.body.date,
            uuid: uuid.v4(),
            geographicalAttributes: {
                "city-name": req.body.city,
                elevation: response.geographicalAttributes.elevation,
                latitude: req.body.coords.coordinates[1],
                longitude: req.body.coords.coordinates[0],
                state: state
            },
            historical: response.historical,
            shortName: req.body.shortName || "",
            isGreaterThanOneMonth: false,
            isGreaterThanOneWeek: false,
            isGreaterThanOneYear: false,
            numberOfPredictedDays: 7,
            predictions: response.predictions,
            rangeFrom: response.rangeFrom,
            rangeTo: response.rangeTo,
            requester: req.body.requester,
            placeID: req.body.placeID
        })
        return res.json({
            status: "Created!"
        })
    } catch (err) {
        console.error("There was an error with creating a query", err)
        return res.status(500)
    }
})
app.get('/query', async (req, res) => {
    return res.json(await Query.find().sort('-date'))
})
app.get('/text', async (req, res) => {
    const uri = `${RAW_PLACES_URL}${req.query.place}&key=${PLACES_KEY}`
    try {
        return res.json(await rpn({
            uri: uri,
            method: 'GET',
            maxAttempts: 1,
            retryDelay: 300,
            retryStrategy: rpn.RetryStrategies.HTTPOrNetworkError,
            fullResponse: false,
            json: true
        }))
    } catch (err) {
        console.info("There was an issue with the Places operation", err)
    }
})

async function getState(placeID) {
    const uri = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&fields=name,rating,formatted_phone_number,address_component&key=${PLACES_KEY}`
    try {
        const response = await rpn({
            uri: uri,
            method: 'GET',
            maxAttempts: 1,
            retryDelay: 300,
            retryStrategy: rpn.RetryStrategies.HTTPOrNetworkError,
            fullResponse: false,
            json: true
        })
        const { short_name } = response.result.address_components.find(component => {
            return component.types.includes("administrative_area_level_1")
        })
        return short_name 
    } catch (err) {
        console.info("There was an issue with getting the state", err)
    }
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
