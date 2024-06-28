'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useAccount } from 'wagmi';

import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/use-custom';
import { useDebounce } from '@/hooks/useDebounce';
import { useVerifyUsername } from '@/hooks/useVerifyUsername';
import { USER_ROLE } from '@/utils/constants';

const Signin = () => {
  const router = useRouter();
  const [postData, setPostData] = useState({
    fullName: '',
    email: '',
    password: '',
    keepLogin: false,
  });
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const { open } = useWeb3Modal();
  const auth = useCustomContext();
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

  const handleLogin = async () => {
    if (
      !postData.email ||
      !postData.password ||
      postData.password.length < 8 ||
      !validateEmail(postData.email)
    ) {
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Please check your infomation.</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }

    try {
      await auth.login({ email: postData.email, password: postData.password }).then((data) => {
        let accountType = data.role[0];
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
      });
      // Dynamic redirect
    } catch (err) {
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Please sign up first.</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='mx-[30px] mt-[70px] flex h-full flex-col items-center justify-center gap-[30px] xxs:mx-0 lg:ml-[500px]'>
      <div className='flex w-full items-center justify-center gap-1 xxs:gap-7 lg:hidden'>
        <h1 className='text-[24px] text-[#F5F5F5]'>Welcome to</h1>
        <img src='assets/images/LOGO1.png' />
      </div>
      <div className='flex w-full flex-col items-center justify-center gap-[25px] rounded-xl border border-[#28373E] p-[30px] text-[#96B0BD] xxs:w-[400px]'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <p className='text-2xl text-[#F5F5F5]'>Sign In</p>
          <p className=''>Enter Details Below</p>
        </div>
        <input
          className='w-full rounded-xl border border-[#28373E] bg-[#111] px-5 py-3 outline-none'
          placeholder='Full name'
          value={postData.fullName}
          onChange={(e) =>
            setPostData((prev) => ({
              ...prev,
              fullName: e.target.value,
            }))
          }
        />
        <div className='flex w-full flex-col'>
          <input
            className='w-full rounded-xl border border-[#28373E] bg-[#111] px-5 py-3 outline-none'
            placeholder='Email address'
            value={postData.email}
            onChange={(e) =>
              setPostData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
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
            placeholder='Confirm password'
            value={postData.password}
            onChange={(e) =>
              setPostData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            type='password'
          />
          {postData.password.length < 8 && postData.password && (
            <span className='text-[14px] text-[#ef3f26]'>
              The length of password should be more than 8 characters.
            </span>
          )}
        </div>
        <button
          className='w-full bg-[#DC4F13] px-[30px] py-5 text-center text-[#F5F5F5]'
          onClick={() => handleLogin()}
        >
          Log In
        </button>
        <div className='flex w-full items-center justify-center'>
          <input
            onChange={(ev) =>
              setPostData((prev) => ({
                ...prev,
                keepLogin: ev.target.checked,
              }))
            }
            type='checkbox'
            className='accent-[#DC4F13]'
          />
          <span className='ml-2 text-[14px] text-[#F5F5F5]'>Keep me logged in</span>
        </div>
        <button
          className='w-full border border-[#DC4F13] px-[30px] py-5 text-center text-[#F5F5F5]'
          onClick={() => open()}
        >
          Continue With Wallet
        </button>
        <div className='flex w-full flex-row items-center gap-3'>
          <hr className='w-full text-[#28373E]' />
          <p className='w-full'>or Sign In With</p>
          <hr className='w-full text-[#28373E]' />
        </div>
        <div className='flex w-full items-center justify-center gap-[19px]'>
          <img
            src='assets/icons/signin/google.png'
            alt='google'
            className='h-6 w-6 cursor-pointer'
          />
          <img
            src='assets/icons/signin/facebook.png'
            alt='facebook'
            className='h-6 w-6 cursor-pointer'
          />
        </div>
      </div>

      <div className='mt-[40px] text-base text-white'>
        <span className='mr-2 text-[#DC4F13]'>
          <a href='#'>Forgot Password</a>
        </span>
        {'Don\'t Have Account?'}
        <span className='ml-2 cursor-pointer text-[#DC4F13]' onClick={() => router.push('/signup')}>
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default Signin;
