//Using 'comma before' style. Not for everyone, I would follow whatever the project styleguide says.
var path = require('path')
  , express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env.PORT || 9000
  , jade = require('jade')
;

app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Depending on environment, this might serve out of a client/dist/test directory.
//In reality, a different config file may also be loaded at this point.
app.use(express.static('client'));

//set up routes for the app
require(path.join(__dirname, 'server', 'routes.js'))(app);

//start the server
app.listen(port, function() {
  console.log('Node listening on port ' + port);
});

app.get('/', function(req, res) {
  //Simply redirecting the root. In reality would do some work on the front end to not display the results if there aren't any.
  res.redirect('/weather/sydney');
});