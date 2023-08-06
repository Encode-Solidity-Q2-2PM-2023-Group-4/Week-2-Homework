# Week-2-Homework

Space for Adam Czopp, Antony Saihaan, Linus Kelsey and Nanda Girish to complete the second week of homework for the Encode Club's Solidity Bootcamp (Q2 2023 - 2pm).

### Addresses:

Linus Kelsey: [0xa65b289a1F8AFA8105133523F0B912c6D5Fc1150](https://sepolia.etherscan.io/address/0xa65b289a1F8AFA8105133523F0B912c6D5Fc1150)    
Nanda Girish: [0xc3Ef2b9e4D9EAa4Efa28919213959CdD7E86B038](https://sepolia.etherscan.io/address/0xc3Ef2b9e4D9EAa4Efa28919213959CdD7E86B038)  
Antony : [0x1Cf2ed52a7E6b4E8254f55624c85ed5958308a31](https://sepolia.etherscan.io/address/0x1Cf2ed52a7E6b4E8254f55624c85ed5958308a31)       
Adam : [0xBe124408dE4a263d0e746e9dB41744f66C3e5DF4](https://sepolia.etherscan.io/address/0xbe124408de4a263d0e746e9db41744f66c3e5df4)


### Deployment and Interaction:

Contract was deployed with [`DeployWithEthers.ts`](scripts/DeployWithEthers.ts) at address [0x8820AE49d66eB1DeB4b3940Ee1A6eF38644a9A21](https://sepolia.etherscan.io/address/0x8820ae49d66eb1deb4b3940ee1a6ef38644a9a21) with Linus as chairperson (tx: [0xc90...5c8](https://sepolia.etherscan.io/tx/0xc9045431a8fe82e95882177c497970f71e1cac7998bfd2615b109944c6e825c8)).

<img width="922" alt="Screenshot 2023-08-06 at 21 54 09" src="https://github.com/Encode-Solidity-Q2-2PM-2023-Group-4/Week-2-Homework/assets/96599839/be65f5fa-d197-432f-a9fd-a4bac702861a">

The first interaction was giving the right to vote to Nanda with [`vote.ts`](scripts/giveRightToVote.ts) (tx: [0x120...14b](https://sepolia.etherscan.io/tx/0x1207e7f27c11a1657c92ce99983baea4a6f74ec6f16666559ff28aaa0e15414b)).

<img width="922" alt="Screenshot 2023-08-06 at 21 54 55" src="https://github.com/Encode-Solidity-Q2-2PM-2023-Group-4/Week-2-Homework/assets/96599839/89a4dc51-6b93-4271-a160-b5f5b16be39b">

### 1st Voting Interaction:

Function vote was called by Nanda using the sript [`vote.ts`](scripts/vote.ts) and parameter passed = 1 (which corresponds to proposal 'Solana').
<br> tx: [https://sepolia.etherscan.io/tx/0x8cc54d71feb141d27db23bcb6305cae2fab80280fcf9c8fdc619bc67404ca920](https://sepolia.etherscan.io/tx/0xff2883d90743329693564fbbaa2b1c1cf36a5d4e39954310dd881509423ed274)

![image](https://github.com/Encode-Solidity-Q2-2PM-2023-Group-4/Week-2-Homework/assets/129112008/23f0d1a8-8bef-4801-95f8-534117b54ca9)

### 2nd Voting Interaction

Function vote was called by Linus using the sript [`vote.ts`](scripts/vote.ts) and parameter passed = 4 (which corresponds to proposal 'Binance') (tx: [0x7d5...2a1](https://sepolia.etherscan.io/tx/0x7d573c7489d878aad0b2892ac60bc646498f2429823abefbc177cb3ff66512a1)).

### 3rd Voting Interaction:

Function vote was called by Adam using the sript [`vote.ts`](scripts/vote.ts) and parameter passed = 2 (which corresponds to proposal 'Bitcoin').
<br> tx: https://sepolia.etherscan.io/tx/0x8cc54d71feb141d27db23bcb6305cae2fab80280fcf9c8fdc619bc67404ca920

<img width="922" alt="Screenshot 2023-08-06 at 21 55 32" src="https://github.com/Encode-Solidity-Q2-2PM-2023-Group-4/Week-2-Homework/assets/96599839/b43f5c8f-76bb-4315-bb84-603a2f90e61b">

### Delegate Interaction:

An earlier interaction gave the right to vote to Antony with [`giveRightToVote.ts`](scripts/giveRightToVote.ts).
https://sepolia.etherscan.io/tx/0xe1de04ece108dda564855ce4167623c24860b339d84f6ed562ed2a908f75bd62

It is then followed by Antony's delegate interaction by delegating the vote to Linus using [`delegate.ts`](scripts/delegate.ts), which leads to increasing the Binance vote by 1.
(https://sepolia.etherscan.io/tx/0xbb05522c49b84bb31b33b5d4aa0fadf60181ff17ecb66667fe33271b1fd6974f)

<img width="922" alt="Screenshot 2023-08-06 at 21 56 11" src="https://github.com/Encode-Solidity-Q2-2PM-2023-Group-4/Week-2-Homework/assets/96599839/e1e4640b-1e39-4f86-b541-69391b953871">

### Voting twice:

When attempting to vote after having previously voted, the terminal will throw an error `"Already voted."` as is specified in [`Ballot.sol`](contracts/Ballot.sol).

<img width="682" alt="Screenshot 2023-08-06 at 18 58 20" src="https://github.com/Encode-Solidity-Q2-2PM-2023-Group-4/Week-2-Homework/assets/96599839/cd3739de-9b3c-41c0-9693-356bebf4777b">

### Counting Votes:

After everyone has voted, we can count the votes ([`currentTally.ts`](scripts/currentTally.ts)) and announce the winner ([`winnerName.ts`](scripts/winnerName.ts))!

<img width="391" alt="Screenshot 2023-08-06 at 21 52 55" src="https://github.com/Encode-Solidity-Q2-2PM-2023-Group-4/Week-2-Homework/assets/96599839/2217fb3b-443f-4a18-90ca-6e678b4e2854">
