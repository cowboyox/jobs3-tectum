"use client";

import React, {useReducer, createContext} from "react";
import PropTypes from 'prop-types'
const { useState } = React;

// Context API
// import AuthContext from "./Context";
import api from "@/utils/api";

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_IN_WALLET: 'SIGN_IN_WALLET'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  wallet: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      wallet: null
    };
  },
  [HANDLERS.SIGN_IN_WALLET]: (state, action) => {
    const wallet = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      wallet,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export const CustomContext = createContext({ undefined });

const ContextProvider = ({ children }) => {
  // Context API States
  const [loading, setLoading] = useState(true);
  const [loadCompleted, setLoadCompleted] = useState(true);
  const [load3D, setLoad3D] = useState(0);
  const [scrollPause, setScrollPause] = useState(false);
  const contextValue = {
    // Define your context data here
    message: 'Hello, world!',
  };
  const [verify_id, setVerify] = useState(null)

  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (credentials) => {
    const { data } = await api.post('/api/v1/user/login', { ...credentials });
    const { user, token, verified } = data;
    api.defaults.headers.common.Authorization = token
    localStorage.setItem('jobs_2024_token', token)
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    })
  }

  const setUser = (user) => {
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  }

  const register = async (credentials) => {
      const { data } = await api.post('/api/v1/user/register', { ...credentials })
      const { user_id } = data;
      setVerify(user_id)
  }

  const verifyOTP = async (credential) => {
    const { data } = await api.post('/api/v1/user/verify', { user_id: verify_id, otp: credential });
    const { user, token, verified } = data;
    api.defaults.headers.common.Authorization = token
    localStorage.setItem('jobs_2024_token', token)
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    })
  }

  const signUpwithWallet = async (wallet) => {
    const {data} = await api.post('/api/v1/user/wallet/register', { wallet });
    dispatch({
      type: HANDLERS.SIGN_IN_WALLET,
      payload: wallet
    })
    return data;
  }

  const signInwithWallet = async (wallet) => {
    const {data} = await api.post('/api/v1/user/wallet/login', {wallet})
    dispatch({
      type: HANDLERS.SIGN_IN_WALLET,
      payload: wallet
    })
    return data;
  }

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    })
  }

  return (
    <CustomContext.Provider
      value={{
        ...state,
        preloader: [loading, setLoading],
        loading3D: [load3D, setLoad3D],
        scroll: [scrollPause, setScrollPause],
        loader: [loadCompleted, setLoadCompleted],
        login,
        register,
        verifyOTP,
        signUpwithWallet,
        signInwithWallet,
        signOut,
        contextValue
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node
};

export const CustomConsumer = CustomContext.Consumer;

export const useCustomContext = () => useContext(CustomContext);

export default ContextProvider;

