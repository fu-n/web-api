'use strict';

var express = require('express')
var router = express.Router()

let middleware = {}
middleware.mnemonic = require('../middleware/validate-mnemonic.js');
middleware.walletImport = require('../middleware/validate-wallet-import.js');

const nanj = require('nanjs')
const nanjWallet = nanj.wallet

router.get('/wallet/check', function(req, res, next) {
	nanjWallet.walletCheck(req.query.address).then(function(result) {
		return res.status(200).json({message: 'Success.', data: result})
    }, function(err) {
		return res.json(err)
    })
})

router.get('/wallet/relayNonce', function(req, res, next) {
	nanjWallet.relayNonce(req.query.address).then(function(result) {
		return res.status(200).json({message: 'Success.', data: result})
    }, function(err) {
		return res.json(err)
    })
})

router.post('/wallet/create', [middleware.mnemonic], function(req, res, next) {
	nanjWallet.createWallet(req.body.mnemonic_phrase, req.body.password).then(function(result) {
		if (result.status !== 200) 
			return res.status(result.status).json({message: result.message })
		return res.status(result.status).json({message: 'Success.', data: result })
	}, function(err) {
		return res.json(err)
    })
})

router.post('/wallet/import', [middleware.walletImport], function(req, res, next) {
	var jsonKeystore = null;
	if (typeof req.files == 'undefined') {
		jsonKeystore = req.body.keystore;
	} else {
		jsonKeystore = req.files.keystore.data;
	}

	nanjWallet.importWallet(jsonKeystore, req.body.password).then(function(result) {
		if (result.status !== 200) 
			return res.status(result.status).json({message: result.message })
		return res.status(result.status).json({message: 'Success.', data: result })
	}, function(err) {
		return res.json(err)
    })

})

module.exports = router;