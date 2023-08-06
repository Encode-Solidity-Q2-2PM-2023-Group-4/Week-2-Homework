import { ethers } from "ethers";
import * as BallotJSON from "../artifacts/contracts/Ballot.sol/Ballot.json";
import * as dotenv from "dotenv";
dotenv.config();

function setupProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    return provider;
}

async function main() {
    // setup provider and wallet/signer
    const provider = setupProvider();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    const signer = wallet.connect(provider);
    const balanceBN = await provider.getBalance(wallet.address);
    const balance = Number(ethers.formatUnits(balanceBN));
    console.log(`\nWallet balance: ${balance}`);
    if (balance < 0.01) {
        throw new Error("Not enough ether");
    }

    // Create contract instance from the contract address, abi and signer
    const contract_address = "0x8820AE49d66eB1DeB4b3940Ee1A6eF38644a9A21";
    const ballotContract = new ethers.Contract(contract_address, BallotJSON.abi, signer);

    // initialising parameters and call delegation
    const to = process.argv[2];
    console.log(`\nDelegating vote to ${to}...`)
    await ballotContract.delegate(to);

    // print summary statement
    console.log(`Vote transferred to ${to}.`);
    console.log(`Wallet balance: ${balance}\n`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
