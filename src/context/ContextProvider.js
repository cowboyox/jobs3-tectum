"use client";

import React, { useContext } from "react";
const { useState } = React;

// Context API
import Context from "./Context";
import api from "@/utils/api";

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

  let isAuthenticated = false
  let g_user = null;
  let g_jobs = null;
  let verify_id = null;

  const login = async (credentials) => {
    const { data } = await api.post('/api/v1/user/login', { ...credentials });
    const { user, token, verified } = data;
    api.defaults.headers.common.Authorization = token
    localStorage.setItem('jobs_2024_token', token)
    g_user = user
    isAuthenticated = verified
  }

  const register = async (credentials) => {
      const { data } = await api.post('/api/v1/user/register', { ...credentials })
      const { user_id } = data;
      verify_id = user_id
  }

  const verifyOTP = async (credential) => {
    console.log(verify_id, credential)
    const { data } = await api.post('/api/v1/user/verify', { user_id: verify_id, otp: credential });
    const { user, token, verified } = data;
    g_user = user
    api.defaults.headers.common.Authorization = token
    localStorage.setItem('jobs_2024_token', token)
    isAuthenticated = verified
  }

  const signUpwithWallet = async (wallet) => {
    const {data} = await api.post('/api/v1/user/wallet/register', { wallet });
    g_user = wallet
    isAuthenticated = true;
    return data;
  }

  const signInwithWallet = async (wallet) => {
    const {data} = await api.post('/api/v1/user/wallet/login', {wallet})
    g_user = wallet
    isAuthenticated = true;
    return data;
  }

  return (
    <Context.Provider
      value={{
        preloader: [loading, setLoading],
        loading3D: [load3D, setLoad3D],
        scroll: [scrollPause, setScrollPause],
        loader: [loadCompleted, setLoadCompleted],
        login,
        register,
        verifyOTP,
        signUpwithWallet,
        signInwithWallet,
        isAuthenticated,
        verify_id,
        contextValue
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

