'use client';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import Link from 'next/link';
import { HiOutlineArrowDownLeft } from "react-icons/hi2";
import { TfiArrowTopRight } from "react-icons/tfi";
import Spline from '@splinetool/react-spline/next';


const staticTransactions = [
    { price: 401, status: "Received" },
    { price: 7.446, status: "Received" },
    { price: 401, status: "Received" },
    { price: 325, status: "Sent" },
    { price: 677, status: "Sent" },
    { price: 994, status: "Received" },
]

const CounterCard = ({ suffixe, totalNumber, text, id }) => { 
    return (
        <div className='bg-[#1B272C] flex flex-col gap-2 p-6 rounded-xl w-full counter_card' id={id}> 
            <div className='flex gap-1'>
                <p className='text-6xl text-white font-bold sl_counter'> {totalNumber} </p>
                <p className='text-6xl text-orange font-bold'> {suffixe} </p>
            </div>
            <p className='text-[#8599A5]'> {text} </p>
        </div>
    );
}
const TransactionCard = ({ price, status }) => {
    return (
        <div className='bg-[#1B272C] flex items-center gap-3 px-6 py-4 rounded-xl w-full transaction_card'> 
            <p className='text-white mr-auto text-[24px] font-semibold'> 
                {status == "Received" && '+ '} 
                {status == "Sent" && '- '} 
                $ {price} 
            </p>
            <p className={`
                ${status == "Received" && 'text-green-500 border-green-500'}
                ${status == "Sent" && 'text-red-500 border-red-500'}
                py-1 px-2 border text-sm rounded-[8px]
            `}> 
                {status} 
            </p>
            <p className='text-[#8599A5]'> 
                {status == "Received" && <HiOutlineArrowDownLeft size={23} />}
                {status == "Sent" && <TfiArrowTopRight size={23} />}
            </p>
        </div>
    );
}

const GetPaid = () => {
    const GetPaidRef = useRef(null);
    useLayoutEffect(() => {
        // Create GSAP animations
        let ctx = gsap.context(()=> {
            // Counter functionality
            gsap.from(".sl_counter", {
                innerText: 0,
                duration: 1, 
                stagger: .8,
                delay: 0.5,
                snap : {
                   innerText: 1
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
            })
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
            }) 
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
            })

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
                    scrub: 1
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
            }
            )
        }, GetPaidRef);
    
        return ()=> ctx.revert();
    }, []);

  return (
    <div className='w-full py-96 relative' ref={GetPaidRef}>
      <div className='max-w-3xl mx-auto flex flex-col gap-6'>
        <div className='flex gap-3 bg-[#10191D] p-2 rounded-xl relative z-10' id='counter_cards'>
            <CounterCard 
                suffixe='M' 
                totalNumber={20} 
                text='Users'
                id="counter_card_1"
            />
            <CounterCard 
                suffixe='K+' 
                totalNumber={500} 
                text='Jobs'
                id="counter_card_2"
            />
            <CounterCard 
                suffixe='+' 
                totalNumber={100} 
                text='Partners'
                id="counter_card_3"
            />
        </div>
        <div className='flex items-center flex-nowrapx'>
            <div className='w-6/12 flex flex-col gap-3 bg-[#10191D] p-2 rounded-xl'>
                {staticTransactions.map((transaction, index) => (
                    <TransactionCard 
                        key={index}
                        price={transaction.price}
                        status={transaction.status}
                    />
                ))}
                <div className='bg-[linear-gradient(180deg,_transparent_0%,_#111111_100%)] h-full w-full absolute left-0 top-0 rounded-xl' />
            </div>
            <div className='w-7/12 relative z-10 flex flex-col gap-10'>
                <h2 className='text-white font-bold text-[130px] leading-none w-[110%] -ml-7 paid_crypto_heading'> Paid In Crypto </h2>
                <Link href="signup" className='cursor-pointer whitespace-nowrap rounded-2xl bg-[#DC4F13] px-14 py-4 text-center text-white transition hover:bg-[#c2440e] mobile:px-7 mobile:py-3 w-fit ml-auto' id='signup'>
                    Get Started
                </Link>
            </div>
        </div>
        <Spline
            className='pointer-events-none absolute bottom-0 left-0 translate-y-1/3 w-full z-0 opacity-50 '
            scene="https://prod.spline.design/pyaH7mDix3coO0yJ/scene.splinecode" 
        />
      </div>
    </div>
  )
}

export default GetPaid;
