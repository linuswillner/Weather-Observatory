module.exports = {
  apps: [
    {
      name: 'Weather API',
      script: './api.js',
      watch: true,
      env: {
        'NODE_ENV': 'production'
      }
    }
  ]
}
