import {createContext, useReducer} from 'react'

const USER_SIGNED_IN = "USER_SIGNED_IN"

const initialState = {
  user: null
}

export const marketplaceReducer = (state, action) => {
  switch(action.type){
    case USER_SIGNED_IN:
      const x =  {...state, user:action.payload.user}
      console.log(x)
      return x
    default:
      return state
  }
}


export const userSignIn = (user) => {
  return {
    type: USER_SIGNED_IN,
    payload: {user}
  }
}

export const Context = createContext()

export const MarketplaceProvider = ({children}) => {
  const [store, dispatch] = useReducer(marketplaceReducer, initialState )
  return <Context.Provider value={{store, dispatch}}>{children}</Context.Provider>
}
