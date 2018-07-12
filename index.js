'use strict';

require('dotenv').config()
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Transaction = require('ethereumjs-tx')
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
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
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname,'./build', 'index.html'));
// });

app.listen(port, function () {
  console.log('NANJ SDK listening on port ' + port + '!');
})
