require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/get-balance")
require("hardhat-gas-reporter")
require("solidity-coverage")
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        georli: {
            url: process.env.GEORLI_RPC_URL,
            accounts: [process.env.GEORLI_PRIVATE_KEY],
            chainId: 5, // get in metamask configration: network
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts: default hardhat accounts
            chainId: 31337,
        },
    },
    solidity: "0.8.7",
    gasReporter: {
        enabled: true,
        outputFile: "gas-reporter.txt",
        noColors: true,
        currency: "USD",
        // coinmarketcap:
    },
    etherscan: {
        apiKey: "ETHERSCAN_API_KEY",
    },
}
