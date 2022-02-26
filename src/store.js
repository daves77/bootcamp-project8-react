import { createContext, useReducer } from "react";

/* action type constants */
const USER_SIGNED_IN = "USER_SIGNED_IN";
const PROVIDERS_UPDATED = "PROVIDERS_UPDATED";
const SIGNERS_UPDATED = "SIGNERS_UPDATED";

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
    case PROVIDERS_UPDATED:
      newUserState = {
        ...state,
        provider: action.provider,
        nftProviderContract: action.nftProviderContract,
        mktProviderContract: action.mktProviderContract,
      };
      return newUserState;
    case SIGNERS_UPDATED:
      newUserState = {
        ...state,
        signer: action.signer,
        nftSignerContract: action.nftSignerContract,
        mktSignerContract: action.mktSignerContract,
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

export const createProviders = (
  provider,
  nftProviderContract,
  mktProviderContract
) => {
  return {
    type: PROVIDERS_UPDATED,
    provider,
    nftProviderContract,
    mktProviderContract,
  };
};

export const createSigners = (signer, nftSignerContract, mktSignerContract) => {
  return {
    type: SIGNERS_UPDATED,
    signer,
    nftSignerContract,
    mktSignerContract,
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
