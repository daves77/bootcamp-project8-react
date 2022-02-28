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
	// honestly this feels very bootleggy, think there is a better way to get around this
	const marketData = await marketContract.getAllMarketItems();
	const items = await Promise.all(
		marketData.map(async (item) => {
			const tokenURI = await nftContract.tokenURI(item.tokenId);
			const weiPrice = ethers.utils.formatUnits(item.price.toString(), "wei")

			return {
				itemId: Number(item.itemId),
				tokenId: Number(item.tokenId),
				image: tokenURI,
				price: ethers.utils.formatUnits(weiPrice, "ether"),
				oriPrice: item.price,
				seller: item.seller,
				sold: item.sold,
				owner: item.owner

			}
		})
	);
	return items
};

/**
	 * @dev Creates a direct sale if the seller has an open listing
	 */
// function createMarketItemSale(address _nftContract, uint256 _itemId)
// public
// payable
// nonReentrant
// {
//       MarketItem storage soldItem = marketItemId[_itemId];
//       uint256 price = soldItem.price;
//       uint256 tokenId = soldItem.tokenId;

// 	//ensure that buyer sent enough eth to buy NFT
// 	require(msg.value == price, "Not enough ETH for puchase");

// 	// transfer eth from buyer to seller
// 	soldItem.seller.transfer(msg.value);

// 	// transfer ownership to buyer
// 	IERC721(_nftContract).transferFrom(address(this), msg.sender, tokenId);

// 	// update blockchain
// 	soldItem.owner = payable(msg.sender);
// 	soldItem.sold = true;
// 	payable(_owner).transfer(itemListingPrice);
//       emit MarketItemSold(_itemId, tokenId, price, _nftContract);
// }
export const createMarketItemSale = async (nftContract, marketContract, itemId, price, oriPrice) => {
	// console.log('this runs BE')
	// console.log('price', price)
	const convert = ethers.utils.parseEther(price)
	console.log('convert', convert)
	console.log('nftContract', nftContract)
	console.log('itemid', itemId)
	console.log('mktcontract', marketContract)
	console.log('mktcontract.signer', marketContract.signer)
	const wtf = ethers.utils.parseEther(oriPrice.toString());
	console.log('wtf', wtf)
	// console.log('mktcontract.getsigner', await marketContract.signer.getAddress())
	await marketContract.createMarketItemSale(nftContract, itemId, {
		value: (oriPrice.toString()), gasPrice: 41008240300,
		gasLimit: 30000000
	})
	console.log('this runs BE2')

	console.log('sale was successful')
}

// ApprovalContract.methods.deposit(toAddress).send({ "from": fromAddress, gas: 1000000, "value": web3.utils.toWei(amount, 'ether') }
