'use client';

import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

import api from '@/utils/api';
import { USER_ROLE } from '@/utils/constants';
import { backend_url } from '@/utils/variables';

const HANDLERS = {
  ACCOUNT_TYPE: 'ACCOUNT_TYPE',
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_WALLET: 'SIGN_IN_WALLET',
  SIGN_OUT: 'SIGN_OUT',
};

const initialState = {
  acc_type: null,
  isAuthenticated: false,
  isLoading: true,
  user: null,
  wallet: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      acc_type: null,
      isAuthenticated: false,
      user: null,
      wallet: null,
    };
  },
  [HANDLERS.SIGN_IN_WALLET]: (state, action) => {
    const wallet = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user: null,
      wallet,
    };
  },
  [HANDLERS.ACCOUNT_TYPE]: (state, action) => {
    const acc_type = action.payload;

    return {
      ...state,
      acc_type,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const CustomContext = createContext({ undefined });

const ContextProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState(USER_ROLE.FREELANCER);
  const [currentProfile, setCurrentProfile] = useState(null)
  // Context API States
  const [loading, setLoading] = useState(true);
  const [loadCompleted, setLoadCompleted] = useState(true);
  const [load3D, setLoad3D] = useState(0);
  const [scrollPause, setScrollPause] = useState(false);
  const contextValue = {
    // Define your context data here
    message: 'Hello, world!',
  };
  const [verify_id, setVerify] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (credentials) => {
    // if (state.acc_type === null) {
    //   alert('Please select account type');
    //   return;
    // }
    const { data } = await axios.post(`${backend_url}/api/v1/user/login`, credentials);

    const { user, token } = data;
    api.defaults.headers.common.Authorization = token;
    setCurrentRole(user.role[0]);
    const profileData = await api.get(`/api/v1/profile/get-profile/${user.email}/${user.role[0]}`);
    localStorage.setItem(
      'jobs_2024_token',
      JSON.stringify({ data: { ...data, currentRole: user.role[0], currentProfile: profileData.data.profile } })
    );
    dispatch({
      payload: user,
      type: HANDLERS.SIGN_IN,
    });
    return user;
  };

  const register = async (credentials) => {
    if (state.acc_type === null) {
      alert('Please select account type');
      return;
    }
    const { data } = await api.post('/api/v1/user/register', {
      ...credentials,
      acc_type: state.acc_type,
    });
    const { user_id } = data;
    localStorage.setItem('jobs_2024_token', JSON.stringify({ data }));
    setVerify(user_id);
  };

  const verifyOTP = async (credential) => {
    if (state.acc_type === null) {
      alert('Please select account type');
      return;
    }
    const { data } = await api.post('/api/v1/user/verify', {
      acc_type: state.acc_type,
      otp: credential,
      user_id: verify_id,
    });
    const { user, token } = data;
    api.defaults.headers.common.Authorization = token;
    setCurrentRole(user.role[0]);
    const profileData = await api.get(`/api/v1/profile/get-profile/${user.email}/${user.role[0]}`);
    localStorage.setItem(
      'jobs_2024_token',
      JSON.stringify({ data: { ...data, currentRole: user.role[0], currentProfile: profileData.data.profile } })
    );
    dispatch({
      payload: user,
      type: HANDLERS.SIGN_IN,
    });
  };

  const signUpwithWallet = async (wallet) => {
    if (state.acc_type === null) {
      alert('Please select account type');
      return;
    }
    try {
      const { data } = await api.post('/api/v1/user/wallet/register', {
        acc_type: state.acc_type,
        wallet,
      });
      const profileData = await api.get(`/api/v1/profile/get-profile/${data.user.email}/${data.user.role[0]}`);
      dispatch({
        payload: wallet,
        type: HANDLERS.SIGN_IN_WALLET,
      });
      localStorage.setItem(
        'jobs_2024_token',
        JSON.stringify({ data: { ...data, currentRole: data.user.role[0], currentProfile: profileData.data.profile } })
      );
      let accountType = data.user.role[0];
      let accountTypeName;
      switch (accountType) {
        case 0:
          accountTypeName = 'freelancer';
          break;
        case 3:
          accountTypeName = 'client';
          break;
        default:
          accountTypeName = 'client';
          break;
      }
      router.push(`/dashboard/${accountTypeName}/`);
      // router.push('/jobs')
    } catch (err) {
      console.error(err);
    }
  };

  const signInwithWallet = async (wallet) => {
    // if (state.acc_type === null) {
    //   alert("Please select account type")
    //   return;
    // }
    try {
      const { data } = await api.post('/api/v1/user/wallet/login', { wallet });
      const profileData = await api.get(`/api/v1/profile/get-profile/${data.user.email}/${data.user.role[0]}`);
      dispatch({
        payload: wallet,
        type: HANDLERS.SIGN_IN_WALLET,
      });
      localStorage.setItem(
        'jobs_2024_token',
        JSON.stringify({ data: { ...data, currentRole: data.user.role[0], currentProfile: profileData.data.profile } })
      );
      let accountType = data.user.role[0];
      let accountTypeName;
      switch (accountType) {
        case 0:
          accountTypeName = 'freelancer';
          break;
        case 3:
          accountTypeName = 'client';
          break;
        default:
          accountTypeName = 'client';
          break;
      }
      router.push(`/dashboard/${accountTypeName}/`);
    } catch (err) {
      console.error(err);
    }
  };

  const signOut = () => {
    localStorage.removeItem('jobs_2024_token');
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  const setRole = (role) => {
    dispatch({
      payload: role,
      type: HANDLERS.ACCOUNT_TYPE,
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem('jobs_2024_token');
    try {
      const data = JSON.parse(storedData);
      if (data && typeof data === 'object') {
        const { user, token, currentRole, profileData } = data.data;
        setCurrentRole(currentRole);
        setCurrentProfile(profileData)
        api.defaults.headers.common.Authorization = token;
        dispatch({
          payload: user,
          type: HANDLERS.SIGN_IN,
        });

        // router.push('/jobs')
      }
    } catch (err) {
      console.error('Error getting data!');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem('jobs_2024_token');
      if (!storedData) return;

      try {
        const data = JSON.parse(storedData);
        const email = data?.data?.user?.email;

        if (pathname.includes('dashboard/freelancer')) {
          setCurrentRole(USER_ROLE.FREELANCER);
          const profileData = await api.get(`/api/v1/profile/get-profile/${email}/${USER_ROLE.FREELANCER}`);
          const profile = profileData.data.profile
          if (profile) {
            setCurrentProfile(profile);
            localStorage.setItem(
              'jobs_2024_token',
              JSON.stringify({
                data: {
                  ...data.data,
                  currentRole: USER_ROLE.FREELANCER,
                  currentProfile: profile,
                },
              })
            );
          }
        } else if (pathname.includes('dashboard/client')) {
          setCurrentRole(USER_ROLE.CLIENT);
          const profileData = await api.get(`/api/v1/profile/get-profile/${email}/${USER_ROLE.CLIENT}`);
          const profile = profileData.data.profile
          if (profile) {
            setCurrentProfile(profile);
            localStorage.setItem(
              'jobs_2024_token',
              JSON.stringify({
                data: {
                  ...data.data,
                  currentRole: USER_ROLE.CLIENT,
                  currentProfile: profile,
                },
              })
            );
          }
        }
      } catch (err) {
        console.error('Error processing stored data!', err);
      }
    };

    fetchData();
  }, [router, pathname]);

  return (
    <CustomContext.Provider
      value={{
        ...state,
        contextValue,
        currentRole,
        currentProfile,
        dispatch,
        loader: [loadCompleted, setLoadCompleted],
        loading3D: [load3D, setLoad3D],
        login,
        preloader: [loading, setLoading],
        register,
        scroll: [scrollPause, setScrollPause],
        setCurrentRole,
        setCurrentProfile,
        setRole,
        signInwithWallet,
        signOut,
        signUpwithWallet,
        verifyOTP,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export const CustomConsumer = CustomContext.Consumer;

export const useCustomContext = () => useContext(CustomContext);

export default ContextProvider;
