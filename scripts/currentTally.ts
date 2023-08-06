import { ethers } from "ethers";
import * as dotenv from "dotenv";
import * as BallotJSON from "../artifacts/contracts/Ballot.sol/Ballot.json";
dotenv.config();

function setupProvider(){
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    return provider;
}

async function main() {
    // sets up provider and wallet/signer from local env file and outputs wallet balance
    const provider = setupProvider();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    const signer = wallet.connect(provider);
    const balanceBN = await provider.getBalance(wallet.address);
    const balance = Number(ethers.formatUnits(balanceBN));
    console.log(`Wallet balance: ${balance}`);
    if (balance < 0.01) {
        throw new Error("Not enough ether");
    }

    const contract = new ethers.Contract("0x8820AE49d66eB1DeB4b3940Ee1A6eF38644a9A21", BallotJSON.abi, signer);
    const proposals = contract.proposals;
    console.log("PROPOSAL: VOTE_COUNT")
    for (let i = 0; i < proposals.length; i++) {
        const prop = await proposals(i);
        console.log(`${ethers.decodeBytes32String(prop.name)}: ${prop.voteCount}`)
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});