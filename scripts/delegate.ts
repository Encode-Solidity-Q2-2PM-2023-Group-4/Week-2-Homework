import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const to = process.argv.slice(2);
    console.log(`\nDelegating vote to ${to}...`)
    // TO-DO
    // - ACCESS THE BALLOT CONTRACT ADDRESS
    // - CALL THE DELEGATE FUNCTION
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });