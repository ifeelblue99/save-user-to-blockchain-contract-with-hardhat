const hre = require("hardhat");

async function main() {
  const UserDB = await hre.ethers.getContractFactory("UserDB");
  const userDB = await UserDB.deploy();

  await userDB.deployed();

  console.log("UserDB deployed to:", userDB.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
