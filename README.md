# NANJ SDK

Create or Import your wallet. And make NANJ Transaction.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

A step by step series that tell you how to get a development env running

Clone project from Git repository
```
git clone https://github.com/NANJ-COIN/web-sdk
```

Install all package
```
npm install
```

Set config 
```
cp .env.example .env
```

Run command to build view files
```
npm run build
```
Or
```
npm run build --watch
```
for development

Start server nodejs
```
node .
```

## Running the tests
```
npm run test
```

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

### 1. {{API_ENDPOINT}}/authorise

| API authorise example                           |
| :---:                                           |
| GET: https://staging.nanjcoin.com/api/authorise |

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
            "metaNanjManager": "0x000000000000000000000000000000000000000"
        },
        "supportedERC20": [
            {
                "id": 1,
                "name": "NANJCOIN",
                "address": "0x000000000000000000000000000000000000000"
            },
            {
                "id": 2,
                "name": "YUKICOIN",
                "address": "0x000000000000000000000000000000000000000"
            }
        ],
        "appHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "env": "ropsten",
        "chainId": "3"
    }
} 
```

### Account & Wallet

### Transaction

## Versioning

For the versions available, see the [tags on this repository](https://github.com/NANJ-COIN/web-sdk/tags). 

## Authors

* **NANJ TEAM** [NANJ](https://nanjcoin.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
