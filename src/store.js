import { createContext, useReducer } from "react";

/* action type constants */
const USER_SIGNED_IN = "USER_SIGNED_IN";
const PROVIDERS_UPDATED = "PROVIDERS_UPDATED";
const UPDATE_PROFILE = "UPDATE_PROFILE";

/* useReducer initial state  */
const initialState = {
  user: null,
  provider: null,
  signer: null,
  nftContract: null,
  mktContract: null,
};

/* useReducer reducer function */
export const marketplaceReducer = (state, action) => {
  let newUserState;
  switch (action.type) {
    case USER_SIGNED_IN:
      newUserState = {
        ...state,
        user: action.userDetails,
        nftContract: action.nftContract,
        mktContract: action.mktContract
      };
      return newUserState;
    case PROVIDERS_UPDATED:
      newUserState = {
        ...state,
        provider: action.provider,
        nftContract: action.nftContract,
        mktContract: action.mktContract,
      };
      return newUserState;
    case UPDATE_PROFILE:
      newUserState = {
        ...state,
        user: action.userDetails,
      };
      return newUserState;

    default:
      return state;
  }
};

/* functions to pass action object to useReducer dispatch function */
export const userSignIn = (
  userDetails,
  nftSignerContract,
  mktSignerContract
) => {
  return {
    type: USER_SIGNED_IN,
    userDetails,
    nftSignerContract,
    mktSignerContract,
  };
};

export const createContracts = (
  nftContract,
  mktContract
) => {
  return {
    type: PROVIDERS_UPDATED,
    nftContract,
    mktContract,
  };
};

export const createProfile = (
  userDetails
) => {
  return {
    type: UPDATE_PROFILE,
    userDetails,
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
