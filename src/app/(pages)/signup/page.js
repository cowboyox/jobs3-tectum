'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useAccount } from 'wagmi';

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/use-custom';
import { useDebounce } from '@/hooks/useDebounce';
import { useVerifyUsername } from '@/hooks/useVerifyUsername';
import { USER_ROLE } from '@/utils/constants';

const Signup = () => {
  const router = useRouter();
  const [postData, setPostData] = useState({
    acceptPolicy: false,
    confirmPassword: '',
    email: '',
    fullName: '',
    password: '',
    referralUser: '',
    userName: '',
  });
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const debouncedUsername = useDebounce(postData.userName);
  const { data: isExists } = useVerifyUsername(debouncedUsername);
  const ref = useRef(null);
  const auth = useCustomContext();
  const [step, setStep] = useState(0);
  const [referrer, setReferrer] = useState('');
  const [otp_value, setOTPValue] = useState('');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  useEffect(() => {
    const tmp = searchParams.get('referrer');
    setReferrer(tmp);
  }, [searchParams]);

  const validateUserInfo = () => {
    if (
      !postData.fullName ||
      !postData.email ||
      !postData.password ||
      !postData.confirmPassword ||
      !postData.acceptPolicy
    ) {
      return false;
    }

    if (
      postData.fullName.length === 0 ||
      !validateEmail(postData.email) ||
      postData.password.length < 8 ||
      postData.confirmPassword.length < 8 ||
      postData.password !== postData.confirmPassword ||
      !postData.acceptPolicy
    ) {
      return false;
    }
    return true;
  };

  const onRegisterSubmit = async () => {
    console.log('postData------->', postData);
    if (!validateUserInfo()) {
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Please check your infomation.</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
    try {
      const verified = await auth.register({
        email: postData.email,
        name: postData.fullName,
        password: postData.password,
        referralUser: postData.referralUser,
        referrer,
        username: postData.userName,
      });
      if (!verified) {
        // onSwitchPopup('Verification');
        setStep(2);
      } else {
        let accountType = auth.acc_type[0];
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
      }
    } catch (err) {
      console.error(err);
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Email already Exists!</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  const accountType = [
    {
      avatar: 'assets/icons/signup/freelancer.png',
      description: 'Freelancers who work on the basis of a gig',
      title: 'Freelancer',
    },
    {
      avatar: 'assets/icons/signup/employee.png',
      description: 'People looking for a long-term job and apply on the Jobs Board',
      title: 'Employee',
    },
    {
      avatar: 'assets/icons/signup/employer.png',
      description: 'Companies that can post jobs on the Jobs Board',
      title: 'Employer',
    },
    {
      avatar: 'assets/icons/signup/client.png',
      description: 'Users who hire people on the basis of a gig',
      title: 'Client',
    },
  ];
  const [choosen_account_types, setChoosenAccountType] = useState([]);

  const handleAccounType = (id) => {
    setChoosenAccountType((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((accountID) => accountID !== id);
      } else {
        let arr = [...prevSelected, id];
        arr.sort((a, b) => a - b);
        return arr;
      }
    });
  };
  const isIncludeAccount = (id) => {
    console.log(
      'id ',
      id,
      ' value ',
      choosen_account_types.filter((accountID) => accountID === id)
    );
    return choosen_account_types.filter((accountID) => accountID === id).length > 0;
  };

  const handleSubmit = () => {
    console.log('choosen_account_types', choosen_account_types);
    if (choosen_account_types.length == 0) {
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Please select account types!</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
    auth.setRole(choosen_account_types);
    setStep(1);
  };

  const handleOTPCode = async () => {
    if (!otp_value || otp_value.length < 1) {
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Please enter the code to verify.</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
    try {
      console.log('otp_value', otp_value);
      await auth.verifyOTP(otp_value);
      console.log('arrived here!!!');
      let accountType = auth.acc_type[0];
      let accountTypeName;
      switch (accountType) {
        case USER_ROLE.FREELANCER:
          accountTypeName = 'freelancer';
          break;
        case USER_ROLE.CLIENT:
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
      else router.push(`/dashboard/${accountTypeName}/profile/${auth?.currentProfile?._id}`);
    } catch (err) {
      console.error('error', err);
    }
  };
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      try {
        auth.signInwithWallet(address);
      } catch (err) {
        console.error(err);
        // router.replace('/')
      }
    }
  }, [isConnected, address, auth]);
  const onKeyDown = (e) => {
    if (e.key == 'Enter') {
      onRegisterSubmit();
    }
  };
  return (
    <div className='xxs:mx-0 mx-[30px] mt-[70px] flex h-full flex-col items-center justify-center gap-[30px] lg:ml-[500px]'>
      <div className='xxs:gap-7 flex w-full items-center justify-center gap-1 lg:hidden'>
        <h1 className='text-[24px] text-[#F5F5F5]'>Welcome to</h1>
        <img src='assets/images/LOGO1.png' />
      </div>
      {step === 0 && (
        <div className='xxs:w-[400px] mt-[20px] flex w-full flex-col items-center justify-center gap-[30px] rounded-xl border border-[#28373E] p-[30px] text-[#96B0BD] lg:mt-[50px]'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <p className='text-2xl text-[#F5F5F5]'>Type of Account</p>
            <p className=''>Select which account you want to create</p>
          </div>
          {accountType.map((item, key) => (
            <div
              className={`flex h-[110px] w-full cursor-pointer items-center gap-4 border border-none p-[15px] text-[#96B0BD] ${isIncludeAccount(key) && 'rounded-xl bg-[#1B272C]'}`}
              key={key}
              onClick={() => {
                handleAccounType(key);
              }}
            >
              <img alt='accountType' className='h-[24px] w-[24px]' src={item.avatar} />
              <div className='flex flex-col gap-1'>
                <p className='text-[18px]'>{item.title}</p>
                <p className='text-[14px] opacity-50'>{item.description}</p>
              </div>
            </div>
          ))}
          <button
            className='w-full bg-[#DC4F13] px-[30px] py-5 text-center text-[#F5F5F5]'
            onClick={() => handleSubmit()}
          >
            Conitnue
          </button>
        </div>
      )}
      {step === 1 && (
        <>
          <div className='signup_page xxs:w-[400px] flex w-full flex-col items-center justify-center gap-[15px] rounded-xl border border-[#28373E] p-[30px] text-[#96B0BD]'>
            <div className='flex flex-col items-center justify-center gap-4'>
              <p className='text-2xl text-[#F5F5F5]'>Sign Up</p>
              <p className=''>Enter Details Below</p>
            </div>
            <input
              className='w-full rounded-xl border border-[#28373E] bg-[#111] px-5 py-3 outline-none'
              onChange={(e) =>
                setPostData((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                onKeyDown(e);
              }}
              placeholder='Full name'
              value={postData.fullName}
            />
            <div className='flex w-full flex-col'>
              <input
                className='w-full rounded-xl border border-[#28373E] bg-[#111] px-5 py-3 outline-none'
                onChange={(e) =>
                  setPostData((prev) => ({
                    ...prev,
                    userName: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  onKeyDown(e);
                }}
                placeholder='Username'
                value={postData.userName}
              />
              {!postData.userName.match(/^[a-z0-9_-]+$/) && postData.userName ? (
                <span className='text-[14px] text-[#ef3f26]'>
                  You can only input with a~z, 0~9, _, -
                </span>
              ) : (
                isExists && (
                  <span className='text-[14px] text-[#ef3f26]'>This username already exists.</span>
                )
              )}
            </div>

            <div className='flex w-full flex-col'>
              <input
                className='w-full rounded-xl border border-[#28373E] bg-[#111] px-5 py-3 outline-none'
                onChange={(e) =>
                  setPostData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  onKeyDown(e);
                }}
                placeholder='Email address'
                value={postData.email}
              />
              {!validateEmail(postData.email) && postData.email && (
                <span className='text-[14px] text-[#ef3f26]'>
                  That format doesn&apos;t look right. Make sure there aren&apos;t any typos.
                </span>
              )}
            </div>
            <div className='flex w-full flex-col'>
              <input
                className='w-full rounded-xl border border-[#28373E] bg-[#111] px-5 py-3 outline-none'
                onChange={(e) =>
                  setPostData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  onKeyDown(e);
                }}
                placeholder='Create password'
                type='password'
                value={postData.password}
              />
              {postData.password.length < 8 && postData.password && (
                <span className='text-[14px] text-[#ef3f26]'>
                  The length of password should be more than 8 characters.
                </span>
              )}
            </div>
            <div className='flex w-full flex-col'>
              <input
                className='w-full rounded-xl border border-[#28373E] bg-[#111] px-5 py-3 outline-none'
                onChange={(e) =>
                  setPostData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  onKeyDown(e);
                }}
                placeholder='Confirm password'
                type='password'
                value={postData.confirmPassword}
              />
              {(postData.confirmPassword.length < 8 ||
                postData.confirmPassword !== postData.password) &&
                postData.confirmPassword && (
                  <span className='text-[14px] text-[#ef3f26]'>
                    The confirm password should be more than 8 characters and matched with your
                    password.
                  </span>
                )}
            </div>
            {!referrer && (
              <input
                className='w-full rounded-xl border border-[#28373E] bg-[#111] px-5 py-3 outline-none'
                onChange={(e) =>
                  setPostData((prev) => ({
                    ...prev,
                    referralUser: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  onKeyDown(e);
                }}
                placeholder='Referral user'
                value={postData.referralUser}
              />
            )}

            <div className='w-full'>
              <input
                className='accent-[#DC4F13]'
                onChange={(ev) =>
                  setPostData((prev) => ({
                    ...prev,
                    acceptPolicy: ev.target.checked,
                  }))
                }
                onKeyDown={(e) => {
                  onKeyDown(e);
                }}
                type='checkbox'
              />
              <span className='ml-2 text-[14px] text-[#F5F5F5]'>
                By creating an account you agree to Privacy Policy
              </span>
            </div>
            <button
              className='w-full bg-[#DC4F13] px-[30px] py-5 text-center text-[#F5F5F5]'
              onClick={() => onRegisterSubmit()}
            >
              Sign Up
            </button>
            <button
              className='w-full border border-[#DC4F13] px-[30px] py-5 text-center text-[#F5F5F5]'
              onClick={() => open()}
            >
              Continue With Wallet
            </button>
          </div>
          <div className='mt-[40px] text-base text-white'>
            <a>Already Have Account?</a>
            <span
              className='ml-2 cursor-pointer text-[#DC4F13]'
              onClick={() => router.push('/signin')}
            >
              Sign In
            </span>
          </div>
        </>
      )}
      {step === 2 && (
        <div className='xxs:w-[400px] mt-[200px] flex w-full flex-col items-center justify-center gap-[15px] rounded-xl border border-[#28373E] p-[30px] text-[#96B0BD]'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <p className='text-2xl text-[#F5F5F5]'>Verification</p>
            <p className=''>Enter your code to confirm your account</p>
          </div>
          <InputOTP maxLength={4} onChange={(value) => setOTPValue(value)} value={otp_value}>
            <InputOTPGroup className='gap-6'>
              <InputOTPSlot className='rounded-xl border border-[#526872]' index={0} />
              <InputOTPSlot className='rounded-xl border border-[#526872]' index={1} />
              <InputOTPSlot className='rounded-xl border border-[#526872]' index={2} />
              <InputOTPSlot className='rounded-xl border border-[#526872]' index={3} />
            </InputOTPGroup>
          </InputOTP>
          <button
            className='w-full bg-[#DC4F13] px-[30px] py-5 text-center text-[#F5F5F5]'
            onClick={() => handleOTPCode()}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default Signup;
