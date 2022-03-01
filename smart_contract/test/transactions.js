const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Transactions", function () {
  it("Should retrieve transactions count when method called", async function () {
    const Transactions = await ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();
    await transactions.deployed();

    expect(await transactions.getTransactionCount()).to.equal(0);
  });

  it("Should add a new transaction to the blockchain", async function () {
    const Transactions = await ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();
    await transactions.deployed();

    const receiverAddress = "0x146ddC3E5BFdC06976454da479314F66e4C2129B";
    const parsedAmount = ethers.utils.parseEther("0.0001");

    const addTransactionTx = await transactions.addToBlockchain(
      receiverAddress,
      parsedAmount,
      "Hi there!",
      "Greetings"
    );

    await addTransactionTx.wait();

    expect(await transactions.getTransactionCount()).to.equal(1);
  });

  it("Should get stored transactions from blockchain", async function () {
    const Transactions = await ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();
    await transactions.deployed();

    const receiverAddress = "0x146ddC3E5BFdC06976454da479314F66e4C2129B";
    const parsedAmount = ethers.utils.parseEther("0.0001");

    const addTransactionTx = await transactions.addToBlockchain(
      receiverAddress,
      parsedAmount,
      "Hi there!",
      "Greetings"
    );

    await addTransactionTx.wait();

    const allTransactions = await transactions.getAllTransactions();

    expect(allTransactions.length).to.equal(1);
    expect(allTransactions[0].sender).to.exist;
    expect(allTransactions[0].receiver).to.equal(receiverAddress);
    expect(allTransactions[0].amount).to.equal("100000000000000");
    expect(allTransactions[0].message).to.equal("Hi there!");
    expect(allTransactions[0].keyword).to.equal("Greetings");
  });
});
