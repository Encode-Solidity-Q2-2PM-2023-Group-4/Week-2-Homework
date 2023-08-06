# Week-2-Homework

Space for Adam Czopp, Antony Saihaan, Linus Kelsey and Nanda Girish to complete the second week of homework for the Encode Club's Solidity Bootcamp (Q2 2023 - 2pm).

### Addresses:

Linus Kelsey: [0xa65b289a1F8AFA8105133523F0B912c6D5Fc1150](https://sepolia.etherscan.io/address/0xa65b289a1F8AFA8105133523F0B912c6D5Fc1150)    
Nanda Girish: [0xc3Ef2b9e4D9EAa4Efa28919213959CdD7E86B038](https://sepolia.etherscan.io/address/0xc3Ef2b9e4D9EAa4Efa28919213959CdD7E86B038)  
Antony : [0x1Cf2ed52a7E6b4E8254f55624c85ed5958308a31](https://sepolia.etherscan.io/address/0x1Cf2ed52a7E6b4E8254f55624c85ed5958308a31)       
Adam : [0xBe124408dE4a263d0e746e9dB41744f66C3e5DF4](https://sepolia.etherscan.io/address/0xbe124408de4a263d0e746e9db41744f66c3e5df4)


### Deployment and Interaction:

Contract was deployed with [`DeployWithEthers.ts`](scripts/DeployWithEthers.ts) at address [0x8820AE49d66eB1DeB4b3940Ee1A6eF38644a9A21](https://sepolia.etherscan.io/address/0x8820ae49d66eb1deb4b3940ee1a6ef38644a9a21) with Linus as chairperson.

<img width="1380" alt="Screenshot 2023-08-06 at 13 55 48" src="https://github.com/Encode-Solidity-Q2-2PM-2023-Group-4/Week-2-Homework/assets/96599839/bdb0da3a-20c2-4555-af4a-e9df74216c32">

The first interaction was giving the right to vote to Nanda with [`vote.ts`](scripts/giveRightToVote.ts):

<img width="1371" alt="Screenshot 2023-08-06 at 19 24 41" src="https://github.com/Encode-Solidity-Q2-2PM-2023-Group-4/Week-2-Homework/assets/96599839/0d3d17b2-b96d-40de-9cca-32ca2f7fdea8">

### 1st Voting Interaction:

Function vote was called using the sript [`vote.ts`](scripts/vote.ts) and parameter passed = 1 (which corresponds to proposal 'Solana').
<br> tx: [https://sepolia.etherscan.io/tx/0x8cc54d71feb141d27db23bcb6305cae2fab80280fcf9c8fdc619bc67404ca920](https://sepolia.etherscan.io/tx/0xff2883d90743329693564fbbaa2b1c1cf36a5d4e39954310dd881509423ed274)

![image](https://github.com/Encode-Solidity-Q2-2PM-2023-Group-4/Week-2-Homework/assets/97030306/77b12af8-4e9c-4dfb-867b-69dfa3b00393)

### 2nd Voting Interaction:

Function vote was called using the sript [`vote.ts`](scripts/vote.ts) and parameter passed = 2 (which corresponds to proposal 'Bitcoin').
<br> tx: https://sepolia.etherscan.io/tx/0x8cc54d71feb141d27db23bcb6305cae2fab80280fcf9c8fdc619bc67404ca920

![image](https://github.com/Encode-Solidity-Q2-2PM-2023-Group-4/Week-2-Homework/assets/97030306/77b12af8-4e9c-4dfb-867b-69dfa3b00393)


