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

let TXRELAY = web3.eth.contract(TXRELAYABI)
let TXRELAYAddress = process.env.TXRELAY_ADDRESS

var helper = require('../assets/helpers.js')

let NANJCOINAddress = process.env.ADDRESS_NANJCOIN_TEST
let nanjCoinFounder = process.env.ADDRESS_NANJ_FOUNDER
let metaNanjCoinManagerContractAddress = process.env.ADDRESS_META_NANJ_MANAGER
let zeroAddress = "0x0000000000000000000000000000000000000000"

const sdkDeveloper = {
  appId : process.env.CLIENT_ID,
  secretKey : process.env.SECRET_KEY,
  developerAddress : process.env.DEV_ADDRESS,
  getAppHash: () => { 
    // console.log(web3.sha3(this.appId + this.secretKey))
    return web3.sha3(this.appId + this.secretKey) 
  }
}

const generateDataRelayerTx = function(from, privKey, to, transferAmount) {
	let types = ['address', 'address', 'address', 'uint256', 'bytes', 'bytes32']
    let nanjTransferdata = helper.encodeFunctionTxData('transfer', ['address', 'uint256'], [to, transferAmount])

    let founderWallet = nanjCoinFounder
    let destination = NANJCOINAddress
    let value = 0
    let data = nanjTransferdata    

    let txRELAY = TXRELAY.at(TXRELAYAddress)
    let params = [from, founderWallet, destination, value, data, sdkDeveloper.getAppHash()]

    return new Promise(function(resolve, reject) {
    	let p = helper.signPayload(from, txRELAY, zeroAddress, metaNanjCoinManagerContractAddress,
	      'forwardTo', types, params, new Buffer(privKey, 'hex')).then(function(result) {
	        // console.log(result)

	        var json = {
	            "dest": result.dest,
	            "data": result.data,
	            "v": result.v,
	            "r": result.r,
	            "s": result.s,
	            "hash": result.hash
	        }

	        resolve(json)
	    })
	    .catch(function(error) {
	        // console.log(error)
	        
	        reject(err)
	    })
    })
}

router.post('/tx/relayTx', function (req, res, next) {
	  	let appId = process.env.CLIENT_ID
		let secretKey = process.env.SECRET_KEY

		let data = generateDataRelayerTx(req.body.from, req.body.privKey, req.body.to, req.body.value)
		data.then(function(result) {
			console.log('generateDataRelayerTx')
			console.log(result)
			console.log('--------------')

	        let NanjServer = new server(appId, secretKey)
			var sentRawTx = NanjServer.sentRawTx(req.body.from,req.body.privKey,req.body.to,req.body.value,'message')
	        sentRawTx.then(function(result) {
				return res.json(result)
		    }, function(err) {
				return res.json(err)
		    })
	    })
    })

module.exports = router;