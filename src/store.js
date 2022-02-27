import { createContext, useReducer } from "react";

/* action type constants */
const USER_SIGNED_IN = "USER_SIGNED_IN";
const PROVIDER_CREATED = "PROVIDER_CREATED";
const SIGNER_CREATED = "SIGNER_CREATED";
const NFT_CONTRACT_CREATED = "NFT_CONTRACT_CREATED";
const MKT_CONTRACT_CREATED = "MKT_CONTRACT_CREATED";

/* useReducer initial state  */
const initialState = {
  user: null,
  provider: null,
  signer: null,
  marketContract: null,
  nftContract: null
};

/* useReducer reducer function */
export const marketplaceReducer = (state, action) => {
  let newUserState;
  switch (action.type) {
    case USER_SIGNED_IN:
      newUserState = { ...state, user: action.userDetails };
      return newUserState;
    case PROVIDER_CREATED:
      newUserState = { ...state, provider: action.provider };
      return newUserState;
    case SIGNER_CREATED:
      newUserState = { ...state, signer: action.signer };
      return newUserState;
    case NFT_CONTRACT_CREATED:
      newUserState = {
        ...state,
        nftContract: action.nftContract,
      };
      return newUserState;
    case MKT_CONTRACT_CREATED:
      newUserState = {
        ...state,
        marketContract: action.marketContract,
      };
      return newUserState;

    default:
      return state;
  }
};

/* functions to pass action object to useReducer dispatch function */
export const userSignIn = (userDetails) => {
  return {
    type: USER_SIGNED_IN,
    userDetails,
  };
};

export const createProvider = (provider) => {
  return {
    type: PROVIDER_CREATED,
    provider,
  };
};

export const createSigner = (signer) => {
  return {
    type: SIGNER_CREATED,
    signer,
  };
};

export const createNFTContract = (nftContract) => {
  return {
    type: NFT_CONTRACT_CREATED,
    nftContract,
  };
};

export const createMarketContract = (marketContract) => {
  return {
    type: MKT_CONTRACT_CREATED,
    marketContract,
  };
};

/* single context instance to encapsulate marketplace reducer */
export const Context = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [store, dispatch] = useReducer(marketplaceReducer, initialState);
  return (
    <Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>
  );
};
