var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var fileUpload = require('express-fileupload');
global.__root   = __dirname + '/';

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());


app.use(express.static('./dist/'));

app.get('/', function (req, res) {
  res.render('./dist/index.html', {});
});

var MailController = require(__root + 'mail/MailController');
app.use('/api/mail', MailController);

var User = require(__root + 'user/UserController');
app.use('/api/user', User);

var Auth = require(__root + 'auth/AuthController');
app.use('/api/auth', Auth);

module.exports = app;