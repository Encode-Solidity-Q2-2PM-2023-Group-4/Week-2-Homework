import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

function setupProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    return provider;
}

async function main() {
    const proposals = process.argv.slice(2);
    console.log("\nDeploying Ballot contract");
    console.log("Proposals: ");
    proposals.forEach((element, index) => {
        console.log(`\tProposal No. ${index + 1}: ${element}`);
    });
    const provider = setupProvider();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    const balanceBN = await provider.getBalance(wallet.address);
    const balance = Number(ethers.formatUnits(balanceBN));
    console.log(`\nWallet balance ${balance}`);
    if (balance < 0.01) {
        throw new Error("Not enough ether");
    }
    const ballotFactory = new Ballot__factory(wallet);
    const ballotContract = await ballotFactory.deploy(
        proposals.map(ethers.encodeBytes32String)
    );
    await ballotContract.waitForDeployment();
    const address = await ballotContract.getAddress();
    console.log(`\nContract deployed to the address ${address}`)
    for (let index = 0; index < proposals.length; index++) {
        const proposal = await ballotContract.proposals(index);
        const name = ethers.decodeBytes32String(proposal.name);
        console.log({ index, name, proposal })
    }
    console.log(`Wallet balance ${balance}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});