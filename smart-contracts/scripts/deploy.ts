import { formatEther, parseEther } from "viem";
import hre from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = BigInt(currentTimestampInSeconds + 60);

  // const lockedAmount = parseEther("0.001");

  const moduleFactory = await hre.viem.deployContract("ModuleFactory", []);

  console.log(
    `ModuleFactory with deployed to ${moduleFactory.address}}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});