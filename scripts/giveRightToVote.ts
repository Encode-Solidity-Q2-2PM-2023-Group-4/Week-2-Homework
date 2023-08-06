import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { Ballot__factory } from "../typechain-types";
dotenv.config();


/**
 * @title giveRightToVote
 * @dev this script can only be executed by the deployer of the contract, known as the the chairperson.
 * @dev this script will give voting rights to the address that is given as an input.
 * @dev to run script with yarn: yarn ts-node --files scripts/giveRightToVote.ts @param address
 */

function setupProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    return provider;
}

// Contract ABI
const contractABI = [{"inputs":[{"internalType":"bytes32[]","name":"proposalNames","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"chairperson","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"voter","type":"address"}],"name":"giveRightToVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"proposals","outputs":[{"internalType":"bytes32","name":"name","type":"bytes32"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"proposal","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"voters","outputs":[{"internalType":"uint256","name":"weight","type":"uint256"},{"internalType":"bool","name":"voted","type":"bool"},{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"vote","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"winnerName","outputs":[{"internalType":"bytes32","name":"winnerName_","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"winningProposal","outputs":[{"internalType":"uint256","name":"winningProposal_","type":"uint256"}],"stateMutability":"view","type":"function"}]

// Address of the deployed contract
const contractAddress = "0x8820AE49d66eB1DeB4b3940Ee1A6eF38644a9A21";

const provider = setupProvider();
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider)
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

/** @notice main function to take an address and give it voting rights */
async function main() {
  // Picking up 'to' address from the parameter in the function call:
  const [addressNewVoter] = process.argv.slice(2);
  ///const currentVoters = await contract.voters;

  /** @dev the giveRightToVote function of Ballot.sol can only be called by the chairperson = contract deployer  */
  /** @dev add check whether the person already has a right to vote  */
  await contract.giveRightToVote(addressNewVoter);
  console.log(`\nNew Voter Address ${addressNewVoter} has been granted voting rights.\n`);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });