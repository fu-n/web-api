'use strict';
var Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTPP_ROVIDER))

var express = require('express')
var router = express.Router()
var config = require('../config.json')
const server = require('../assets/server')
var generateData = require('../assets/generate-data-relayerTx.js')

router.post('/tx/relayTx', async function (req, res, next) {
		let appId = process.env.CLIENT_ID
		let secretKey = process.env.SECRET_KEY
	    let NanjServer = new server(appId, secretKey)

	    // check balance 
	    let founderWallet = await generateData.address(req.body.from)
	    let balanceNanj = await generateData.getBalanceNanj(founderWallet)
	    // console.log('balanceNanj: '+balanceNanj)
	    if (balanceNanj <= 0) {
	    	return res.status(403).json({message: "Your NANJ Amount not enought."});
	    }

		let data = new Promise(function(resolve, reject) {
			generateData.generate(req.body.from, req.body.privKey, req.body.to, req.body.value).then(function(result) {
				resolve(result)
			}, function(err) {
				reject(err)
			})
		})

		data.then(function(response) {
			// let _response = JSON.stringify(response)
			NanjServer.sentRelayTx(response, 'test SDK').then(function(result) {
				return res.json(result)
		    }, function(err) {
				return res.json(err)
		    })
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