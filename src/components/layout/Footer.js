'use client';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import SplitType from 'split-type';

/*-------- Icons --------*/
import { GoArrowRight } from 'react-icons/go';
import { TfiArrowTopRight } from 'react-icons/tfi';

const Footer = () => {
  const footerRef = useRef(null);
  useLayoutEffect(() => {
    // Create GSAP animations
    let ctx = gsap.context(() => {
      // Animate Text
      SplitType.create('#asdf');
      gsap.from('#signup_asdf', {
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

      // subscribe to newsletter
      gsap.from('#subscribe_newsletter', {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '#subscribe_newsletter',
          start: 'top 90%',
          end: 'center 70%',
          scrub: 1,
        },
      });
      gsap.from('#footer_form', {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '#footer_form',
          start: 'top 90%',
          end: 'center 70%',
          scrub: 1,
        },
      });

      // footer deviders
      const footerDivider = document.querySelectorAll('.footerDivider');
      footerDivider.forEach((divider) => {
        gsap.from(divider, {
          width: 0,
          duration: 1,
          scrollTrigger: {
            trigger: divider,
            start: 'top 70%',
            end: 'center 70%',
            scrub: 1,
          },
        });
      });

      // footer links
      const footerLinks = document.querySelectorAll('.footer_link');
      footerLinks.forEach((link, index) => {
        SplitType.create(link);
        gsap.from(link.querySelectorAll('.char'), {
          x: -20,
          opacity: 0,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: link,
            start: 'top bottom',
            end: 'center 70%',
            scrub: 1,
          },
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      className='flex flex-col gap-10 bg-[linear-gradient(180deg,_#111_0%,_#10191D_100%)] py-14'
      ref={footerRef}
    >
      <div className='flex justify-between mobile:flex-col mobile:gap-4'>
        <div className='flex flex-col gap-2'>
          <span className='text-3xl text-[#F5F5F5] mobile:text-center' id='subscribe_newsletter'>
            Subscribe to our newsletter
          </span>
          <span className='text-base text-[#6A828D] mobile:text-center'>
            Features and news from JOBS3
          </span>
        </div>
        <form
          id='footer_form'
          className='relative h-12 w-[335px] overflow-hidden rounded-xl border border-[#526872] mobile:w-full'
        >
          <input
            placeholder='Email address'
            className='h-full w-full bg-transparent px-4 text-base text-[#96B0BD]'
          />
          <button
            type='submit'
            className='absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl bg-orange text-center text-white transition'
          >
            <GoArrowRight size={15} />
          </button>
        </form>
      </div>
      <div className='footerDivider h-[1px] w-full bg-[#1B272C]' />
      <div className='flex w-full mobile:flex-wrap'>
        <div className='flex w-4/12 flex-col gap-5 mobile:w-6/12'>
          <span className='text-xl text-orange'>Top Categories</span>
          <Link
            href='/'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            Graphics & Design
          </Link>
          <Link
            href='/'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            Marketing
          </Link>
          <Link
            href='/'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            Video
          </Link>
          <Link
            href='/'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            Writing & Translation
          </Link>
        </div>
        <div className='flex w-4/12 flex-col gap-5 mobile:w-6/12 mobile:pl-5'>
          <span className='text-xl text-orange'>Learn</span>
          <Link
            href='/help'
            target='_parent'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            Help & Support
          </Link>
          <Link
            href='/'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            How to Post a Job
          </Link>
          <Link
            href='/'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            How to Find an Employee
          </Link>
          <Link
            href='/'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            How to Arrange a Portfolio
          </Link>
        </div>
        <div className='flex w-4/12 flex-col gap-5 mobile:w-6/12 mobile:pt-5'>
          <span className='text-xl text-orange'>About</span>
          <Link
            href='/blog'
            target='_parent'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            Blog
          </Link>
          <Link
            href='/'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            Privacy Policy
          </Link>
          <Link
            href='/'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            Terms of Service
          </Link>
          <Link
            href='/'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            Contact Sales
          </Link>
        </div>
        <div className='flex w-4/12 flex-col gap-5 mobile:w-6/12 mobile:pl-5 mobile:pt-5'>
          <span className='text-xl text-orange'>Socials</span>
          <Link
            href='/'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            $THREE
          </Link>
          <Link
            href='/'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            Medium
          </Link>
          <Link
            href='/'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            YouTube
          </Link>
          <Link
            href='/'
            className='footer_link text-base text-[#F5F5F5] opacity-75 hover:opacity-100 mobile:text-sm'
          >
            YouTube
          </Link>
        </div>
      </div>
      <div className='footerDivider h-[1px] w-full bg-[#1B272C]' />
      <div className='flex justify-between'>
        <span className='text-base text-[#6A828D] mobile:text-sm'>
          © 2022-2024 / JOBS3 / All rights reserved
        </span>
        <Link
          href='signup'
          className='flex w-fit cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-orange px-5 py-2 text-center text-white transition hover:bg-[#c2440e]'
        >
          <TfiArrowTopRight size={20} /> Jobs3.io
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
