// Configuration file

const config = {}

config.map = {
  apiKey: 'AIzaSyBv73MKTa_z7YWKnKsdICscFg4kkAqm5wo',
  markers: [
    { name: 'Tokio', country: 'Japani', image: 'assets/images/jp.jpg', lat: 35.6584421, lng: 139.7328635 },
    { name: 'Helsinki', country: 'Suomi', image: 'assets/images/fi.jpg', lat: 60.1697530, lng: 24.9490830 },
    { name: 'New York', country: 'Yhdysvallat', image: 'assets/images/us.jpg', lat: 40.7406905, lng: -73.9938438 },
    { name: 'Amsterdam', country: 'Alankomaat', image: 'assets/images/nl.jpg', lat: 52.3650691, lng: 4.9040238 },
    { name: 'Dubai', country: 'Yhdistyneet Arabiemiirikunnat', image: 'assets/images/uae.jpg', lat: 25.092535, lng: 55.1562243 }
  ],
  weatherApi: {
    user: 'weather-prod',
    pass: 'KTa_z7YWKnzaSyBv'
  }
}

module.exports = config
