exports.formatDate = function(time) {
  var date = new Date(time);
  var dateString = date.getDate();
  dateString += '/' + (date.getMonth() + 1);
  dateString += '/' + date.getFullYear();
  return dateString;
};

exports.toProperCase = function(str) {
  return str.replace(/\b\w/g, function(txt) {
    return txt.toUpperCase();
  });
};