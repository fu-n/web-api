'use strict';

var express = require('express')
var Web3 = require('web3')
const abiDecoder = require('abi-decoder');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTPP_ROVIDER))
var router = express.Router()
var config = require('../config.json')


const TXRELAYABI = require('../assets/abi/TXRELAYABI.json');
const NanJABI = require('../assets/abi/NanJABI.json');
const server = require('../assets/server')

router.post('/tx/relayTx', function (req, res, next) {
	  	let appId = process.env.CLIENT_ID
		let secretKey = process.env.SECRET_KEY
		let NanjServer = new server(appId, secretKey)
		var sentRawTx = NanjServer.sentRawTx(req.body.from,req.body.key,req.body.to,req.body.value,'message')
        sentRawTx.then(function(result) {
			return res.json(result)
	    }, function(err) {
			return res.json(err)
	    })
    })

module.exports = router;