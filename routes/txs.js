'use strict';
var Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTPP_ROVIDER))

var express = require('express')
var router = express.Router()
var config = require('../config.json')
const server = require('../assets/server')
var generateData = require('../assets/generate-data-relayerTx.js')

const appId = process.env.CLIENT_ID
const secretKey = process.env.SECRET_KEY
const NanjServer = new server(appId, secretKey)

let middleware = {}
middleware.transaction = require('../middleware/validate-transaction.js');

// for API using with private key
router.post('/tx/relayTx', [middleware.transaction], async function (req, res, next) {
	    // check balance 
	    let founderWallet = await generateData.address(req.body.from)
	    let balanceNanj = await generateData.getBalanceNanj(founderWallet)
	    // console.log('balanceNanj: '+balanceNanj)

	    let inputValue = req.body.value

	    if (balanceNanj <= 0 || inputValue > balanceNanj) {
	    	return res.status(403).json({message: "Your NANJ Amount not enought."});
	    }

		let dataHash = await generateData.generate(req.body.from, req.body.privKey, req.body.to, inputValue+"00000000")

        NanjServer.sentRelayTx(dataHash, 'test SDK').then(function(result) {
			return res.json(result)
	    }, function(err) {
			return res.json(err)
	    })
    })

// relayer for web with none private key
router.post('/tx/getRelayerTxHash', [middleware.transaction], async function (req, res, next) {
		// check balance 
	    let founderWallet = await generateData.address(req.body.from)
	    let balanceNanj = await generateData.getBalanceNanj(founderWallet)
	    // console.log('balanceNanj: '+balanceNanj)

	    let inputValue = req.body.value

	    if (balanceNanj <= 0 || inputValue > balanceNanj)
	    	return res.status(403).json({message: "Your NANJ Amount not enought."});

		let hash = await generateData.getRelayerTxHash(req.body.from, req.body.to, inputValue+"00000000", req.body.message)

        return res.status(200).json(hash)
    })

router.post('/tx/webRelayTx', async function (req, res, next) {
		let dataHash = req.body.hash
        NanjServer.sentRelayTx(dataHash, 'test SDK').then(function(result) {
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