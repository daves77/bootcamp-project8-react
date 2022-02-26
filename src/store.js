import { createContext, useReducer } from "react";

const USER_SIGNED_IN = "USER_SIGNED_IN";

export const userDetailsReducer = (state, action) => {
  switch (action.type) {
    case USER_SIGNED_IN:
      const newUserState = action.userDetails;
      console.log(newUserState);
      return newUserState;
    default:
      return state;
  }
};

export const userSignIn = (userDetails) => {
  return {
    type: USER_SIGNED_IN,
    userDetails,
  };
};

export const Context = createContext();

export const MarketplaceProvider = ({ children }) => {
  /* set initial userState to be null */
  const [userState, dispatchUserState] = useReducer(userDetailsReducer, null);
  return (
    <Context.Provider value={{ userState, dispatchUserState }}>{children}</Context.Provider>
  );
};
