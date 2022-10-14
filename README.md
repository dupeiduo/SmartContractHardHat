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

the output here, and we can check it in the [georli](https://goerli.etherscan.io/address/0x8eFf7571A93477dd3FB6C73e93EA987Fd90AC349)

```
Deploying...
deployed success, Address: 0x8eFf7571A93477dd3FB6C73e93EA987Fd90AC349, balance: 0
✨  Done in 27.66s.
```

## Switch back to localhost Network
It'll fast for local development.
Add to `hardhat.config.js` networks
```javascript
localhost: {
    url: "http://127.0.0.1/8545",
    // accounts: default hardhat accounts
    chainId: 31337,
},
```

`yarn hardhat node`

add new terminal

`yarn hardhat run scripts/deploy.js --network localhost`

We will swith to locahost network

## Test
Update test/test-deploy.js
```javascript
const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
describe("SmartContract", function () {
    let smartContractFactory, smartContract
    beforeEach(async function () {
        smartContractFactory = await ethers.getContractFactory("SmartContract")
        smartContract = await smartContractFactory.deploy()
    })

    it("Init value", async function () {
        const currentValue = await smartContract.getMyBalance()
        const expectValue = "0"
        assert.equal(currentValue, expectValue)
    })

    it("Update value", async function () {
        await smartContract.setMyBalance(88)
        const currentValue = await smartContract.getMyBalance()
        const expectValue = "88"
        assert.equal(currentValue, expectValue)
    })
})
```
Go to command line paste in 

`yarn hardhat test`

## Task
Add folder and file `tasks/get-balance.js`

```javascript
const { task } = require("hardhat/config")

task("get-balance", "Print the balance here").setAction(
    async (taskArgs, hre) => {
        const smartContractFactory = await hre.ethers.getContractFactory(
            "SmartContract"
        )
        const smartContract = await smartContractFactory.deploy()
        await smartContract.deployed()
        const balance = await smartContract.getMyBalance()
        console.log(`My balance is ${balance}`)
    }
)

```
Add reference to file  `hardhat.config.js`
```
require("./tasks/get-balance")

```
yarn hardhat get-balance
``

## console

```yarn hardhat console --network localhost```

```javascript
const contractFactory = await ethers.getContractFactory("SmartContract")
const smartContract = await contractFactory.deploy()
const balance = await smartContract.getMyBalance()
balance
```
output is `BigNumber { value: "0" }`

double `control + c` to exit


## gas reporter

`yarn add hardhat-gas-reporter --dev`

```
require("hardhat-gas-reporter")
```

Beauty output of the gas in file `gas-reporter.txt`.

## solidity-coverage

`yarn add solidity-coverage`

```
require("solidity-coverage")
```

```shell
yarn hardhat coverage
```
--------------------|----------|----------|----------|----------|----------------|
File                |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------------|----------|----------|----------|----------|----------------|
 contracts/         |      100 |      100 |      100 |      100 |                |
  SmartContract.sol |      100 |      100 |      100 |      100 |                |
--------------------|----------|----------|----------|----------|----------------|
All files           |      100 |      100 |      100 |      100 |                |
--------------------|----------|----------|----------|----------|----------------|


## Verify Contract

```shell
yarn add @nomiclabs/hardhat-etherscan --dev
```
add `require("@nomiclabs/hardhat-etherscan")` to file `hardhat.config.js`

add config

```javascript
etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
},
```
add `ETHERSCAN_API_KEY` to .env file.
How to get the `ETHERSCAN_API_KEY`?
1. https://etherscan.io/
2. login
3. Find `API Keys` menu
4. click `Add` button and input a Project name
5. add the api key to your env file