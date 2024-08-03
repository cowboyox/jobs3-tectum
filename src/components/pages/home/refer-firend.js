'use client';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import SplitType from 'split-type';

const ReferFirend = () => {
  const referFriendRef = useRef(null);
  useLayoutEffect(() => {
    // Create GSAP animations
    let ctx = gsap.context(() => {
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
      });

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

    return () => ctx.revert();
  }, []);

  return (
    <div
      className='ml-[1%] flex w-[98%] overflow-hidden rounded-xl mobile:flex-col'
      ref={referFriendRef}
    >
      <div className='flex h-[500px] w-3/4 bg-orange mobile:h-[250px] mobile:w-full'>
        <img
          src='/assets/images/refer-img-1.png'
          className='refer_image relative z-0 h-full w-1/3 object-cover md:-ml-6'
        />
        <img
          src='/assets/images/refer-img-2.png'
          className='refer_image relative z-10 h-full w-1/3 object-cover md:-ml-6'
        />
        <img
          src='/assets/images/refer-img-3.png'
          className='refer_image relative z-20 h-full w-1/3 object-cover md:-ml-6'
        />
      </div>
      <div className='flex min-h-full w-1/4 flex-col justify-center gap-6 bg-orange mobile:w-full mobile:py-7'>
        <h2
          className='relative z-30 w-[150%] text-[150px] font-bold leading-none text-white md:-translate-x-1/3 mobile:mx-auto mobile:w-3/4 mobile:text-center mobile:text-[70px]'
          id='refer_friend_heading'
        >
          Refer a friend
        </h2>
        <Link
          href='signup'
          className='ml-auto mr-5 w-fit cursor-pointer whitespace-nowrap rounded-2xl bg-[#111] px-14 py-4 text-center text-white transition hover:bg-[#c2440e] mobile:mx-auto mobile:px-7 mobile:py-3'
          id='signup_link'
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default ReferFirend;
