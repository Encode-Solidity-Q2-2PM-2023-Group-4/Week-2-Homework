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

    const contract = new ethers.Contract("0x8820AE49d66eB1DeB4b3940Ee1A6eF38644a9A21", BallotJSON.abi, signer);
    const proposals = contract.proposals;
    console.log("\nPROPOSAL: VOTE_COUNT")
    for (let i = 0; i < 8; i++){
        const proposalNum = await contract.proposals(i);
        const proposalNumVotes = await proposalNum.voteCount;
        const proposalNumName = await proposalNum.name;
        console.log(ethers.decodeBytes32String(proposalNumName) + ": " + proposalNumVotes);
    }
    console.log(`Wallet balance: ${balance}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});