(function() {

  function getEl(id) {
    return document.getElementById(id);
  }

  function getWeather(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4 || xhr.status !== 200) { return; }
        cb(xhr.responseText);
    };
    xhr.open('GET', url, true);
    xhr.send();
  }

  function bindEvents() {
    var getSydTodayBtn = getEl('nw-get-syd-today');
    getSydTodayBtn.addEventListener('click', function(e) {
      getWeather('weather/sydney', function(data) {
        console.log(data);
      });
      console.log('get weather');
    });
  }


  //init
//   bindEvents();
})();