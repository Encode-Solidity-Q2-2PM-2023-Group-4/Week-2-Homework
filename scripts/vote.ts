import { ethers } from "ethers";
import * as BallotJSON from "../artifacts/contracts/Ballot.sol/Ballot.json"
import * as dotenv from 'dotenv';
dotenv.config();

function setupProvider() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
  return provider;
}

async function main() {
  const contract_address = "0x8820AE49d66eB1DeB4b3940Ee1A6eF38644a9A21";
  // the process.argv input is the proposal index
  const proposal_id = process.argv[2];
    
  const provider = setupProvider();
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  const signer = wallet.connect(provider);
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  console.log(`\nWallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether")
  }

  const ballotContract = new ethers.Contract(contract_address, BallotJSON.abi, signer);
  
  // LEGACY CODE:
  //find the proposal id in the contract
  // what's the most efficient and least gas fee to do this ?
  // await all_proposals = ballotContract.proposals; // can we get the whole array from blockchain ?
  //for (let index = 0; index < all_proposals.length; index++) {
  //  const name = ethers.decodeBytes32String(all_proposals(index).name)
  //  if (name == proposal_name) {
  //      proposal_id = index;
  //      break;
  //  }
  //}

  // call the Solidity's vote function
  await ballotContract.vote(proposal_id);

  const proposal_voted = await ballotContract.proposals(proposal_id);
  console.log(`\nUpdated total vote for ${proposal_voted.name} = ${await proposal_voted.voteCount}.`);
  console.log(`Wallet balance ${balance}\n`);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });