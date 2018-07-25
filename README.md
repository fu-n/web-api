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

## Deployment

## Built With

* [ETH Lightwallet](https://github.com/ConsenSys/eth-lightwallet) - Lightweight JS Wallet for Node and the browser
* [Keythereum](https://www.npmjs.com/package/keythereum)
* [Bip39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) - Generating the mnemonic
## API

### Account & Wallet

### Transaction

## Versioning

For the versions available, see the [tags on this repository](https://github.com/NANJ-COIN/web-sdk/tags). 

## Authors

* **NANJ TEAM** [NANJ](https://nanjcoin.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
