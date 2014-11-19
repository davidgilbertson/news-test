var path = require('path')
  , config = require(path.join(__dirname, 'config'))
  , utils = require(path.join(__dirname, 'utils'))
;

//Using forecast.io. In a prod environment would properly evaluate how solid this is and spend some time reading the GitHub issues.
var Forecast = require('forecast.io');
var options = {
  APIKey: '2839faf68b7c54bcbae1161266394fa4',
  timeout: 10000
};

var forecast = new Forecast(options);

//Could also use the Google geolocation API
var locations = {
  'sydney':   {lat: -33.7969235, lng: 150.9224326},
  'brisbane': {lat: -27.4073899, lng: 153.0028595}
};


function addLocationDataToTemplateData(templateData, location) {
  var lowerLocation = location.toLowerCase();
  var properCaseLocation = utils.toProperCase(location);
  var locationObj = locations[lowerLocation] || locations.sydney;
  return {
    location: properCaseLocation,
    latitude: locationObj.lat,
    longitude: locationObj.lng
  };
}

exports.getByLocation = function(req, res) {
  //template data is what the jade template will use
  var templateData = addLocationDataToTemplateData(templateData, req.params.location);
  templateData.title = 'Weather forecast for ' + templateData.location;

  forecast.get(templateData.latitude, templateData.longitude, function (err, forecastRes, data) {
    if (err) throw err;
    //TODO wrap in a try/catch or otherwise test that data is JSON
    templateData.date = utils.formatDate(data.currently.time * 1000); //convert to milliseconds then JS date object
    templateData.summary = data.daily.summary;
    templateData.temp = Math.round((data.currently.temperature - 32) / 1.8, 2); //farenheit to celcius

    //render the template with the template data.
    //pass it as the value to 'data' so it is clearer in the template what text is a reference to data.
    res.render('index', {data: templateData});
  });
};

//TODO these are not yet firing off different requests to forecast.io so will return the same data.
//This is not very DRY, with more familiarity with the API I could assess the best was to break this up into reusable functions.
exports.getByLocationToday = function(req, res) {
  var templateData = addLocationDataToTemplateData(templateData, req.params.location);
  templateData.title = 'Weather forecast for ' + templateData.location + ' today';

  forecast.get(templateData.latitude, templateData.longitude, function (err, forecastRes, data) {
    if (err) throw err;
    console.log('Got data:', data);

    templateData.date = utils.formatDate(new Date().getTime());
    templateData.summary = data.daily.summary;
    templateData.temp = Math.round((data.currently.temperature - 32) / 1.8, 2); //farenheit to celcius

    res.render('index', {data: templateData});
  });
};
exports.getByLocationAndDay = function(req, res) {
  var templateData = addLocationDataToTemplateData(templateData, req.params.location);
  templateData.title = 'Weather forecast for ' + templateData.location + ' for ' + utils.toProperCase(req.params.day); //TODO read actual

  forecast.get(templateData.latitude, templateData.longitude, function (err, forecastRes, data) {
    if (err) throw err;
    console.log('Got data:', data);

    templateData.date = utils.formatDate(data.currently.time);
    templateData.summary = data.daily.summary;
    templateData.temp = Math.round((data.currently.temperature - 32) / 1.8, 2); //farenheit to celcius

    res.render('index', {data: templateData});
  });
};