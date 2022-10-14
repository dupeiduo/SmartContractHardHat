// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, network, run } = require("hardhat")
// require("dotenv").config()
async function main() {
    const SmartContract = await ethers.getContractFactory("SmartContract")
    const smartContract = await SmartContract.deploy()
    console.log("Deploying...")
    await smartContract.deployed()
    const balance = await smartContract.getMyBalance()

    console.log(
        `deployed success, Address: ${smartContract.address}, balance: ${balance} `
    )
    // console.log(network.config.chainId)
    if (network.config.chainId == 5) {
        console.log("Waiting block confirmations...")
        await smartContract.deployTransaction.wait(6)
        await verify(smartContract.address, [])
    }
}
const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(error)
        }
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
