'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { BsInstagram } from 'react-icons/bs';
import { FaCheck, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { GoArrowRight } from 'react-icons/go';
import { TbArrowUpRight } from 'react-icons/tb';

import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/ContextProvider';
import api from '@/utils/api';

const Referral = () => {
  const [emailStr, setEmailStr] = useState('');
  const auth = useCustomContext();
  const [copySuccess, setCopySuccess] = useState('');

  const { toast } = useToast();

  const isValidateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleInvite = () => {
    const emails = emailStr.split(',').map((item) => item.trim());

    emails.map(async (email) => {
      if (isValidateEmail(email)) {
        await api
          .post(`/api/v1/profile/inviteFriendByEmail`, {
            email,
            referralCode: auth?.user?.referralCode,
          })
          .then(() => {
            toast({
              className:
                'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
              description: <h3>Successfully invited {email}</h3>,
              title: <h1 className='text-center'>Success</h1>,
              variant: 'default',
            });
          })
          .catch((err) => {
            toast({
              className:
                'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
              description: <h3>Invitation failed for {email}</h3>,
              title: <h1 className='text-center'>Error</h1>,
              variant: 'destructive',
            });
          });
      }
    });
  };

  const handleCopy = async () => {
    try {
      if (auth?.user?.referralCode && auth?.isAuthenticated) {
        await navigator.clipboard.writeText(
          `https://jobs3.io/signup?referralCode=${auth?.user?.referralCode}`
        );

        setCopySuccess('Text copied to clipboard!');
        setTimeout(() => setCopySuccess(''), 2000);
      }
    } catch (err) {
      // setCopySuccess('Failed to copy text');
    }
  };

  return (
    <div className='mt-16 flex w-full flex-col items-center justify-center gap-4 p-0 md:mt-24'>
      <Image
        alt='referral'
        className='w-[200vw] max-w-[200vw] md:w-[120vw] md:max-w-[120vw]'
        height={1569}
        src='/assets/dashboard-media/referral.png'
        width={5409}
      />
      <div className='-mt-28 flex w-full flex-col justify-center gap-4 rounded-xl bg-[#10191D] p-16 text-center md:-mt-52 md:w-[700px]'>
        <div className='text-6xl font-bold text-[#F5F5F5]'>
          $4000 for referring friends to <span className='text-[#DC4F13]'>JOBS3</span>
        </div>
        <div className='text-2xl text-[#A0B4C0]'>Be part of the referral competition</div>
        <div className='flex h-24 w-full items-center justify-center mobile:p-2'>
          <div className='mx-auto flex h-14 w-full max-w-[684px] items-center gap-4 overflow-hidden rounded-2xl border border-[#526872] bg-[#28373E]'>
            <textarea
              className='h-full w-full resize-none content-center bg-transparent px-4 outline-none placeholder:text-[#96B0BD] disabled:cursor-not-allowed'
              disabled={!auth?.isAuthenticated}
              onChange={(e) => setEmailStr(e.target.value)}
              placeholder='Add Email addresses (separate with commas)'
              value={emailStr}
            />
            <button
              className='group h-full rounded-e-xl rounded-s-none bg-[#dc4f14] p-4 transition disabled:cursor-not-allowed disabled:bg-gray-500'
              disabled={!auth?.isAuthenticated}
              onClick={handleInvite}
            >
              <GoArrowRight className='h-full w-full fill-white' />
            </button>
          </div>
        </div>
        <div class='flex items-center space-x-8'>
          <div class='flex-grow border-t text-[#A0B4C0]'></div>
          <div className='text-base text-[#A0B4C0]'>Or share your personal referral link</div>
          <div class='flex-grow border-t text-[#A0B4C0]'></div>
        </div>
        <div className='flex h-24 w-full items-center justify-center mobile:p-2'>
          <div className='mx-auto flex h-14 w-full max-w-[684px] items-center gap-4 overflow-hidden rounded-2xl border border-[#646667] bg-[#28373E]'>
            <textarea
              className='h-full w-full resize-none content-center bg-transparent px-4 outline-none placeholder:text-[#96B0BD] disabled:cursor-not-allowed'
              disabled={!auth?.isAuthenticated}
              placeholder='Jobs3.io/link'
              value={
                auth?.user?.referralCode && auth?.isAuthenticated
                  ? `https://jobs3.io/signup?referralCode=${auth?.user?.referralCode}`
                  : ''
              }
            />
            <button
              className='group h-full rounded-e-xl rounded-s-none bg-[#dc4f14] p-4 transition disabled:cursor-not-allowed disabled:bg-gray-500'
              disabled={!auth?.isAuthenticated}
              onClick={handleCopy}
            >
              {copySuccess ? (
                <div className='flex h-full w-full flex-row items-center gap-2'>
                  <FaCheck className='fill-white' />
                  <p className='text-white'>Copied!</p>
                </div>
              ) : (
                <BiCopy className='h-full w-full fill-white' />
              )}
            </button>
          </div>
        </div>

        <div className='flex flex-row justify-center gap-4'>
          <Link href={`https://web.whatsapp.com`} target='_blank'>
            <FaWhatsapp className='text-2xl' />
          </Link>
          <Link href={`https://www.instagram.com/`} target='_blank'>
            <BsInstagram className='text-2xl' />
          </Link>
          <Link href={`https://X.com/`} target='_blank'>
            <FaXTwitter className='text-2xl' />
          </Link>
          <Link href={`https://web.telegram.org//`} target='_blank'>
            <FaTelegramPlane className='text-2xl' />
          </Link>
        </div>
      </div>
      <div className='flex w-full flex-row justify-center gap-4 rounded-xl bg-[#10191D] p-8 text-center md:w-[700px]'>
        <div className='h-14 w-14 rounded-full bg-[#1B272C] p-4'>
          <svg
            fill='none'
            height='25'
            viewBox='0 0 24 25'
            width='24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M18 19.4811H17.24C16.44 19.4811 15.68 19.7911 15.12 20.3511L13.41 22.0411C12.63 22.8111 11.36 22.8111 10.58 22.0411L8.87 20.3511C8.31 19.7911 7.54 19.4811 6.75 19.4811H6C4.34 19.4811 3 18.1511 3 16.5111V5.59109C3 3.95109 4.34 2.62109 6 2.62109H18C19.66 2.62109 21 3.95109 21 5.59109V16.5011C21 18.1411 19.66 19.4811 18 19.4811Z'
              stroke='#96B0BD'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-miterlimit='10'
              stroke-width='1.5'
            />
            <path
              d='M12.0701 9.5709C12.0301 9.5709 11.97 9.5709 11.92 9.5709C10.87 9.5309 10.04 8.6809 10.04 7.6209C10.04 6.5409 10.9101 5.6709 11.9901 5.6709C13.0701 5.6709 13.9401 6.5509 13.9401 7.6209C13.9501 8.6809 13.1201 9.5409 12.0701 9.5709Z'
              stroke='#96B0BD'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='1.5'
            />
            <path
              d='M9.24994 12.5811C7.91994 13.4711 7.91994 14.9211 9.24994 15.8111C10.7599 16.8211 13.2399 16.8211 14.7499 15.8111C16.0799 14.9211 16.0799 13.4711 14.7499 12.5811C13.2399 11.5811 10.7699 11.5811 9.24994 12.5811Z'
              stroke='#96B0BD'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='1.5'
            />
          </svg>
        </div>

        <div className='flex flex-1 flex-col items-start gap-1 self-center'>
          <div className='text-[#F5F5F5]'>Sign Up</div>
          <div className='text-start text-sm text-[#96B0BD]'>
            Make sure you have a Jobs3 account. if not, sign up now and get ready to start earning.
          </div>
        </div>
      </div>
      <div className='flex w-full flex-row justify-center gap-4 rounded-xl bg-[#10191D] p-8 text-center md:w-[700px]'>
        <div className='h-14 w-14 rounded-full bg-[#1B272C] p-4'>
          <svg
            fill='none'
            height='25'
            viewBox='0 0 25 25'
            width='25'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M18.666 20.1211H14.666'
              stroke='#96B0BD'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='1.5'
            />
            <path
              d='M16.666 22.1211V18.1211'
              stroke='#96B0BD'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='1.5'
            />
            <path
              d='M12.3261 11.4911C12.2261 11.4811 12.1061 11.4811 11.9961 11.4911C9.61611 11.4111 7.72611 9.46109 7.72611 7.06109C7.71611 4.61109 9.70611 2.62109 12.1561 2.62109C14.6061 2.62109 16.5961 4.61109 16.5961 7.06109C16.5961 9.46109 14.6961 11.4111 12.3261 11.4911Z'
              stroke='#96B0BD'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='1.5'
            />
            <path
              d='M12.1561 22.4313C10.3361 22.4313 8.52605 21.9713 7.14605 21.0513C4.72605 19.4313 4.72605 16.7913 7.14605 15.1813C9.89605 13.3413 14.4061 13.3413 17.1561 15.1813'
              stroke='#96B0BD'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='1.5'
            />
          </svg>
        </div>
        <div className='flex flex-1 flex-col items-start gap-1 self-center'>
          <div className='text-[#F5F5F5]'>Invite people & Friends</div>
          <div className='text-start text-sm text-[#96B0BD]'>
            Refer people to Jobs3 any way you want, with your own personal referral link.
          </div>
        </div>
      </div>
      <div className='flex w-full flex-row justify-center gap-4 rounded-xl bg-[#10191D] p-8 text-center md:w-[700px]'>
        <div className='h-14 w-14 rounded-full bg-[#1B272C] p-4'>
          <svg
            fill='none'
            height='25'
            viewBox='0 0 25 25'
            width='25'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M19.167 13.271V16.971C19.167 20.091 16.257 22.621 12.667 22.621C9.07699 22.621 6.16699 20.091 6.16699 16.971V13.271C6.16699 16.391 9.07699 18.621 12.667 18.621C16.257 18.621 19.167 16.391 19.167 13.271Z'
              stroke='#96B0BD'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='1.5'
            />
            <path
              d='M19.167 8.2711C19.167 9.1811 18.917 10.0211 18.477 10.7411C17.407 12.5011 15.207 13.6211 12.667 13.6211C10.127 13.6211 7.92699 12.5011 6.85699 10.7411C6.41699 10.0211 6.16699 9.1811 6.16699 8.2711C6.16699 6.7111 6.89699 5.30109 8.06699 4.28109C9.24699 3.25109 10.867 2.62109 12.667 2.62109C14.467 2.62109 16.087 3.2511 17.267 4.2711C18.437 5.3011 19.167 6.7111 19.167 8.2711Z'
              stroke='#96B0BD'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='1.5'
            />
            <path
              d='M19.167 8.2711V13.2711C19.167 16.3911 16.257 18.6211 12.667 18.6211C9.07699 18.6211 6.16699 16.3911 6.16699 13.2711V8.2711C6.16699 5.1511 9.07699 2.62109 12.667 2.62109C14.467 2.62109 16.087 3.2511 17.267 4.2711C18.437 5.3011 19.167 6.7111 19.167 8.2711Z'
              stroke='#96B0BD'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='1.5'
            />
          </svg>
        </div>

        <div className='flex flex-1 flex-col items-start gap-1 self-center'>
          <div className='text-[#F5F5F5]'>Earn Rewards</div>
          <div className='text-start text-sm text-[#96B0BD]'>
            How It Works, Getting Started, Fees & Protection
          </div>
        </div>
      </div>

      <div className='flex w-full flex-col justify-center gap-4 rounded-xl bg-[#10191D] p-8 text-center md:w-[700px]'>
        <div className='text-3xl font-bold text-[#F5F5F5]'>Get your rewards now!</div>
        <div className='text-sm text-[#A0B4C0]'>
          Be part of the refferal competition with a total prize pool $4,000
        </div>

        <div className='flex flex-row justify-center'>
          <Image
            alt='referral_1'
            className='w-[60px]'
            height={240}
            src='/assets/dashboard-media/referral_1.png'
            width={240}
          />
          <Image
            alt='referral_2'
            className='-ml-2 w-[60px]'
            height={240}
            src='/assets/dashboard-media/referral_2.png'
            width={240}
          />
          <Image
            alt='referral_3'
            className='-ml-2 w-[60px]'
            height={240}
            src='/assets/dashboard-media/referral_3.png'
            width={240}
          />
          <Image
            alt='referral_4'
            className='-ml-2 w-[60px]'
            height={240}
            src='/assets/dashboard-media/referral_4.png'
            width={240}
          />
          <Image
            alt='referral_5'
            className='-ml-2 w-[60px]'
            height={240}
            src='/assets/dashboard-media/referral_5.png'
            width={240}
          />
          <button className='-ml-2 w-[60px] rounded-full bg-[#dc4f14] p-4'>
            <TbArrowUpRight className='h-full w-full' />
          </button>
        </div>
        <div className='flex w-full justify-center'>
          <button className='w-full rounded-xl bg-[#dc4f14] p-4 transition'>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Referral;
