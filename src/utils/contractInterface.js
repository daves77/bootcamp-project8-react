  export const makeToken = async (nftContract, tokenUrl) => {
      let transacResponse = await nftContract.createToken(tokenUrl);
      let transacReceipt = await transacResponse.wait();
      // console.log("mint token transacReceipt", transacReceipt, "tokenId",transacReceipt.events[0].args.tokenId)
      let mintToken = transacReceipt.events[0].args.tokenId;
      console.log(mintToken)
      // console.log("This is result from minting token", mintToken);
      return mintToken;

  };


  export const listToken = async (marketContract, nftContract, tokenId, price) => {
    // console.log("These are args passed in", nftContract, tokenId, price)
    console.log(marketContract)
      await marketContract.createMarketItem(
        nftContract.address,
        tokenId,
        price
      );
      return;
  };