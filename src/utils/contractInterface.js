import { ethers } from 'ethers';
import { getNFTByHash, getAllNFT } from './pinata';

export const makeToken = async (nftContract, tokenUrl) => {
	console.log(nftContract);
	let transacResponse = await nftContract.createToken(tokenUrl);
	let transacReceipt = await transacResponse.wait();
	// console.log("mint token transacReceipt", transacReceipt, "tokenId",transacReceipt.events[0].args.tokenId)
	let mintToken = transacReceipt.events[0].args.tokenId;
	console.log(mintToken, 'mint token');
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

	const items = [];
	for (let i = 0; i < marketData.length; i++) {
		const item = marketData[i];
		items.push({
			itemId: Number(item.itemId),
			tokenId: Number(item.tokenId),
			image: await nftContract.tokenURI(item.tokenId),
			priceEth: item.price,
			price: ethers.utils.formatUnits(
				ethers.utils.formatUnits(item.price.toString(), 'wei'),
				'ether'
			),
			owner: item.owner,
			status: item.status,
		});
	}

	console.log(items, 'items');
	return items;
};

export const getAllUserItems = async (nftContract, marketContract) => {
	// honestly this feels very bootleggy, think there is a better way to get around this
	const marketData = await marketContract.getAllMarketItems();
	const userAddress = await marketContract.signer.getAddress();
	const items = [];
	for (let i = 0; i < marketData.length; i++) {
		const item = marketData[i];
		if (item.owner === userAddress || item.seller === userAddress) {
			items.push({
				itemId: Number(item.itemId),
				tokenId: Number(item.tokenId),
				image: await nftContract.tokenURI(item.tokenId),
				priceEth: item.price,
				price: ethers.utils.formatUnits(
					ethers.utils.formatUnits(item.price.toString(), 'wei'),
					'ether'
				),
				seller: item.seller,
				status: item.status,
			});
		}
	}
	Promise.all(items);
	console.log(items, 'items');
	return items;
};

export const buyMarketItem = async (
	nftContractAddress,
	marketContract,
	itemId,
	price
) => {
	console.log(nftContractAddress, marketContract, itemId, price);

	const tx = marketContract.createMarketItemSale(nftContractAddress, itemId, {
		gasLimit: ethers.utils.parseUnits('500000', 'wei'),
		value: price,
	});
};

export const sendTradeOffer = async (
	offererItems,
	offereeItems,
	offereeAddress,
	marketContract
) => {
	await marketContract.createItemTradeOffer(
		offererItems,
		offereeItems,
		offereeAddress,
		{ gasLimit: ethers.utils.parseUnits('500000', 'wei') }
	);
};

export const getAllTradeOffers = async (userAddress,marketContract) => {
	const offers = await marketContract.getUserTradeOffers(userAddress)
	console.log(offers, "offers")
	return offers
}

export const approveTradeOffer = async (tradeId,nftContractAddress, marketContract) => {
	console.log(tradeId, nftContractAddress, marketContract)
	await marketContract.approveTradeOffer(tradeId, nftContractAddress, {
		gasLimit: ethers.utils.parseUnits('500000', 'wei'),
	});
};
