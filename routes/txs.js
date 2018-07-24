'use strict';

var express = require('express')
var router = express.Router()
var config = require('../config.json')
const server = require('../assets/server')
var generateData = require('../assets/generate-data-relayerTx.js')



router.post('/tx/relayTx', async function (req, res, next) {
		let appId = process.env.CLIENT_ID
		let secretKey = process.env.SECRET_KEY
	    let NanjServer = new server(appId, secretKey)
		let data = await generateData.generate(req.body.from, req.body.privKey, req.body.to, req.body.value)
		console.log(data)
		await NanjServer.sentRelayTx(data, 'test SDK').then(function(result) {
			return res.json(result)
	    }, function(err) {
			return res.json(err)
	    })
    })

router.post('/tx/raw', function (req, res, next) {
	  	let appId = process.env.CLIENT_ID
		let secretKey = process.env.SECRET_KEY
        let NanjServer = new server(appId, secretKey)
		var sentRawTx = NanjServer.sentRawTx(req.body.from,req.body.privKey,req.body.to,req.body.value,'message')
        sentRawTx.then(function(result) {
			return res.json(result)
	    }, function(err) {
			return res.json(err)
	    })
    })

module.exports = router;