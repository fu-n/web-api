'use strict';

var bip39 = require('bip39')

var getWordCount = function(str) {
  return str.trim().split(/\s+/).length;
}

module.exports = function (req, res, next) {
	var mnemonicPhrase = req.body.mnemonic_phrase;

	if ((typeof mnemonicPhrase == "undefined") || (mnemonicPhrase.length == 0)) {
    	return res.status(422).json({message: "Mnemonic Phrase is required."});
	} else {
		mnemonicPhrase = mnemonicPhrase.trim();
		if (getWordCount(mnemonicPhrase) < 12) {
			return res.status(422).json({message: "Mnemonic Phrase are 12 words long."});
		}

		if (! bip39.validateMnemonic(mnemonicPhrase)) {
			return res.status(422).json({message: "Mnemonic Phrase is invalid."});
		}

		return next();
	}
};