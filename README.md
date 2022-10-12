# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

```shell
yarn hardhat compile
yarn hardhat run scripts/deploy.js
yarn add --dev dotenv
```

add your `.env` file then change your hardhat.config.js

```js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    georli: {
      url: process.env.GEORLI_RPC_URL,
      accounts: [process.env.GEORLI_PRIVATE_KEY],
      chainId: 5, // get in metamask configration: network
    },
  },
  solidity: "0.8.7",
};
```

`yarn hardhat run scripts/deploy.js --network georli`

the output here, and we can check it in the [georli](https://goerli.etherscan.io/address/0x77CF15056FE1D08c3B2e4397d39c21e9c16fdf53)

```
Deploying...
deployed success, Address: 0x8eFf7571A93477dd3FB6C73e93EA987Fd90AC349, balance: 0
✨  Done in 27.66s.
```
