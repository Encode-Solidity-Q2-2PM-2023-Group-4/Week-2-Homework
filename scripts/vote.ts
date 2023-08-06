import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config();

function setupProvider() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
  return provider;
}

async function main() {
  //the first argument is the contract address
  const string_address = process.argv[2];  
  // what is the ethers function to convert this string to solidity address type? LINUS - I don't think we need this line as solidity will convert an address-like string to address
  const contract_address = ethers...xxxx(string_address)
  // the second argument is the proposal name
  const proposal_name = process.argv[3];
  
  
  console.log("Deploying Ballot contract");
  
  const provider = setupProvider();
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether")
  }

  // LINUS - We could use Nanda's method to generate a contract instance here instead for the sake of continuity. I think the rest of the issues will be resolved during this step and some restructuring/labelling of variables
  const ballotFactory = new Ballot__factory(wallet);
  const ballotContract = await ballotFactory.attach(contractaddress)
  await ballotContract.waitForDeployment();
  const address_returned = await ballotContract.getAddress();
  console.log(`Confirm contract address : ${address_returned}`)
  
  //find the proposal id in the contract
  // what's the most efficient and least gas fee to do this ?
  await all_proposals = ballotContract.proposals; // can we get the whole array from blockchain ?
  for (let index = 0; index < all_proposals.length; index++) {
    const name = ethers.decodeBytes32String(all_proposals(index).name)
    if (name == proposal_name) {
        proposal_id = index;
        break;
    }
  }

// call the Solidity's vote function
  await ballotContract.vote(proposal_id);

  const proposal_voted = await ballotContract.proposals(proposal_id)
  console.log(`Updated total vote for ${proposal_voted.name} = ${proposal_voted.voteCount}`)

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });