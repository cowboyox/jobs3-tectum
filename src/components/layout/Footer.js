'use client';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import SplitType from 'split-type';

/*-------- Icons --------*/
import { GoArrowRight } from "react-icons/go";
import { TfiArrowTopRight } from "react-icons/tfi";

const Footer = () => {
  const footerRef = useRef(null);
  useLayoutEffect(() => {
      // Create GSAP animations
      let ctx = gsap.context(()=> {
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
          }
          )

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
          }
          )
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
  
      return ()=> ctx.revert();
  }, []);


  return (
    <footer className='flex flex-col gap-10 py-14 bg-[linear-gradient(180deg,_#111_0%,_#10191D_100%)]' ref={footerRef}>
      <div className='flex mobile:flex-col mobile:gap-4 justify-between'>
        <div className='flex flex-col gap-2'>
          <span className='text-[#F5F5F5] text-3xl mobile:text-center' id="subscribe_newsletter">Subscribe to our newsletter</span>
          <span className='text-[#6A828D] text-base mobile:text-center'>Features and news from JOBS3</span>
        </div>
        <form id='footer_form' className='relative h-12 w-[335px] mobile:w-full rounded-xl overflow-hidden border border-[#526872]'>
          <input placeholder='Email address' className='text-[#96B0BD] px-4 bg-transparent h-full w-full text-base' />
          <button type="submit" className='cursor-pointer rounded-xl bg-orange flex items-center justify-center text-center text-white transition absolute top-1/2 -translate-y-1/2 right-1 h-10 w-10'>
            <GoArrowRight size={15} />
          </button>
        </form>
      </div> 
      <div className='footerDivider h-[1px] w-full bg-[#1B272C]'></div>
      <div className='w-full flex mobile:flex-wrap'>
        <div className='flex flex-col gap-5 w-4/12 mobile:w-6/12'>
          <span className='text-orange text-xl'>Top Categories</span>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>Graphics & Design</Link>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>Marketing</Link>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>Video</Link>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>Writing & Translation</Link>
        </div>
        <div className='flex flex-col gap-5 w-4/12 mobile:w-6/12 mobile:pl-5'>
          <span className='text-orange text-xl'>Learn</span>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>Help & Support</Link>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>How to Post a Job</Link>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>How to Find an Employee</Link>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>How to Arrange a Portfolio</Link>
        </div>
        <div className='flex flex-col gap-5 w-4/12 mobile:w-6/12 mobile:pt-5'>
          <span className='text-orange text-xl'>About</span>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>Blog</Link>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>Privacy Policy</Link>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>Terms of Service</Link>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>Contact Sales</Link>
        </div>
        <div className='flex flex-col gap-5 w-4/12 mobile:w-6/12 mobile:pt-5 mobile:pl-5'>
          <span className='text-orange text-xl'>Socials</span>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>$THREE</Link>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>Medium</Link>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>YouTube</Link>
          <Link href='/' className='footer_link text-[#F5F5F5] opacity-75 hover:opacity-100 text-base mobile:text-sm'>YouTube</Link>
        </div>
      </div>
      <div className='footerDivider h-[1px] w-full bg-[#1B272C]'></div>
      <div className='flex justify-between'>
        <span className='text-[#6A828D] text-base mobile:text-sm'>© 2022-2024 / JOBS3  / All rights reserved</span>
        <Link href="signup" className='cursor-pointer whitespace-nowrap rounded-full bg-orange px-5 py-2 text-center text-white transition hover:bg-[#c2440e] w-fit flex items-center gap-2'>
          <TfiArrowTopRight size={20} /> Jobs3.io
        </Link>
      </div> 
    </footer>
  );
};

export default Footer;
