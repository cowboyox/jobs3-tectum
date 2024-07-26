'use client';

import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { useSocket } from '@/context/socket';
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

export const CustomContext = createContext();

export const ContextProvider = ({ children }) => {
  const { toast } = useToast();
  const [currentRole, setCurrentRole] = useState(USER_ROLE.FREELANCER);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [isIdle, setIsIdle] = useState(true);
  // Context API States
  const [loading, setLoading] = useState(true);
  const socket = useSocket();
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
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [unreadClientOrders, setUnreadClientOrders] = useState([]);
  const [unreadFreelancerOrders, setUnreadFreelancerOrders] = useState([]);
  const [lastMessage, setLastMessage] = useState(new Map());

  useEffect(() => {
    if (currentProfile?._id) {
      socket?.on('newMessage', (message) => {
        if (message.receiverId === currentProfile._id) {
          if (!pathname.includes(`inbox/${message.senderId}`)) {
            setUnreadMessages((prev) => {
              const filtered = prev.filter((p) => p.timeStamp !== message.timeStamp);

              return [...filtered, message];
            });
          }

          setLastMessage((prev) => {
            const res = new Map(prev);
            res.set(message.senderId, message);

            return res;
          });
        }
      });

      socket?.on('client_applied', (data) => {
        if (data.gigOwner === currentProfile._id) {
          setUnreadClientOrders((prev) => {
            const filtered = prev.filter((p) => p.freelancerGig !== data.freelancerGig);

            return [...filtered, data];
          });
        }
      });

      socket?.on('freelancer_applied', (data) => {
        if (data.gigOwner === currentProfile._id) {
          setUnreadFreelancerOrders((prev) => {
            const filtered = prev.filter((p) => p.clientGig !== data.clientGig);

            return [...filtered, data];
          });
        }
      });
    }

    return () => {
      socket?.off('newMessage');
      socket?.off('client_applied');
      socket?.off('freelancer_applied');
    };
  }, [socket, currentProfile?._id, pathname]);

  useEffect(() => {
    if (currentProfile?._id) {
      let idleTimer;
      const idleTime = 30000;

      const resetIdleTimer = () => {
        clearTimeout(idleTimer);

        if (isIdle) {
          setIsIdle(false);
          socket.emit('user-active', currentProfile?._id);
        }

        idleTimer = setTimeout(() => {
          setIsIdle(true);
          socket.emit('user-idle', currentProfile?._id);
        }, idleTime);
      };

      const events = ['mousemove', 'keydown', 'click'];

      events.forEach((event) => {
        window.addEventListener(event, resetIdleTimer);
      });

      return () => {
        clearTimeout(idleTimer);
        events.forEach((event) => {
          window.removeEventListener(event, resetIdleTimer);
        });
      };
    }
  }, [isIdle, socket, currentProfile?._id]);

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
      JSON.stringify({
        data: { ...data, currentProfile: profileData.data.profile, currentRole: user.role[0] },
      })
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
      JSON.stringify({
        data: { ...data, currentProfile: profileData.data.profile, currentRole: user.role[0] },
      })
    );
    dispatch({
      payload: user,
      type: HANDLERS.SIGN_IN,
    });
  };

  const verifyOTPPassword = async (credential) => {
    const { data } = await api.post('/api/v1/user/verifyForgotPassword', {
      otp: credential,
      user_id: verify_id,
    });
    console.log('data ', data);
    if (data === 'success') return true;
    else return false;
  };

  const signUpwithWallet = async (wallet) => {
    if (state.acc_type === null) {
      alert('Please select account type');
      return;
    }
    try {
      const { data } = await api.post('/api/v1/user/wallet/register', {
        acc_type: state.acc_type,
        wallet: wallet.toLowerCase(),
      });
      localStorage.setItem(
        'jobs_2024_token',
        JSON.stringify({
          data: {
            ...data,
            currentRole: data.user.role[0],
          },
        })
      );
      const profileData = await api.get(
        `/api/v1/profile/get-profile/${data.user.email}/${data.user.role[0]}`
      );
      dispatch({
        payload: wallet,
        type: HANDLERS.SIGN_IN_WALLET,
      });
      localStorage.setItem(
        'jobs_2024_token',
        JSON.stringify({
          data: {
            ...data,
            currentProfile: profileData.data.profile,
            currentRole: data.user.role[0],
          },
        })
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
      const url = window.location.href;
      // Create an anchor element to parse the URL
      const parser = document.createElement('a');
      parser.href = url;

      // Extract the pathname and search parameters
      const { pathname, search } = parser;

      // Parse the search parameters to get the 'redirect' value
      const params = new URLSearchParams(search);
      const redirectPath = params.get('redirect');
      // Get the value of the 'redirect' parameter
      if (redirectPath) router.push(redirectPath);
      else router.push(`/dashboard/${accountTypeName}/home`);
    } catch (err) {
      console.error(err);
    }
  };

  const sendOTP = async (email) => {
    const { data } = await api.post('api/v1/user/send-opcode-forgot-password', {
      email: email,
    });
    const { user_id, role } = data;
    localStorage.setItem('jobs_2024_token', JSON.stringify({ data }));
    setVerify(user_id);
    setRole(role);
  };

  const signInwithWallet = async (wallet) => {
    // if (state.acc_type === null) {
    //   alert("Please select account type")
    //   return;
    // }
    try {
      const { data } = await api.post('/api/v1/user/wallet/login', {
        wallet: wallet.toLowerCase(),
      });
      console.log({ data });
      localStorage.setItem(
        'jobs_2024_token',
        JSON.stringify({
          data: {
            ...data,
            currentRole: data.user.role[0],
          },
        })
      );
      const profileData = await api.get(
        `/api/v1/profile/get-profile/${data.user.email}/${data.user.role[0]}`
      );
      dispatch({
        payload: wallet,
        type: HANDLERS.SIGN_IN_WALLET,
      });
      localStorage.setItem(
        'jobs_2024_token',
        JSON.stringify({
          data: {
            ...data,
            currentProfile: profileData.data.profile,
            currentRole: data.user.role[0],
          },
        })
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

      const url = window.location.href;
      // Create an anchor element to parse the URL
      const parser = document.createElement('a');
      parser.href = url;

      // Extract the pathname and search parameters
      const { pathname, search } = parser;

      // Parse the search parameters to get the 'redirect' value
      const params = new URLSearchParams(search);
      const redirectPath = params.get('redirect');
      // Get the value of the 'redirect' parameter
      if (redirectPath) router.push(redirectPath);
      else router.push(`/dashboard/${accountTypeName}/home`);
    } catch (err) {
      console.error(err);
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Please Login First</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
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

  const changePassword = async (credentials) => {
    if (state.acc_type === null) {
      alert('Please select account type');
      return;
    }
    const { data } = await api.post('/api/v1/user/change-password', {
      ...credentials,
      acc_type: state.acc_type,
      user_id: verify_id,
    });
    const { user, token } = data;
    api.defaults.headers.common.Authorization = token;
    setCurrentRole(user.role[0]);
    const profileData = await api.get(`/api/v1/profile/get-profile/${user.email}/${user.role[0]}`);
    localStorage.setItem(
      'jobs_2024_token',
      JSON.stringify({
        data: { ...data, currentProfile: profileData.data.profile, currentRole: user.role[0] },
      })
    );
    dispatch({
      payload: user,
      type: HANDLERS.SIGN_IN,
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem('jobs_2024_token');
    try {
      const data = JSON.parse(storedData);
      if (data && typeof data === 'object') {
        const { user, token, currentRole, currentProfile } = data.data;
        setCurrentRole(currentRole);
        setCurrentProfile(currentProfile);
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
    if (currentProfile && socket) {
      socket.emit('add-user', currentProfile._id);

      const storedData = localStorage.getItem('jobs_2024_token');
      try {
        const data = JSON.parse(storedData);
        if (data && typeof data === 'object') {
          localStorage.setItem(
            'jobs_2024_token',
            JSON.stringify({
              data: {
                ...data.data,
                currentProfile,
              },
            })
          );
        }
      } catch (err) {
        console.error('Error getting data!');
      }
    }
  }, [currentProfile, socket]);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem('jobs_2024_token');
      if (!storedData) return;

      try {
        const data = JSON.parse(storedData);
        const email = data?.data?.user?.email;

        if (pathname.includes('dashboard/freelancer')) {
          setCurrentRole(USER_ROLE.FREELANCER);
          const profileData = await api.get(
            `/api/v1/profile/get-profile/${email}/${USER_ROLE.FREELANCER}`
          );
          const profile = profileData.data.profile;
          if (profile) {
            setCurrentProfile(profile);
            localStorage.setItem(
              'jobs_2024_token',
              JSON.stringify({
                data: {
                  ...data.data,
                  currentProfile: profile,
                  currentRole: USER_ROLE.FREELANCER,
                },
              })
            );
          }
        } else if (pathname.includes('dashboard/client')) {
          setCurrentRole(USER_ROLE.CLIENT);
          const profileData = await api.get(
            `/api/v1/profile/get-profile/${email}/${USER_ROLE.CLIENT}`
          );
          const profile = profileData.data.profile;
          if (profile) {
            setCurrentProfile(profile);
            localStorage.setItem(
              'jobs_2024_token',
              JSON.stringify({
                data: {
                  ...data.data,
                  currentProfile: profile,
                  currentRole: USER_ROLE.CLIENT,
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
        changePassword,
        contextValue,
        currentProfile,
        currentRole,
        dispatch,
        lastMessage,
        loader: [loadCompleted, setLoadCompleted],
        loading3D: [load3D, setLoad3D],
        login,
        preloader: [loading, setLoading],
        register,
        scroll: [scrollPause, setScrollPause],
        sendOTP,
        setCurrentProfile,
        setCurrentRole,
        setLastMessage,
        setRole,
        setUnreadMessages,
        signInwithWallet,
        signOut,
        signUpwithWallet,
        unreadClientOrders,
        unreadFreelancerOrders,
        unreadMessages,
        verifyOTP,
        verifyOTPPassword,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};

// Hook
export function useCustomContext() {
  const context = useContext(CustomContext);

  if (context === undefined) {
    throw new Error(`useCustomContext must be used within a CustomContextprovider`);
  }

  return context;
}
