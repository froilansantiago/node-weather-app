const request = require('request')

const forecast = (lat, long, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=8f500fc65708813e7ad0d2f49320a025&query='+lat+','+long
	// const url = 'http://api.weatherstack.com/current?access_key=8f500fc65708813e7ad0d2f49320a025&query='+lat+','+long+'&units=f'

	request({ url, json: true}, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined)
		} else if (body.error) {
			callback('Unable to find location.', undefined)
		} else {
			// const data = {
			// 	weather_description: response.body.current.weather_descriptions,
			// 	temperature: response.body.current.temperature,
			// 	feelslike: response.body.current.feelslike
			// }
			const weather = body.current
			callback(undefined, weather.weather_descriptions[0] + '. It is currently ' + weather.temperature + ' degress out. It feels like ' + weather.feelslike + '. The humidity is '+ weather.humidity + '%.')
		}
	})
}

module.exports = forecast