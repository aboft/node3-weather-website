const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const geocode = require(__dirname + '/utils/geocode.js')
const forecast = require(__dirname + '/utils/forecast.js')


//set up file path for templates
const publicDir = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../templates/partials')
const viewPath = path.join(__dirname, '../templates/views')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDir))


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Colton Markle',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Colton Markle'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'This is where the help info will be displayed.',
    name: 'Colton Markle',
  })
})

app.get('/weather', (req,res) => {
  if (!req.query.address) {
    return res.send({
      error: 'An address must be provided.',
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.',
    })
  }
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: '404 Help Page Not Found',
    title: '404 Help Page'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: '404 Page Not Found',
    title: '404',
  })
})

app.listen(port, () => {
  console.log(`Server is up and running on localhost:${port}`)
})
