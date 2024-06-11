"use client";

import React, { useReducer, createContext, useEffect, useContext } from "react";
import PropTypes from 'prop-types'
import { useRouter } from "next/navigation";
const { useState } = React;

// Context API
// import AuthContext from "./Context";
import api from "@/utils/api";

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_IN_WALLET: 'SIGN_IN_WALLET',
  ACCOUNT_TYPE: 'ACCOUNT_TYPE'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  wallet: null,
  acc_type: null
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
      wallet: null,
      acc_type: null
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
  },
  [HANDLERS.ACCOUNT_TYPE]: (state, action) => {
    const acc_type = action.payload;

    return {
      ...state,
      acc_type
    }
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

  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (credentials) => {
    // if (state.acc_type === null) {
    //   alert('Please select account type');
    //   return;
    // }
    const { data } = await api.post('/api/v1/user/login', { ...credentials });
    const { user, token, verified } = data;
    api.defaults.headers.common.Authorization = token
    localStorage.setItem('jobs_2024_token', JSON.stringify({ data }))
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    })
  }

  const register = async (credentials) => {
    if (state.acc_type === null) {
      alert("Please select account type")
      return;
    }
    const { data } = await api.post('/api/v1/user/register', { ...credentials, acc_type: state.acc_type })
    const { user_id } = data;
    localStorage.setItem('jobs_2024_token', JSON.stringify({ data }))
    setVerify(user_id)
  }

  const verifyOTP = async (credential) => {
    if (state.acc_type === null) {
      alert("Please select account type")
      return;
    }
    const { data } = await api.post('/api/v1/user/verify', { user_id: verify_id, otp: credential, acc_type: state.acc_type });
    const { user, token, verified } = data;
    api.defaults.headers.common.Authorization = token
    localStorage.setItem('jobs_2024_token', JSON.stringify({ data }))
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    })
  }

  const signUpwithWallet = async (wallet) => {
    if (state.acc_type === null) {
      alert("Please select account type")
      return;
    }
    try {
      const { data } = await api.post('/api/v1/user/wallet/register', { wallet, acc_type: state.acc_type });
      dispatch({
        type: HANDLERS.SIGN_IN_WALLET,
        payload: wallet
      })
      localStorage.setItem('jobs_2024_token', JSON.stringify({ data }))
      router.push('/jobs')
    } catch (err) {
      console.log(err)
    }
  }

  const signInwithWallet = async (wallet) => {
    // if (state.acc_type === null) {
    //   alert("Please select account type")
    //   return;
    // }
    try {
      const { data } = await api.post('/api/v1/user/wallet/login', { wallet, acc_type: state.acc_type })
      dispatch({
        type: HANDLERS.SIGN_IN_WALLET,
        payload: wallet
      })
      localStorage.setItem('jobs_2024_token', JSON.stringify({ data }))
      router.replace('/jobs')
    } catch (err) {
      console.log(err)
    }
  }

  const signOut = () => {
    localStorage.removeItem('jobs_2024_token')
    dispatch({
      type: HANDLERS.SIGN_OUT,
    })
  }

  const setRole = (role) => {
    dispatch({
      type: HANDLERS.ACCOUNT_TYPE,
      payload: role
    })
  }

  useEffect(() => {
    const storedData = localStorage.getItem('jobs_2024_token')
    try {
      const data = JSON.parse(storedData)
      if (data && typeof (data) === 'object') {
        const { user, token, verified } = data.data;
        api.defaults.headers.common.Authorization = token
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user
        })
        // router.push('/jobs')
      }
    } catch (err) {
      console.log('Error getting data!')
    }
  }, [])

  return (
    <CustomContext.Provider
      value={{
        ...state,
        dispatch,
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
        setRole,
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

