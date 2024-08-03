'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const MobileNav = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  }, [menuOpen]);

  return (
    <div className='flex items-center md:hidden'>
      <div className='flex rounded-[10px] bg-[#10191d] p-2'>
        <div
          className='relative flex h-8 w-8 cursor-pointer items-center justify-center'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div
            className={`absolute h-[2px] w-full rounded-full bg-white transition-transform duration-300 ease-in-out ${menuOpen ? 'rotate-45' : '-translate-y-1'}`}
            style={{ top: '50%', transformOrigin: 'center' }}
          />
          <div
            className={`absolute h-[2px] rounded-full bg-white transition-transform duration-300 ease-in-out ${menuOpen ? 'w-full -rotate-45' : 'w-3/4 translate-y-1'}`}
            style={{ top: '50%', transformOrigin: 'center', left: menuOpen ? '0' : '0' }}
          />
        </div>
      </div>
      <div
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col gap-10 bg-[#10191d] p-8 shadow-lg transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: '75vw', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)' }}
      >
        <img src='/assets/images/logo.svg' className='w-44 mobile:w-24' />
        <ul className='flex flex-col space-y-4 text-white'>
          {props.links.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className='text-base font-semibold uppercase text-[#828383] transition hover:text-white'
            >
              {item.title}
            </Link>
          ))}
        </ul>
        <div className='ml-auto flex w-auto gap-4'>
          <div className='w-full cursor-pointer whitespace-nowrap rounded-2xl border border-white px-4 py-4 text-center text-white transition hover:bg-white hover:text-black mobile:py-3'>
            Sign In
          </div>
          <div className='w-full cursor-pointer whitespace-nowrap rounded-2xl bg-[#DC4F13] px-4 py-4 text-center text-white transition hover:bg-[#c2440e] mobile:py-3'>
            Launch App
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
