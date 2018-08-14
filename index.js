'use strict';

require('dotenv').config()
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Transaction = require('ethereumjs-tx')
const bodyParser = require('body-parser');
const port = process.env.PORT || 8088;
const path = require('path')
const cors = require('cors')


let middleware = {}

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false, limit: '5mb'
}));
app.use(bodyParser.json({limit: '5mb'}));
app.use(fileUpload());	


app.use(cors())
app.use(express.static(path.join(__dirname, '../build')));

var walletRoutes = require('./routes/wallets');
var txRoutes = require('./routes/txs');

app.use('/api',[], [walletRoutes,txRoutes]);

app.get('/', function (req, res, next) {
  res.sendfile('./public/index.html')
})

app.use(express.static('public'))

// app.listen(port, function () {
//   console.log('NANJ SDK listening on port ' + port + '!');
// })

var server = app.listen(port, () => {
	var host = server.address().address;
	var port = server.address().port;

	console.log('NANJ SDK listening at http://%s:%s', host, port);
});

module.exports = server
