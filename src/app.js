const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths  for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup for handlebars and views/templates location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
	res.render('index',{
		title: 'Weather App',
		name: 'Froilan Santiago'

	})
})

app.get('/about', (req, res) => {
	res.render('about',{
		title: 'About',
		name: 'Froilan Santiago'

	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Froilan Santiago',
		message: 'Incase you encounter an error, please notify the developer.',
		email: 'froilansantiago@gmail.com'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide a search term.'
		})
	}
	geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({
				error
			})
        } 
        forecast(lat, long, (error, forecastData) => {
			if (error) {
				return res.send({
					error
				})
			} 
			res.send({
				location,
				forecast: forecastData,
				address: req.query.address
			})
        }) 
    })
	
})



app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Error 404',
		name: 'Froilan Santiago',
		message: 'Help Aricle not found',
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: 'Error 404',
		name: 'Froilan Santiago',
		message: 'Page not found.',
	})
})


app.listen(port, () => {
	console.log('Server is up on port ' + port)
})