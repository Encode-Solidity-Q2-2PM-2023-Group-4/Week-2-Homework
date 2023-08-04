import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

function setupProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    return provider;
}

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