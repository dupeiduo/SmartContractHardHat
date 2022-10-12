require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
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
}
