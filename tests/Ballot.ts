import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
        bytes32Array.push(ethers.encodeBytes32String(array[index]));
    }
    return bytes32Array;
}

async function deployContract() {
    const ballotFactory = await ethers.getContractFactory("Ballot");
    const ballotContract = await ballotFactory.deploy(
        PROPOSALS.map(ethers.encodeBytes32String)
    );
    await ballotContract.waitForDeployment();
    return ballotContract;
}

describe("Ballot", () => {
    let ballotContract: Ballot;
    let accounts: HardhatEthersSigner[];

    beforeEach(async () => {
        ballotContract = await loadFixture(deployContract);
        accounts = await ethers.getSigners();
    });

    describe("when the contract is deployed", () => {
        it("has the provided proposals", async () => {
            for (let index = 0; index < PROPOSALS.length; index++) {
                const proposal = await ballotContract.proposals(index);
                expect(ethers.decodeBytes32String(proposal.name)).to.eq(
                    PROPOSALS[index]
                );
            }
        });

        it("has zero votes for all proposals", async () => {
            for (let index = 0; index < PROPOSALS.length; index ++) {
                const proposal = await ballotContract.proposals(index);
                expect(proposal.voteCount).to.eq(0);
            }
        });

        it("chairperson voting weight 1", async () => {
            const deployerAddress = accounts[0].address;
            const chairpersonVoter = await ballotContract.voters(deployerAddress);
            expect(chairpersonVoter.weight).to.eq(1);
        });

        it("sets the deployer address as chairperson", async () => {
            const deployerAddress = accounts[0].address;
            await ballotContract.waitForDeployment();
            const chairperson = await ballotContract.chairperson();
            expect(chairperson).to.eq(deployerAddress);
        });
    });

    describe("when the chairperson interacts with the giveRightToVote function in the contract", async () => {
        it("gives right to vote for another address", async () => {
            const newVoterID = await accounts[1].address;
            await ballotContract.giveRightToVote(newVoterID);
            const newVoterWeight = (await ballotContract.voters(newVoterID)).weight;
            expect(newVoterWeight).to.eq(1);
        });

        it("can not give right to vote for someone that has voted", async () => {
            // TO-DO
            throw Error("Not implemented");
        });

        it("cannot give right to vote for someone that has already voting rights", async () => {
            const newVoterID = accounts[1].address;
            await ballotContract.giveRightToVote(newVoterID);
            expect(ballotContract.giveRightToVote(newVoterID)).to.be.revertedWith("");
        });
    });

    describe("when the voter interacts with the vote function in the contract", async () => {
        // TODO
        it("should register the vote", async () => {
            throw Error("Not implemented");
        });
    });
    
      describe("when the voter interacts with the delegate function in the contract", async () => {
        // TODO
        it("should transfer voting power", async () => {
            throw Error("Not implemented");
        });
    });
    
      describe("when an account other than the chairperson interacts with the giveRightToVote function in the contract", async () => {
        // TODO
        it("should revert", async () => {
            throw Error("Not implemented");
        });
    });
    
      describe("when an account without right to vote interacts with the vote function in the contract", async () => {
        // TODO
        it("should revert", async () => {
            throw Error("Not implemented");
        });
    });
    
      describe("when an account without right to vote interacts with the delegate function in the contract", async () => {
        // TODO
        it("should revert", async () => {
            throw Error("Not implemented");
        });
    });
    
      describe("when someone interacts with the winningProposal function before any votes are cast", async () => {
        // TODO
        it("should return 0", async () => {
            throw Error("Not implemented");
        });
    });
    
      describe("when someone interacts with the winningProposal function after one vote is cast for the first proposal", async () => {
        // TODO
        it("should return 0", async () => {
            throw Error("Not implemented");
        });
    });
    
      describe("when someone interacts with the winnerName function before any votes are cast", async () => {
        // TODO
        it("should return name of proposal 0", async () => {
            throw Error("Not implemented");
        });
    });
    
      describe("when someone interacts with the winnerName function after one vote is cast for the first proposal", async () => {
        // TODO
        it("should return name of proposal 0", async () => {
            throw Error("Not implemented");
        });
    });
    
      describe("when someone interacts with the winningProposal function and winnerName after 5 random votes are cast for the proposals", async () => {
        // TODO
        it("should return the name of the winner proposal", async () => {
            throw Error("Not implemented");
        });
    });
})