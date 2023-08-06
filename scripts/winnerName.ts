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
  
  // creating a contract instance from the deployed contract address and relevant abi and signer
  const ballotContract = new ethers.Contract("0x8820AE49d66eB1DeB4b3940Ee1A6eF38644a9A21", BallotJSON.abi, signer);
  // Maybe here (^) we could remove the hardcoded address, allowing for us to run tests on dummy contracts.

  // retreiving the winner name from the contract
  const winnerBytes = await ballotContract.winnerName();

  // converts winner name into human readable string format (previously in bytes32)
  const winnerString = ethers.decodeBytes32String(winnerBytes);

  // outputs the name of the winning proposal
  console.log("Winning proposal: " + winnerString);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
