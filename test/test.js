const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserDB save and read tests", function () {
  it("Should get first users name info correctly", async function () {
    const UserDB = await ethers.getContractFactory("UserDB");
    const userDB = await UserDB.deploy();
    await userDB.deployed();

    const users = await userDB.getAllUsers();
    expect(users[0][1]).to.equal("Ozdemir");
  });

  it("Should save new user", async function () {
    const UserDB = await ethers.getContractFactory("UserDB");
    const userDB = await UserDB.deploy();
    await userDB.deployed();

    await userDB.saveUser(
      "John",
      "Doe",
      000,
      "yellow",
      "hii!",
      "reading",
      "books",
      "travel"
    );
    const users = await userDB.getAllUsers();
    expect(users[1][1]).to.equal("John");
  });
  it("Should revert Max7UsersCanBeSaved() error", async function () {
    const UserDB = await ethers.getContractFactory("UserDB");
    const userDB = await UserDB.deploy();
    await userDB.deployed();

    await userDB.saveUser("x", "x", 0, "x", "x", "x", "x", "x");
    await userDB.saveUser("x", "x", 0, "x", "x", "x", "x", "x");
    await userDB.saveUser("x", "x", 0, "x", "x", "x", "x", "x");
    await userDB.saveUser("x", "x", 0, "x", "x", "x", "x", "x");
    await userDB.saveUser("x", "x", 0, "x", "x", "x", "x", "x");
    await userDB.saveUser("x", "x", 0, "x", "x", "x", "x", "x");
    await userDB.saveUser("x", "x", 0, "x", "x", "x", "x", "x");

    try {
      await userDB.saveUser("x", "x", 0, "x", "x", "x", "x", "x");
    } catch (error) {
      expect(error.message).to.equal(
        "VM Exception while processing transaction: reverted with custom error 'Max7UsersCanBeSaved()'"
      );
    }
  });
  //
  it("Should emit NewUserSaved(user_id)", async function () {
    const UserDB = await ethers.getContractFactory("UserDB");
    const userDB = await UserDB.deploy();
    await userDB.deployed();

    await expect(userDB.saveUser("x", "x", 0, "x", "x", "x", "x", "x"))
      .to.emit(userDB, "NewUserSaved")
      .withArgs(1);
  });
});
