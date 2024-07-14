## Simple NFT Web App

This is a simple project built on the assumption that a factory pattern and/or collection design is unnecessary.

### Requirements
User is able to mint NFTs on at least 2 different chains. And a total score will be derived from all NFTs owned by user existing on either chains.

### Problem - Multi-chain or Cross-chain
As the requirements allows the user to mint NFTs on different chains, the base assumption here regarding the NFTs will be that there's only one copy of each NFT regardless of the chain which it was minted. Then the next question, what solution is needed to allow such a requirement? 

A cross-chain solution means a higher interoperability between chains and requires a more sophisticated solution such as Chainlink CCIP. Whereas a multi-chain solution is simpler. As this is meant to be a simple test project with a time constraint, I doubt the solution will be a sophisticated solution.

### Unnecessary libraries
As this is using the latest version of solidity, the following is no longer necessary to be imported.
- SafeMath
- Counters

### Techstack
- Next.js
- TypeScript
- Hardhat
- Pinata IPFS
- Tailwind CSS
- Flowbite
