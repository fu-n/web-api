# NANJ SDK

Create or Import your wallet. And make NANJ Transaction.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

A step by step series that tell you how to get a development env running

Clone project from Git repository
```
/directory$ git clone https://github.com/NANJ-COIN/web-api web-api
```

Set config 
```
/directory/web-api$ cp .env.example .env
```

Install all package
```
npm run install nanj-api --save
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

### Account & Wallet

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

#### 1. {{API_ENDPOINT}}/api/tx/relayTx

| API NANJ Transaction.                           |
| :---:                                           |
| POST: {{API_ENDPOINT}}/api/tx/relayTx        |

- Header Parameters. 

    | Key          | Value                                      | Description                   |
    | ------------ | ------------------------------------------ | ----------------------------- |
    | Content-Type | application/json                           | Setting input data type       |

- Body Parameters. 

    | Key          | Value                                      |
    | ------------ | ------------------------------------------ |
    | from         | 0x7b4322b9abe447ce86faa6121b35c84ec36945ad |
    | privKey      | ****************************************** |
    | to           | 0x4c96b7a6304400ac656296c58388f3a79e7f5d98 |
    | value        | 300000000                                  |


- Response data.
    - HTTP status: 200
    - Response body

```
{
    "txHash": "0x2237bef268e080835f62bae4c0aee858a8212c05e29945d1e02a354427f252e0"
}
```

## Versioning

For the versions available, see the [tags on this repository](https://github.com/NANJ-COIN/web-sdk/tags). 

## Authors

* **NANJ TEAM** [NANJ](https://nanjcoin.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
