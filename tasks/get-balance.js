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
