// Configuration file

const config = {}

config.map = {
  apiKey: 'something', // Google Maps API key
  markers: [ // Map markers
    { name: 'Tokyo', country: 'Japan', image: 'assets/images/jp.jpg', lat: 35.6584421, lng: 139.7328635 },
    { name: 'Helsinki', country: 'Finland', image: 'assets/images/fi.jpg', lat: 60.1697530, lng: 24.9490830 },
    { name: 'New York', country: 'United States of America', image: 'assets/images/us.jpg', lat: 40.7406905, lng: -73.9938438 },
    { name: 'Amsterdam', country: 'The Netherlands', image: 'assets/images/nl.jpg', lat: 52.3650691, lng: 4.9040238 },
    { name: 'Dubai', country: 'United Arab Emirates', image: 'assets/images/uae.jpg', lat: 25.092535, lng: 55.1562243 }
  ]
}

config.api = { // Proprietary API configuration
  url: 'localhost:8000',
  user: 'something',
  pass: 'something'
}

module.exports = config
