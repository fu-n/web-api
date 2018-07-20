'use strict';

var express = require('express')
var router = express.Router()
var config = require('../config.json')

const { generateMnemonic, EthHdWallet } = require('eth-hd-wallet')

const ethUtil    = require('ethereumjs-util');
const lightwallet = require('eth-lightwallet');
const txutils = lightwallet.txutils;
var myetherwallet = require('../assets/myetherwallet.js');
var generateData = require('../assets/generate-data-relayerTx.js')
var keythereum = require("keythereum");

let middleware = {}
middleware.mnemonic = require('../middleware/validate-mnemonic.js');
middleware.walletImport = require('../middleware/validate-wallet-import.js');

router.get('/wallet/check', function(req, res, next) {
		let response = {}
		response.address = generateData.address(req.query.address)

		return res.status(200).json({ statusCode: 200, message: 'Success.', data: response });
    });

router.post('/wallet/create', [middleware.mnemonic], function(req, res, next) {
    	let mnemonicPhrase = req.body.mnemonic_phrase
    	const hdWallet = EthHdWallet.fromMnemonic(mnemonicPhrase)
		hdWallet.generateAddresses(1)
		const { wallet } = hdWallet._children[0]
		let response = {}
		response.address = generateData.address("0x" + wallet.getAddress().toString("hex"))
		response.publicKey = wallet._pubKey.toString('hex')
		response.privateKey = wallet._privKey.toString('hex')


		let _password = req.body.password || '123456789';
		let opts = {}
		response.keyStore = myetherwallet.toV3(response.address, _password, response.privateKey);

		return res.status(200).json({ statusCode: 200, message: 'Success.', data: response });
    });

router.post('/wallet/import', [middleware.walletImport], function(req, res, next) {
    	var jsonKeystore = null;
    	if (typeof req.files == 'undefined') {
    		jsonKeystore = req.body.keystore;
    	} else {
    		jsonKeystore = req.files.keystore.data;
    	}

		let keystore = JSON.parse(jsonKeystore.toString('ascii').toLowerCase());
    	let password = req.body.password;

    	let kdfparams;
    	if (keystore.crypto.kdf == 'pbkdf2') {
	    	kdfparams = keystore.crypto.kdfparams
	    } else if (keystore.crypto.kdf == 'scrypt') {
	    	kdfparams = keystore.crypto.kdfparams;
	    }

    	keythereum.recover(password, keystore, function (privateKey) {
		  	// let publicKey = ethUtil.privateToPublic(new Buffer(privateKey.toString('hex'), 'hex'));

		  	let response = {
		  		address: generateData.address(keystore.address),
		  		// publicKey: publicKey.toString('hex'),
		  		privateKey: privateKey.toString('hex')
		  	}

		  	let opts = {
		  		salt: kdfparams.salt,
		  		iv: keystore.crypto.cipherparams.iv
		  	}
		  	
		  	response.keyStore = keythereum.dump(password, response.privateKey, opts.salt, opts.iv)

			return res.status(200).json({ statusCode: 200, message: 'Success.', data: response });
		});
    });

module.exports = router;