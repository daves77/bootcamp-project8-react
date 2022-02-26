/* react related imports */
import { useEffect, useContext } from "react";
import { Context, createMktProviderContract, createNftProviderContract, createProvider } from "./../store";
import Page from "../components/Page";
/* web3 related imports */
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
      let mktContractProvider = new ethers.Contract(mktAdd, MarketListing.abi, provider);
      let nftContractProvider = new ethers.Contract(nftAdd, NFT.abi, provider);
      dispatch(createProvider({ provider }));
      dispatch(createNftProviderContract({nftContractProvider}))
      dispatch(createMktProviderContract({mktContractProvider}))
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
