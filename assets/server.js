'use strict';

var querystring = require('querystring');
var http = require('http')

module.exports = class {
	constructor(appId, secretKey) {
        this.appId = appId;
        this.secretKey = secretKey;
    }

	sentRawTx(from,key,to,value,message) {
		let postData = querystring.stringify({
        	'from':from,
			'key':key,
			'to':to,
			'value':value
        });
		var options = {
			host: process.env.NANJ_HOST,
			port: 80,
			path: process.env.PATH_RAWTX,
			method: 'POST',
			auth: process.env.BASIC_AUTH,
			headers: {
				'Client-ID':this.appId,
				'Secret-Key':this.secretKey,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
			}
		};
		return new Promise((resolve, reject) => {
		    var postHTTP = http.request(options, function(response) {
				console.log(options.method + ':'+options.host+options.path)
				console.log('STATUS: ' + response.statusCode);
				response.setEncoding('utf8');
				response.on('data', function (chunk) {
					var objectData = JSON.parse(chunk);

					if (response.statusCode == 200) {
						resolve(objectData)
					}

					return reject(objectData)
				});
			})
			// post the data
			postHTTP.write(postData);
            postHTTP.end();
	    })
	}

	sentRelayTx(from,to,value,message) {
		let postData = querystring.stringify({
          'TxHash': hash
        });
		var options = {
			host: process.env.NANJ_HOST,
			port: 80,
			path: process.env.PATH_RELAYTX,
			method: 'POST',
			auth: process.env.BASIC_AUTH,
			headers: {
				'Client-ID':this.appId,
				'Secret-Key':this.secretKey,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
			}
		};
		return new Promise((resolve, reject) => {
		    http.request(options, function(response) {
				console.log(options.method + ':'+options.host+options.path)
				console.log('STATUS: ' + response.statusCode);
				response.setEncoding('utf8');
				response.on('data', function (chunk) {
					var objectData = JSON.parse(chunk);

					if (response.statusCode == 200) {
						resolve(objectData)
					}

					return reject(objectData)
				});
			}).end();
	    })
	}
};