module.exports = {
  port: process.env.PORT || 9000,
  forecastApiKey: process.env.FORECAST_IO_KEY || '2839faf68b7c54bcbae1161266394fa4',
  forecastBaseUrl: process.env.FORECAST_IO_URL || 'https://api.forecast.io/forecast/'
};