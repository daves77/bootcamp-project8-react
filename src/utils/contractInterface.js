import { ethers } from 'ethers';
import { getNFTByHash, getAllNFT } from './pinata';

export const makeToken = async (nftContract, tokenUrl) => {
	console.log(nftContract)
	let transacResponse = await nftContract.createToken(tokenUrl);
	let transacReceipt = await transacResponse.wait();
	// console.log("mint token transacReceipt", transacReceipt, "tokenId",transacReceipt.events[0].args.tokenId)
	let mintToken = transacReceipt.events[0].args.tokenId;
	console.log(mintToken, "mint token");
	// console.log("This is result from minting token", mintToken);
	return mintToken;
};

export const listToken = async (
	marketContract,
	nftContract,
	tokenId,
	price
) => {
	// console.log("These are args passed in", nftContract, tokenId, price)
	console.log(marketContract);
	await marketContract.createMarketItem(nftContract.address, tokenId, price);
	return;
};

export const getAllMarketItems = async (nftContract, marketContract) => {
	// honestly this feels very bootleggy, think there is a better way to get around this
	const marketData = await marketContract.getAllMarketItems();
	console.log(marketData, "marketData")
	const items = await Promise.all(
		marketData.map(async (item) => {
			console.log(item.tokenId)
			const tokenURI = await nftContract.tokenURI(item.tokenId);
    
      return {
        tokenId: Number(item.tokenId),
        image: tokenURI,
        price: item.price.toString(),
        seller: item.seller
      }
		})
	);
	console.log(items, "items")
  return items
};
