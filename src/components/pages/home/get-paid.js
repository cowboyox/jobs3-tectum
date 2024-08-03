'use client';

import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import Link from 'next/link';
import { HiOutlineArrowDownLeft } from 'react-icons/hi2';
import { TfiArrowTopRight } from 'react-icons/tfi';
import Spline from '@splinetool/react-spline/next';
import api from '@/utils/api';
import { useCustomContext } from '@/context/ContextProvider';

const staticTransactions = [
  { price: 401, status: 'Received' },
  { price: 7.446, status: 'Received' },
  { price: 401, status: 'Received' },
  { price: 325, status: 'Sent' },
  { price: 677, status: 'Sent' },
  { price: 994, status: 'Received' },
];

const CounterCard = ({ suffixe, totalNumber, text, id }) => {
  return (
    <div className='counter_card flex w-full flex-col gap-2 rounded-xl bg-[#1B272C] p-6' id={id}>
      <div className='flex gap-1'>
        <p className='sl_counter text-6xl font-bold text-white'> {totalNumber} </p>
        <p className='text-6xl font-bold text-orange'> {suffixe} </p>
      </div>
      <p className='text-[#8599A5]'> {text} </p>
    </div>
  );
};
const TransactionCard = ({ price, status }) => {
  return (
    <div className='transaction_card flex w-full items-center gap-3 rounded-xl bg-[#1B272C] px-6 py-4'>
      <p className='mr-auto text-[24px] font-semibold text-white'>
        {status == 'Received' && '+ '}
        {status == 'Sent' && '- '}$ {price}
      </p>
      <p
        className={` ${status == 'Received' && 'border-green-500 text-green-500'} ${status == 'Sent' && 'border-red-500 text-red-500'} rounded-[8px] border px-2 py-1 text-sm`}
      >
        {status}
      </p>
      <p className='text-[#8599A5]'>
        {status == 'Received' && <HiOutlineArrowDownLeft size={23} />}
        {status == 'Sent' && <TfiArrowTopRight size={23} />}
      </p>
    </div>
  );
};

const GetPaid = () => {
  const GetPaidRef = useRef(null);
  const [usersLength, setUsersLength] = useState(0);
  const [gigsLength, setGigsLength] = useState(0);
  const auth = useCustomContext();
  const url = ['freelancer', 'employee', 'employer', 'client'];

  useLayoutEffect(() => {
    // Create GSAP animations
    let ctx = gsap.context(() => {
      // Counter functionality
      gsap.from('.sl_counter', {
        innerText: 0,
        duration: 1,
        stagger: 0.8,
        delay: 0.5,
        snap: {
          innerText: 1,
        },
        scrollTrigger: {
          trigger: '#counter_cards',
          start: 'top 90%',
        },
      });

      // Animate Counter Cards
      gsap.from('#counter_card_1', {
        y: 100,
        stagger: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: '#counter_card_1',
          scrub: true,
          start: 'top bottom',
          end: 'center 70%',
        },
      });
      gsap.from('#counter_card_2', {
        y: 100,
        stagger: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: '#counter_card_2',
          scrub: true,
          start: '40% bottom',
          end: 'center 70%',
        },
      });
      gsap.from('#counter_card_3', {
        y: 100,
        stagger: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: '#counter_card_3',
          scrub: true,
          start: '60% bottom',
          end: 'center 70%',
        },
      });

      // Animate Transaction Cards
      gsap.from('.transaction_card', {
        y: 30,
        translateZ: 100,
        stagger: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: '.transaction_card',
          scrub: true,
          start: 'top bottom',
          end: 'center 30%',
        },
      });

      // Animate Paid In Crypto
      SplitType.create('.paid_crypto_heading');
      gsap.from('.paid_crypto_heading .char', {
        y: 40,
        rotateX: 40,
        rotateY: -35,
        rotateZ: -15,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.paid_crypto_heading',
          start: 'top 70%',
          end: 'center 30%',
          scrub: 1,
        },
      });
      gsap.from('#signup', {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          start: 'top 70%',
          end: 'center 30%',
        },
      });
    }, GetPaidRef);

    return () => ctx.revert();
  }, []);

  useEffect(async () => {
    const data = await api.get(`/api/v1/user/get-users-length`);
    setUsersLength(data.data.usersLength);
    setGigsLength(data.data.gigsLength);
  }, []);

  return (
    <div className='relative w-full py-96 mobile:px-5 mobile:py-40' ref={GetPaidRef}>
      <div className='mx-auto flex max-w-3xl flex-col gap-6 mobile:gap-10'>
        <div
          className='relative z-10 flex gap-3 rounded-xl bg-[#10191D] p-2 mobile:flex-col'
          id='counter_cards'
        >
          {usersLength !== 0 && (
            <CounterCard
              suffixe={usersLength > 1000 ? (usersLength > 1000000 ? 'M' : 'K') : ''}
              totalNumber={
                usersLength > 1000
                  ? usersLength > 1000000
                    ? usersLength / 1000000
                    : usersLength / 1000
                  : usersLength
              }
              text='Users'
              id='counter_card_1'
            />
          )}
          {gigsLength !== 0 && (
            <CounterCard
              suffixe={gigsLength > 1000 ? (gigsLength > 1000000 ? 'M' : 'K') : ''}
              totalNumber={
                gigsLength > 1000
                  ? gigsLength > 1000000
                    ? gigsLength / 1000000
                    : gigsLength / 1000
                  : gigsLength
              }
              text='Jobs'
              id='counter_card_2'
            />
          )}
          <CounterCard suffixe='+' totalNumber={100} text='Partners' id='counter_card_3' />
        </div>
        <div className='flex-nowrapx flex items-center mobile:flex-col-reverse mobile:gap-5'>
          <div className='relative flex w-6/12 flex-col gap-3 rounded-xl bg-[#10191D] p-2 mobile:w-full'>
            {staticTransactions.map((transaction, index) => (
              <TransactionCard key={index} price={transaction.price} status={transaction.status} />
            ))}
            <div className='absolute left-0 top-0 h-full w-full rounded-xl bg-[linear-gradient(180deg,_transparent_0%,_#111111_100%)]' />
          </div>
          <div className='relative z-10 flex w-7/12 flex-col gap-10 mobile:w-full'>
            <h2 className='paid_crypto_heading -ml-7 w-[110%] text-[130px] font-bold leading-none text-white mobile:mx-auto mobile:w-3/4 mobile:text-center mobile:text-6xl'>
              {' '}
              Paid In Crypto{' '}
            </h2>
            <Link
              target='_parent'
              href={`${auth?.isAuthenticated ? `/dashboard/${url[auth?.user?.role[0]]}/home` : '/signin'}`}
              className='ml-auto w-fit cursor-pointer whitespace-nowrap rounded-2xl bg-[#DC4F13] px-14 py-4 text-center text-white transition hover:bg-[#c2440e] mobile:mx-auto mobile:px-7 mobile:py-3'
              id='signup'
            >
              Get Started
            </Link>
          </div>
        </div>
        <Spline
          className='pointer-events-none absolute bottom-0 left-0 z-0 w-full translate-y-1/3 opacity-50 mobile:-mb-28 mobile:!w-[200%] mobile:opacity-75'
          scene='https://prod.spline.design/pyaH7mDix3coO0yJ/scene.splinecode'
        />
      </div>
    </div>
  );
};

export default GetPaid;
