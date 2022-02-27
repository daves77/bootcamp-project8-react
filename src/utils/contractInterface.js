  export const makeToken = async (nftContract, tokenUrl) => {
    try {
      let transacResponse = await nftContract.current.createToken(tokenUrl);
      let transacReceipt = await transacResponse.wait();
      // console.log("mint token transacReceipt", transacReceipt, "tokenId",transacReceipt.events[0].args.tokenId)
      let mintToken = transacReceipt.events[0].args.tokenId;
      // console.log("This is result from minting token", mintToken);
      return mintToken;
    } catch (err) {
      alert("something went wrong with minting the NFT");
      console.log(err);
    }
  };


  export const listToken = async (mktListingContract, nftContract, tokenId, price) => {
    // console.log("These are args passed in", nftContract, tokenId, price)
    try {
      await mktListingContract.current.createMarketItem(
        nftContract,
        tokenId,
        price
      );
      return;
    } catch (err) {
      alert("something went wrong with listing the NFT in the marketplc");
      console.log(err);
    }
  };