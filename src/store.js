import { createContext, useReducer } from "react";

/* action type constants */
const USER_SIGNED_IN = "USER_SIGNED_IN";
const PROVIDER_CREATED = "PROVIDER_CREATED";
const SIGNER_CREATED = "SIGNER_CREATED";
const NFT_PROVIDER_CONTRACT = "NFT_PROVIDER_CONTRACT";
const MKT_PROVIDER_CONTRACT = "MKT_PROVIDER_CONTRACT";

/* useReducer initial state  */
const initialState = {
  user: null,
  provider: null,
  signer: null,
  nftProviderContract: null,
  nftSignerContract: null,
  mktProviderContract: null,
  mktSignerContract: null,
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
    case NFT_PROVIDER_CONTRACT:
      newUserState = {
        ...state,
        nftProviderContract: action.nftProviderContract,
      };
      return newUserState;
    case MKT_PROVIDER_CONTRACT:
      newUserState = {
        ...state,
        mktProviderContract: action.mktProviderContract,
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

export const createNftProviderContract = (nftProviderContract) => {
  return {
    type: NFT_PROVIDER_CONTRACT,
    nftProviderContract,
  };
};

export const createMktProviderContract = (mktProviderContract) => {
  return {
    type: MKT_PROVIDER_CONTRACT,
    mktProviderContract,
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
