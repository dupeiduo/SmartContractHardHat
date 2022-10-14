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
        // same to
        // expect(currentValue.toString()).to.equal(expectValue)
    })
    // it.only() will just run this test
    it("Update value", async function () {
        const setRes = await smartContract.setMyBalance(88)
        await setRes.wait(1)
        const currentValue = await smartContract.getMyBalance()
        const expectValue = "88"
        assert.equal(currentValue, expectValue)
    })
})
