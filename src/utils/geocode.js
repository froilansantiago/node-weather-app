const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWtvc2lwb2xhbiIsImEiOiJja3U4M3VuY3owNndyMm9wM2wzOXd0NjQ0In0.52HoKA12D6EAx5z0bMhFBw&language=en&limit=1'
    request({ url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.message || body.features.length === 0) {
            callback('Unable to find the location. Try another search.', undefined)
        } else {
            const lat = body.features[0].center[1]
            const long = body.features[0].center[0]
            const location = body.features[0].place_name
            const data = {
                lat: lat,
                long: long,
                location: location
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode
