'use client';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import SplitType from 'split-type';

const ReferFirend = () => {
    const referFriendRef = useRef(null);
    useLayoutEffect(() => {
        // Create GSAP animations
        let ctx = gsap.context(()=> {
            // Animate Text
            SplitType.create('#refer_friend_heading');
            gsap.from('#refer_friend_heading .char', {
                y: 40,
                rotateX: 40,
                rotateY: -35,
                rotateZ: -15,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '#refer_friend_heading',
                    start: 'top 70%',
                    end: 'center 30%',
                    scrub: 1,
                },
            });
            gsap.from('#signup_link', {
                y: 30,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '#signup_link',
                    start: 'top 70%',
                    end: 'center 70%',
                    scrub: 1,
                },
            }
            )

            const refer_image = document.querySelectorAll('.refer_image');
            refer_image.forEach((img, index) => {
                gsap.from(img, {
                    x: index * -200,
                    duration: 1,
                    scrollTrigger: {
                        trigger: img,
                        start: 'top 70%',
                        end: 'center 70%',
                        scrub: 1,
                    },
                });
            });
        }, referFriendRef);
    
        return ()=> ctx.revert();
    }, []);


  return (
    <div className='w-[98%] ml-[1%] flex mobile:flex-col rounded-xl overflow-hidden' ref={referFriendRef}>
      <div className='w-3/4 mobile:w-full flex h-[500px] mobile:h-[250px] bg-orange'>
        <img src='/assets/images/refer-img-1.png' className='w-1/3 refer_image h-full md:-ml-6 object-cover relative z-0' />
        <img src='/assets/images/refer-img-2.png' className='w-1/3 refer_image h-full md:-ml-6 object-cover relative z-10' />
        <img src='/assets/images/refer-img-3.png' className='w-1/3 refer_image h-full md:-ml-6 object-cover relative z-20' />
      </div>
      <div className='w-1/4 mobile:w-full flex flex-col gap-6 justify-center min-h-full bg-orange mobile:py-7'>
        <h2 
            className='text-[150px] mobile:text-[70px] mobile:text-center font-bold text-white w-[150%] md:-translate-x-1/3 mobile:w-3/4 mobile:mx-auto relative z-30 leading-none' 
            id='refer_friend_heading'
        > 
            Refer a friend 
        </h2>
        <Link href="signup" className='cursor-pointer whitespace-nowrap rounded-2xl bg-[#111] px-14 py-4 text-center text-white transition hover:bg-[#c2440e] mobile:px-7 mobile:py-3 w-fit ml-auto mr-5 mobile:mx-auto' id='signup_link'>
            Get Started
        </Link>
      </div>
    </div>
  )
}

export default ReferFirend
