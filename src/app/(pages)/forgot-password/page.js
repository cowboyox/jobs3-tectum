'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useAccount } from 'wagmi';

import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/ContextProvider';
import { useDebounce } from '@/hooks/useDebounce';
import { useVerifyUsername } from '@/hooks/useVerifyUsername';
import { USER_ROLE } from '@/utils/constants';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const ForgotPassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useCustomContext();
  const [step, setStep] = useState(0);
  // const [referrer, setReferrer] = useState('');
  const [otp_value, setOTPValue] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const sendMail = async () => {
    if (!validateEmail(email)) {
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Please check your email.</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
    console.log('arrived here!');
    try {
      const verified = await auth.sendOTP(email);
      if (!verified) {
        // onSwitchPopup('Verification');
        setStep(1);
      }
    } catch (error) {
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Email already Exists!</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
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
      const state = await auth.verifyOTPPassword(otp_value);
      console.log('arrived here!!!');
      console.log('state->', state);
      if (state) setStep(2);
      else
        return toast({
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3 className='text-center'>Invalid OTP code.</h3>,
          title: <h1 className='text-center'>Error</h1>,
          variant: 'destructive',
        });
    } catch (err) {
      console.error('error', err);
    }
  };
  const handleChangePassword = async () => {
    if (password !== confirmPassword || password.length < 8 || confirmPassword.length < 8) {
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Please enter password correctly.</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
    try {
      await auth.changePassword({ password: password, otp: otp_value });
      console.log('change password arrived');
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
      else router.push(`/dashboard/${accountTypeName}/profile`);
    } catch (err) {
      console.error('error', err);
    }
  };
  const onKeyDown = (e) => {
    if (e.key == 'Enter') {
      if(step === 0){
        sendMail();
      }
      else if(step === 1){
        handleOTPCode();
      }
      else if(step === 2){
        handleChangePassword();
      }
    }
  };

  return (
    <div className='mx-[30px] mt-[70px] flex h-full flex-col items-center justify-center gap-[30px] xxs:mx-0 lg:ml-[500px]'>
      <div className='flex w-full items-center justify-center gap-1 xxs:gap-7 lg:hidden'>
        <h1 className='text-[24px] text-[#F5F5F5]'>Welcome to</h1>
        <img src='assets/images/LOGO1.png' />
      </div>
      {step === 0 && (
        <div className='mt-[200px] flex w-full flex-col items-center justify-center gap-[15px] rounded-xl border border-[#28373E] p-[30px] text-[#96B0BD] xxs:w-[400px]'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <p className='text-2xl text-[#F5F5F5]'>Forgot password?</p>
            <p className=''>We’ll help you reset it and get back on track</p>
          </div>
          <div className='flex w-full flex-col'>
            <input
              className='w-full rounded-xl border border-[#28373E] bg-[#111] px-5 py-3 outline-none'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              onKeyDown={(e) => {
                onKeyDown(e);
              }}
            />
            {!validateEmail(email) && email && (
              <span className='text-[14px] text-[#ef3f26]'>
                That format doesn&apos;t look right. Make sure there aren&apos;t any typos.
              </span>
            )}
          </div>
          <button
            className='w-full bg-[#DC4F13] px-[30px] py-5 text-center text-[#F5F5F5]'
            onClick={() => sendMail()}
          >
            Continue
          </button>
        </div>
      )}
      {step === 1 && (
        <div className='mt-[200px] flex w-full flex-col items-center justify-center gap-[15px] rounded-xl border border-[#28373E] p-[30px] text-[#96B0BD] xxs:w-[400px]'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <p className='text-2xl text-[#F5F5F5]'>Verification</p>
            <p className=''>Enter your code to confirm your account</p>
          </div>
          <InputOTP maxLength={4} value={otp_value} onChange={(value) => setOTPValue(value)} onKeyDown={(e) => {
            onKeyDown(e);
          }}>
            <InputOTPGroup className='gap-6'>
              <InputOTPSlot index={0} className='rounded-xl border border-[#526872]' />
              <InputOTPSlot index={1} className='rounded-xl border border-[#526872]' />
              <InputOTPSlot index={2} className='rounded-xl border border-[#526872]' />
              <InputOTPSlot index={3} className='rounded-xl border border-[#526872]' />
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
      {step === 2 && (
        <div className='mt-[200px] flex w-full flex-col items-center justify-center gap-[15px] rounded-xl border border-[#28373E] p-[30px] text-[#96B0BD] xxs:w-[400px]'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <p className='text-2xl text-[#F5F5F5]'>New password</p>
            <p className=''>Enter your new password</p>
          </div>
          <div className='flex w-full flex-col'>
            <input
              className='w-full rounded-xl border border-[#28373E] bg-[#111] px-5 py-3 outline-none'
              placeholder='Create password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              onKeyDown={(e) => {
                onKeyDown(e);
              }}
            />
            {password.length < 8 && password && (
              <span className='text-[14px] text-[#ef3f26] w-full'>
                The length of password should be more than 8 characters.
              </span>
            )}
          </div>
          <div className='flex w-full flex-col'>
            <input
              className='w-full rounded-xl border border-[#28373E] bg-[#111] px-5 py-3 outline-none'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type='password'
              onKeyDown={(e) => {
                onKeyDown(e);
              }}
            />
            {(confirmPassword.length < 8 || confirmPassword !== password) && confirmPassword && (
              <span className='text-[14px] text-[#ef3f26] w-full'>
                The confirm password should be more than 8 characters and matched with your
                password.
              </span>
            )}
          </div>
          <button
            className='w-full bg-[#DC4F13] px-[30px] py-5 text-center text-[#F5F5F5]'
            onClick={() => handleChangePassword()}
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
