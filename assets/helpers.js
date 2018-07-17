'use strict';

const CryptoJS = require('crypto-js');
const coder = require('web3/lib/solidity/coder')
const leftPad = require('left-pad')
const solsha3 = require('solidity-sha3').default
const utils = require("ethereumjs-util");
const assert = require('assert')

const pad = function (n) {
    assert.equal(typeof (n), 'string', "Passed in a non string")
    let data
    if (n.startsWith("0x")) {
        data = '0x' + leftPad(n.slice(2), '64', '0')
        assert.equal(data.length, 66, "packed incorrectly")
        return data;
    } else {
        data = '0x' + leftPad(n, '64', '0')
        assert.equal(data.length, 66, "packed incorrectly")
        return data;
    }
}

const encodeFunctionTxData = function (functionName, types, args) {

    var fullName = functionName + '(' + types.join() + ')';
    var signature = CryptoJS.SHA3(fullName, { outputLength: 256 }).toString(CryptoJS.enc.Hex).slice(0, 8);
    var dataHex = '0x' + signature + coder.encodeParams(types, args);
    return dataHex;
}

const signPayload = async function (signingAddr, txRelay, whitelistOwner, destinationAddress, functionName, functionTypes, functionParams, privKey) {
    if (functionTypes.length !== functionParams.length) {
        return //should throw error
    }
    if (typeof (functionName) !== 'string') {
        return //should throw error
    }
    let nonce
    let blockTimeout
    let data
    let hashInput
    let hash
    let sig
    let retVal = {}
    data = encodeFunctionTxData(functionName, functionTypes, functionParams)

    nonce = await txRelay.getNonce.call(signingAddr)
    //Tight packing, as Solidity sha3 does
    hashInput = '0x1900' + txRelay.address.slice(2) + whitelistOwner.slice(2) + pad(nonce.toString('16')).slice(2)
        + destinationAddress.slice(2) + data.slice(2)
    hash = solsha3(hashInput)
    sig = utils.ecsign(new Buffer(utils.stripHexPrefix(hash), 'hex'), privKey)
    // sig = lightwallet.signing.signMsgHash(lw, keyFromPw, hash, signingAddr)
    retVal.r = '0x' + sig.r.toString('hex')
    retVal.s = '0x' + sig.s.toString('hex')
    retVal.v = sig.v //Q: Why is this not converted to hex?
    retVal.data = data
    retVal.hash = hash
    retVal.nonce = nonce
    retVal.dest = destinationAddress
    return retVal
}

module.exports = {
    pad: pad,
    encodeFunctionTxData: encodeFunctionTxData,
    signPayload: signPayload,
};