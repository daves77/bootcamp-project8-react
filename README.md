# Technical Notes

## Set-up for react app to run

### Connecting to smart contracts

1. follow instructions in solidity repo scripts/deploy.js to create local blockchain using hardhat and deploy contracts to local blockchain
   - basically open one terminal and enter `npx hardhat node` to get a blockchain running locally
   - open 2nd terminal and enter `npx hardhat run --network localhost scripts/deploy.js` to get the contracts deployed on local blockchain
2. an artifacts folder will be created in solidity repo. copy MarketListing.json and NFT.json from the folder.
3. paste MarketListing.json and NFT.json into this repo's src/contracts folder (this has already been done... but this step needs to be redone if MarketListing or NFT contracts change)
4. update addresses in "src/contracts/addressSetting.js" (actually it looks like the contract addresses may be the same everytime they are re-deployed... not sure if they address will change if the contract contents change between deployments... dunno, guess just gotta monitor e addresses everytime we deploy)
5. the local blockchain comes w 20 accounts tt start w 10000 eth each. Instructions on linking MetaMask to these accounts [here](https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb)
6. the 20 accounts are the [same](https://hardhat.org/hardhat-network/#running-stand-alone-in-order-to-support-wallets-and-other-software) for everyone using hardhat's local blockchain!

### Connecting to postgresql backend

1. ensure postgresql service running in a terminal
2. start express server tt serves postgresql db from the bckend repo w `nodemon index.js`

### Start up this react app

1. finally after the above all done, start up this app with `npm run start`

## Troubleshooting local hardhat blockchain issues

### Errors related to artifacts folder/ cache when trying to deploy solidity contracts

1. from the [docs](https://hardhat.org/guides/compile-contracts.html), run `npx hardhat clean` to clear the cache and delete the artifacts from before

### "Nonce too high..."

1. if testing minting and listing with different accounts results in error: "Nonce too high. expected nonce to be 0 but got 9. note that transactions can't be queued when automining".
2. try solution suggested [here](https://medium.com/@thelasthash/solved-nonce-too-high-error-with-metamask-and-hardhat-adc66f092cd)
