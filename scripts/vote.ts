import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as BallotJSON from "../artifacts/contracts/Ballot.sol/Ballot.json"
import * as dotenv from 'dotenv';
dotenv.config();

function setupProvider() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
  return provider;
}

async function main() {
  //the first argument is the contract address
  const contract_address = "0x8820AE49d66eB1DeB4b3940Ee1A6eF38644a9A21";
  // the second argument is the proposal index
  const proposal_id = process.argv[2];
  
  
  console.log("Deploying Ballot contract");
  
  const provider = setupProvider();
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  const Signer = wallet.connect(provider);
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether")
  }

  // LINUS - We could use Nanda's method to generate a contract instance here instead for the sake of continuity. I think the rest of the issues will be resolved during this step and some restructuring/labelling of variables
  const ballotContract = new ethers.Contract(contract_address, BallotJSON.abi, signer);
  
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
  console.log(`Updated total vote for ${proposal_voted.name} = ${proposal_voted.voteCount}.`);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
