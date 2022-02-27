import { ethers } from 'ethers';
import { getNFTByHash, getAllNFT } from './pinata';

export const makeToken = async (nftContract, tokenUrl) => {
	let transacResponse = await nftContract.createToken(tokenUrl);
	let transacReceipt = await transacResponse.wait();
	// console.log("mint token transacReceipt", transacReceipt, "tokenId",transacReceipt.events[0].args.tokenId)
	let mintToken = transacReceipt.events[0].args.tokenId;
	console.log(mintToken);
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
	console.log(marketContract);
	// honestly this feels very bootleggy, think there is a better way to get around this
	const marketData = await marketContract.getAllMarketItems();
	const items = await Promise.all(
		marketData.map(async (item) => {
			const tokenURI = await nftContract.tokenURI(item.tokenId);
      console.log(item.price.toString())
      const weiPrice =ethers.utils.formatUnits(item.price.toString(), "wei") 
    
      return {
        tokenId: Number(item.tokenId),
        image: tokenURI,
        price: ethers.utils.formatUnits(weiPrice, "ether"),
        seller: item.seller
      }
		})
	);
  return items
};
