var path = require('path')
  , config = require(path.join(__dirname, 'config'))
;
var Forecast = require('forecast.io');
var options = {
  APIKey: '2839faf68b7c54bcbae1161266394fa4',
  timeout: 10000
};
var forecast = new Forecast(options);
var locations = {
  'sydney':   {lat: -33.7969235, lng: 150.9224326},
  'brisbane': {lat: -27.4073899, lng: 153.0028595}
};

function formatDate(time) {
  var date = new Date(time);
  var dateString = date.getDate();
  dateString += '/' + (date.getMonth() + 1);
  dateString += '/' + date.getFullYear();
  return dateString;
}
function toProperCase(str) {
  return str.replace(/\b\w/g, function(txt) {
    return txt.toUpperCase();
  });
}

function addLocationDataToTemplateData(templateData, location) {
  var lowerLocation = location.toLowerCase();
  var properCaseLocation = toProperCase(location);
  var locationObj = locations[lowerLocation] || locations.sydney;
  return {
    location: properCaseLocation,
    title: 'Weather forecast for ' + properCaseLocation,
    latitude: locationObj.lat,
    longitude: locationObj.lng
  };
}

exports.getByLocation = function(req, res) {
  var templateData = addLocationDataToTemplateData(templateData, req.params.location);
  forecast.get(templateData.latitude, templateData.longitude, function (err, forecastRes, data) {
    if (err) throw err;
    console.log('Got data:', data);

    templateData.date = formatDate(data.currently.time * 1000); //convert to milliseconds then JS date object
    templateData.summary = data.daily.summary;
    templateData.temp = Math.round((data.currently.temperature - 32) / 1.8, 2); //farenheit to celcius

    res.render('index', {data: templateData});
  });
};

exports.getByLocationToday = function(req, res) {
  var templateData = addLocationDataToTemplateData(templateData, req.params.location);
  forecast.get(templateData.latitude, templateData.longitude, function (err, forecastRes, data) {
    if (err) throw err;
    console.log('Got data:', data);

    templateData.date = formatDate(new Date().getTime());
    templateData.summary = data.daily.summary;
    templateData.temp = Math.round((data.currently.temperature - 32) / 1.8, 2); //farenheit to celcius

    res.render('index', {data: templateData});
  });
};
exports.getByLocationAndDay = function(req, res) {
  var templateData = addLocationDataToTemplateData(templateData, req.params.location);
  forecast.get(templateData.latitude, templateData.longitude, function (err, forecastRes, data) {
    if (err) throw err;
    console.log('Got data:', data);

    templateData.date = formatDate(data.currently.time);
    templateData.summary = data.daily.summary;
    templateData.temp = Math.round((data.currently.temperature - 32) / 1.8, 2); //farenheit to celcius

    res.render('index', {data: templateData});
  });
};