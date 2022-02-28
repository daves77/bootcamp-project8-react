/* react imports */
import { useEffect, useContext } from "react";
import { Context, createProviders } from "./../store";
import Page from "../components/Page";
/* web3 imports */
import { ethers } from "ethers";
import MarketListing from "../contracts/MarketListing.json";
import NFT from "../contracts/NFT.json";
import { mktAdd, nftAdd } from "../contracts/addressSetting.js";

const Home = () => {
  const { store, dispatch } = useContext(Context);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      let mktProviderContract = new ethers.Contract(mktAdd, MarketListing.abi, provider);
      let nftProviderContract = new ethers.Contract(nftAdd, NFT.abi, provider);
      dispatch(createProviders( provider, nftProviderContract, mktProviderContract ));
    }
  }, []);
 console.log("This is store in Home", store)
  return (
    <Page title="Closed Land | Home">
      <p>ok should work now</p>
    </Page>
  );
};

export default Home;

