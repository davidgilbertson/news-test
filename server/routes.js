var path = require('path')
  , weatherController = require(path.join(__dirname, 'weatherController'))
;

module.exports = function(app) {
  app.get('/weather/:location', weatherController.getByLocation);
  app.get('/weather/:location/today', weatherController.getByLocationToday);
  app.get('/weather/:location/:day', weatherController.getByLocationAndDay);
};