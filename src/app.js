const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
// Port for Heroku (with fallback to port 3000 if running in local environment)
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine ('hbs') and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Snubtac'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Snubtac'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Snubtac',
    message: 'This is some helpful text.'
  })
});

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

   if(error) {
     return res.send({ error })
   } else {
     forecast(latitude, longitude, (error, forecastData) => {
       if(error) {
         return res.send({ error })
       }
       res.send({
         forecast: forecastData,
         location,
         address: req.query.address
       })
     })
   }
 })
});

app.get('/products', (req, res) => {
  req.query
  res.send({
    products: []
  })
})

// * is wildcard - matches anything
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorText: 'Help article not found.',
    name: 'Snubtac'
  })
});

// Set up route handler for 404 page. Must come last
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorText: 'Page not found.',
    name: 'Snubtac'
  })
})

app.listen(port, () => {
  console.log('Server is up on port 3000.' + port)
})
