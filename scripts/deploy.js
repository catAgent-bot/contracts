// npx hardhat run scripts/deploy.js --network ink
// npx hardhat verify --constructor-args arguments.js --network baseGoerli 0x38D0eE682AD007426A929A7ef71f7527eFf61dF8
// npx hardhat verify --network base 0x59639E20A17EaD110aaBAF249001Ab140917C18e

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");

function tokens(n) {
  return hre.ethers.parseEther(n);
}

async function main() {
  const max = "115792089237316195423570985008687907853269984665640564039457584007913129639935"

  /* ******** Mainnet(Base) ******** */
  const weth = "0x4200000000000000000000000000000000000006"
  const governor = ""


  const [xx] = await ethers.getSigners();
  console.log(xx.address)


  /*********************************************************************
   ***************** Deploy MoonwellStrategyVault **********************
   *********************************************************************/

  const CAT = await ethers.getContractFactory("CAT2");
  // const cat = await upgrades.upgradeProxy("0x57F4983f4A0e68674ad553Ab228aBc43C9846be1", CAT, {kind: "uups", timeout: '0', pollingInterval: '1000'});
  const cat = await upgrades.deployProxy(CAT, [governor, governor, governor, governor], {kind: "uups", timeout: '0', pollingInterval: '1000'});
  await cat.waitForDeployment();
  console.log("Contract address:", await cat.getAddress(), cat.target);
  
  console.log("done")


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});