# NANJ WEB-API
Create or Import your wallet. And make NANJ Transaction.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

A step by step series that tell you how to get a development env running

Clone project from Git repository
```
/directory$ git clone https://github.com/NANJ-COIN/web-api.git web-api
```

Install all package
```
/directory/web-api$ npm install
```

Set config 
```
/directory/web-api$ cp .env.example .env
```

Run command to build view files
```
/directory/web-api$ npm run build
```
Or
```
/directory/web-api$ npm run build --watch
```
for development

Start server nodejs
```
/directory/web-api$ node .
```

## Running the tests
```
/directory/web-api$ npm run test
```

## Developer account
OAuth2 enables application developers to build applications that utilize authorise and data from the NanjRelayTx API. We support the registration and create App_ID & Secret_Key at [Developers portal](http://developers.staging.nanjcoin.com/login).

### 1. {{API_ENDPOINT}}/authorise

| API authorise example                           |
| :---:                                           |
| POST: https://staging.nanjcoin.com/api/authorise |

- Header Parameters. 

    | Key          | Value                                      | Description                   |
    | ------------ | ------------------------------------------ | ----------------------------- |
    | Client-ID    | 61415410861056936449                       | your application's app id     |
    | Secret-Key   | i7XJTOjAcEFu2YowtF49U07bMdRAK9gIQRrBfCAL   | your application's secret key |


- Response data.
    - HTTP status: 200
    - Response body
```
{                                                                 
    "status_code": 200,
    "messages": "success",
    "data": {
        "client_id": "61415410861056936449",
        "name": "app_name",
        "eth_address": "0x000000000000000000000000000000000000000",
        "status": 0,
        "version": "1",
        "smartContracts": {
            "metaNanjManager": "0x000000000000000000000000000000000000000",
            "txRelay": "0x000000000000000000000000000000000000000"
        },
        "supportedERC20": [
            {
                "id": 1,
                "name": "NANJCOIN",
                "address": "0x000000000000000000000000000000000000000"
            }
        ],
        "appHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "env": "ropsten",
        "chainId": "3"
    }
} 
```

## update environment
```
/directory/web-api$ vim .env
```
You need to update environment with the information your got from [Developers portal](http://developers.staging.nanjcoin.com/login). and {{API_ENDPOINT}}/authorise
### Break down into end to end tests

Run project with link. Ex: http://localhost:your_port
From main menu on Guide.

Create wallet
* Input your 12 words mnemonic (with your passphrase or not. Default passphrase is: 123456789)
* Passphrase must >= 9 characters
Submit and save to your keystore.

Import wallet
* Input your keystore file.
* Input your passphrase.

Transaction
* Input NANJ address receive.
* Input amount. (with 8 decimal)
* Next step enter your passphrase to confirm.

Account
* You can Download Key Store file
* View your wallet info

## Deployment

## Built With

* [ETH Lightwallet](https://github.com/ConsenSys/eth-lightwallet) - Lightweight JS Wallet for Node and the browser
* [Keythereum](https://www.npmjs.com/package/keythereum) - Keythereum is a JavaScript tool to generate, import and export Ethereum keys.
* [Bip39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) - Generating the mnemonic

## API

### Account & Wallet
API_ENDPOINT is http://localhost:your_port
#### 1. {{API_ENDPOINT}}/api/wallet/create

| API Create Wallet.                              |
| :---:                                           |
| POST: {{API_ENDPOINT}}/api/wallet/create        |

- Header Parameters. 

    | Key          | Value                                      | Description                   |
    | ------------ | ------------------------------------------ | ----------------------------- |
    | Content-Type | application/json                           | Setting input data type       |

- Body Parameters. 

    | Key          | Value                                      |
    | ------------ | ------------------------------------------ |
    | mnemonic_phrase | "brain surround have swap horror body response double fire dumb bring hazard" |


- Response data.
    - HTTP status: 200
    - Response body
```
{
    "statusCode": 200,
    "message": "Success.",
    "data": {
        "address": "7b4322b9abe447ce86faa6121b35c84ec36945ad",
        "privateKey": "db426dbabd0b21f8373e9768c3560132687e348e4c08606b81cf2488fbbb6cb8",
        "keyStore": {
            "address": "7b4322b9abe447ce86faa6121b35c84ec36945ad",
            "crypto": {
                "cipher": "aes-128-ctr",
                "ciphertext": "9b016f18188b75ac6dc02e90ab0e659b0bc280062cc8fc379136f7bb26a0dd49",
                "cipherparams": {
                    "iv": "3b842457fb203bead21def7186c156de"
                },
                "mac": "458c3c5483c02add1a37f83e9972499be2f2887624ce904947c34a66951a8a1b",
                "kdf": "scrypt",
                "kdfparams": {
                    "dklen": 32,
                    "n": 8192,
                    "r": 8,
                    "p": 1,
                    "salt": "144cdd75700e6f13a5c9c20dc910005523e07038b1af59f8e510478b130da77a"
                }
            },
            "id": "044207fa-d766-458c-a81e-513775daaf65",
            "version": 3
        }
    }
}
```

#### 2. {{API_ENDPOINT}}/api/wallet/import

| API Import Wallet.                              |
| :---:                                           |
| POST: {{API_ENDPOINT}}/api/wallet/import        |

- Header Parameters. 

    | Key          | Value                                      | Description                   |
    | ------------ | ------------------------------------------ | ----------------------------- |
    | Content-Type | application/json                           | Setting input data type       |

- Body Parameters. 

    | Key          | Value                                      |
    | ------------ | ------------------------------------------ |
    | keystore     | File upload OR json string                 |
    | password     | Your password must lengh 9 characters. OR default is '123456789' in API create wallet         |


- Response data.
    - HTTP status: 200
    - Response body
```
{
    "statusCode": 200,
    "message": "Success.",
    "data": {
        "address": "7b4322b9abe447ce86faa6121b35c84ec36945ad",
        "privateKey": "db426dbabd0b21f8373e9768c3560132687e348e4c08606b81cf2488fbbb6cb8",
        "keyStore": {
            "address": "7b4322b9abe447ce86faa6121b35c84ec36945ad",
            "crypto": {
                "cipher": "aes-128-ctr",
                "ciphertext": "9b016f18188b75ac6dc02e90ab0e659b0bc280062cc8fc379136f7bb26a0dd49",
                "cipherparams": {
                    "iv": "3b842457fb203bead21def7186c156de"
                },
                "mac": "458c3c5483c02add1a37f83e9972499be2f2887624ce904947c34a66951a8a1b",
                "kdf": "scrypt",
                "kdfparams": {
                    "dklen": 32,
                    "n": 8192,
                    "r": 8,
                    "p": 1,
                    "salt": "144cdd75700e6f13a5c9c20dc910005523e07038b1af59f8e510478b130da77a"
                }
            },
            "id": "044207fa-d766-458c-a81e-513775daaf65",
            "version": 3
        }
    }
}
```

### Transaction
API_ENDPOINT is https://staging.nanjcoin.com 
####  Create transaction
#### 1. {{API_ENDPOINT}}/api/tx/relayTx

| API NANJ Transaction.                           |
| :---:                                           |
| POST: {{API_ENDPOINT}}/api/relayTx           |

- Header Parameters. 

    | Key          | Value                                      | Description                   |
    | ------------ | ------------------------------------------ | ----------------------------- |
    | Content-Type | application/json                           | Setting input data type       |
    | Client-ID    | 61415410861056936449                       | your application's app id     |
    | Secret-Key   | i7XJTOjAcEFu2YowtF49U07bMdRAK9gIQRrBfCAL   | your application's secret key |
    
- Body Parameters.
  </br>data of create transaction api you need use  npm nanjs package to generate body parameters data
    ```
    // It's a async function
    // make transaction
    var from = '0xe79c03e29ee86c1d0af6053737dccb029402d0f3'
    var privateKey = '******************************************************'
    var to = '0xfce1759a46647adfe4f9564320631c4f0a90deba'
    var amount = 5
    var message = 'nanj transaction'
    let nanjAddress = nanjs.wallet.walletCheck(address)
    nanjs.transaction.getRelayerTxHash(from, nanjAddress, amount, message).then(function(txHash) {
        let data = txHash.data
        let hash = txHash.hash
        let destinationAddress = txHash.destinationAddress

        let body_parameters = nanjs.transaction.getHashSign(data, hash, privateKey, destinationAddress)
        
      }, function(err) {
        console.log(err)
      })
    ```

    | Key      | Value                                                              | Description                   |
    | -------- | ------------------------------------------------------------------ | ----------------------------- |
    | dest     | 0x00000000000000000000000000000000000000000000000000000000000000   |                               |
    | hash     | 0x00000000000000000000000000000000000000000000000000000...000000   |                               |
    | data     | 0x00000000000000000000000000000000000000000000000000000...000000   |                               |
    | v        | 0000000                                                            |                               |
    | r        | 0x00000000000000000000000000000000000000000000000000000000000000   |                               |
    | s        | 0x00000000000000000000000000000000000000000000000000000000000000   |                               |
    | nonce    | 0000000000000000000000000000000000000000000000000000000000000000   |                               |


- Response data.
    - HTTP status: 200
    - Response body

```
{
    "txHash": "0x2237bef268e080835f62bae4c0aee858a8212c05e29945d1e02a354427f252e0"
}
```
#### Get list history transactions
#### 2. {{API_ENDPOINT}}/api/tx/list/{address}?limit=10&page=1&order_by=desc

| API NANJ Transaction.                                                                                       |
| :---:                                                                                                       |
| GET: {{API_ENDPOINT}}/api/tx/list/0xb8d5c2b945721f1e37a03c946ca2497f9e2f9775?limit=10&page=1&order_by=desc |

- Header Parameters. 

    | Key          | Value                                      | Description                   |
    | ------------ | ------------------------------------------ | ----------------------------- |
    | Content-Type | application/json                           | Setting input data type       |
    | Client-ID    | 61415410861056936449                       | your application's app id     |
    | Secret-Key   | i7XJTOjAcEFu2YowtF49U07bMdRAK9gIQRrBfCAL   | your application's secret key |
    
- URL Parameters.
    
    | Key          | Value                                      | Description                   |
    | ------------ | ------------------------------------------ | ----------------------------- |
    | address      | 0xb8d5c2b945721f1e37a03c946ca2497f9e2f9775 | nanjcoin address              |
    
- Query Parameters. 

    | Key          | Value                                      | Description                               |
    | ------------ | ------------------------------------------ | -----------------------------             |
    | limit        | 10                                         | number of limit transactions in page      |
    | page         | 1                                          | Number of page                            |
    | order_by     | ASC or DESC                                | Order_by is used to sort the result-set in ascending or descending order. |

- Response data.
    - HTTP status: 200
    - Response body

```
{
    "statusCode": 200,
    "messages": "request success",
    "data": {
        "total": 85,
        "limit": "10",
        "page": "1",
        "max_page": 9,
        "items": [
            {
                "id": 262,
                "TxHash": "0x903e93a85dd4b5cf4a9d2f194cb464c228025b3797f033bb20ce174db3da6728",
                "status": 0,
                "created_at": "2018-07-31 13:08:23",
                "symbol": "NANJT",
                "from": "0xb8d5c2b945721f1e37a03c946ca2497f9e2f9775",
                "to": "0xd91ca323233e1571c188d37d8c93f8ddbeb3b2ee",
                "value": "12500000000",
                "message": "",
                "tx_fee": "125000000",
                "time_stamp": 1533010103
            },
            {
                "id": 237,
                "TxHash": "0x56df4b41a64502e8a5fdf46c0c2ad01fe24715a4ad5982ae7870cc65a426a10d",
                "status": 0,
                "created_at": "2018-07-30 19:42:03",
                "symbol": "NANJT",
                "from": "0xb8d5c2b945721f1e37a03c946ca2497f9e2f9775",
                "to": "0x4d651145931aa3d421d25d186d9eead146d8d334",
                "value": "15000000000",
                "message": "",
                "tx_fee": "150000000",
                "time_stamp": 1532947323
            },
            ...
        ]
    }
}
```
####  Get nanj rate
#### 3. {{API_ENDPOINT}}/api/coin/nanjcoin/currency/{currency}

| API NANJ Transaction.                           |
| :---:                                           |
| GET: {{API_ENDPOINT}}/api/coin/nanjcoin/currency/jpy       |

- Header Parameters. 

    | Key          | Value                                      | Description                   |
    | ------------ | ------------------------------------------ | ----------------------------- |
    | Content-Type | application/json                           | Setting input data type       |
    | Client-ID    | 61415410861056936449                       | your application's app id     |
    | Secret-Key   | i7XJTOjAcEFu2YowtF49U07bMdRAK9gIQRrBfCAL   | your application's secret key |
    
- URL Parameters.
    
    | Key          | Value                                      | Description                   |
    | ------------ | ------------------------------------------ | ----------------------------- |
    | currency     | jpy or usd                                 | currency symble               |
    


- Response data.
    - HTTP status: 200
    - Response body

```
{
    "statusCode": 200,
    "message": "success",
    "data": {
        "id": "nanjcoin",
        "symbol": "nanj",
        "name": "NANJCOIN",
        "image": "https://assets.coingecko.com/coins/images/3424/small/FDGC.png?1521621671",
        "current_price": 0.100654390871852,
        "market_cap": 1948859199.48791,
        "total_volume": 7387551.87433715,
        "high_24h": 0.120922987721231,
        "low_24h": 0.0993159837261435,
        "price_change_24h": "-0.000105617924003182",
        "price_change_percentage_24h": "-10.4875135111615",
        "market_cap_change_24h": "-2044962.5797893",
        "market_cap_change_percentage_24h": "-10.4875135111618",
        "circulating_supply": "19361889557.0",
        "ath": 0.519721665124315,
        "ath_change_percentage": -79.2897141816895,
        "ath_date": "2018-04-04T07:20:57.493Z",
        "roi": null
    }
}
```
## Versioning

For the versions available, see the [tags on this repository](https://github.com/NANJ-COIN/web-sdk/tags). 

## Authors

* **NANJ TEAM** [NANJ](https://nanjcoin.com/), support@nanjcoin.com

## License
please read our license at this link. [LICENSE](https://nanjcoin.com/sdk)
you can change Language JP/EN
