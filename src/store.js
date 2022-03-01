import { createContext, useReducer } from 'react';

/* action type constants */
const USER_SIGNED_IN = 'USER_SIGNED_IN';
const PROVIDERS_UPDATED = 'PROVIDERS_UPDATED';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const RETRIEVED_ITEMS = 'RETRIEVED_ITEMS';
const SET_NOTIFICATION = 'SET_NOTIFICATION';

/* useReducer initial state  */
const initialState = {
	user: null,
	provider: null,
	signer: null,
	nftContract: null,
	mktContract: null,
	items: [],
	notification: null,
};

/* useReducer reducer function */
export const marketplaceReducer = (state, action) => {
	console.log('running');
	let newUserState;
	switch (action.type) {
		case USER_SIGNED_IN:
			newUserState = {
				...state,
				user: action.userDetails,
				signer: action.signer,
				nftContract: action.nftContract,
				mktContract: action.mktContract,
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
		case RETRIEVED_ITEMS:
			newUserState = {
				...state,
				items: action.items,
			};
			return newUserState;
		case SET_NOTIFICATION:
      console.log("setting notification")
			newUserState = {
				...state,
				notification: { message: action.message, status: action.status },
			};
      return newUserState
		default:
			return state;
	}
};

/* functions to pass action object to useReducer dispatch function */
export const userSignIn = (userDetails, signer, nftContract, mktContract) => {
	return {
		type: USER_SIGNED_IN,
		signer,
		userDetails,
		nftContract,
		mktContract,
	};
};

export const createContracts = (nftContract, mktContract) => {
	return {
		type: PROVIDERS_UPDATED,
		nftContract,
		mktContract,
	};
};

export const createProfile = (userDetails) => {
	return {
		type: UPDATE_PROFILE,
		userDetails,
	};
};

export const getItems = (items) => {
	return {
		type: RETRIEVED_ITEMS,
		items,
	};
};

export const setNotification = (message, status) => {
	return {
		type: SET_NOTIFICATION,
		message,
		status,
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
