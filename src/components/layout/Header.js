import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useDisconnect } from 'wagmi';

import { usePopupFunctions } from '../popups/popups';

import { useCustomContext } from '@/context/ContextProvider';
import { useRouter } from 'next/navigation';
// Dependencies

// Components

const Header = () => {
  const router = useRouter()
  const url = ['freelancer','employee','employer','client',]
  // get current path
  const [user, setUser] = useState({
    email: '',
    name: 'no-user',
    role: [0],
    verified: false,
  });
  useEffect(() => {
    let tmp = localStorage.getItem('jobs_2024_token');
    if (tmp) {
      setUser(JSON.parse(tmp).data.user);
    }
  }, []);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  const { openPopup, renderPopup } = usePopupFunctions();

  const mobileMenu = useRef();
  const auth = useCustomContext();
  const { disconnect } = useDisconnect();

  const handleMenuClick = (status) => {
    if (status == true) {
      gsap.to(mobileMenu.current, {
        duration: 0.5,
        translateX: 0,
      });
    }

    if (status == false) {
      gsap.to(mobileMenu.current, {
        duration: 0.5,
        translateX: '-100%',
      });
    }
  };
  const handleSignOut = () => {
    disconnect();
    auth.signOut();
    location.href = '/';
  }; 

  return (
    <>
      {renderPopup()}

      <header className='main_header'>
        <div className='container'>
          <Link className='main_logo' href={'/'}>
            <Image
              alt='Jobs3'
              className='min-w-[133px]'
              height={50}
              src={'/assets/images/logo.svg'}
              width={133}
            />
          </Link>
          <button className='menu_bars' onClick={() => handleMenuClick(true)}>
            <Image alt='' height={40} src={'/assets/images/menu_icon.svg'} width={40} />
          </button>
          <nav>
            {/* add "active" class if it's current path */}
            <Link 
              className={`text-[#F5F5F5] opacity-50 hover:opacity-100 uppercase text-base ${currentPath === '/' ? 'active' : ''}`} 
              href='/'>
              HOME
            </Link>
            <Link 
              className={`text-[#F5F5F5] opacity-50 hover:opacity-100 uppercase text-base ${currentPath === '/blog' ? 'active' : ''}`} 
              href='/blog'>
              BLOG
            </Link>
            <Link 
              className={`text-[#F5F5F5] opacity-50 hover:opacity-100 uppercase text-base ${currentPath} `} 
              href='#'>
              $THREE
            </Link> 
          </nav>
          <div className='right_side'>
            {!auth?.isAuthenticated ? (
              <Link
                className='ml-10 cursor-pointer whitespace-nowrap rounded-2xl bg-[#DC4F13] px-14 py-4 text-center text-white transition hover:bg-[#c2440e] mobile:px-7 mobile:py-3'
                href='/signup'
              >
                Sign Up
              </Link>
            ) : (
              <div className='flex gap-2'>
                <Link
                  className='ml-10 cursor-pointer whitespace-nowrap rounded-2xl bg-[#DC4F13] px-14 py-4 text-center text-white transition hover:bg-[#c2440e] mobile:px-7 mobile:py-3'
                  href={`/dashboard/${url[auth?.user?.role[0]]}/home`}
                  // onClick={() => {console.log('about Auth > ',auth);}}
                >
                  Launch App
                </Link>
                <Link
                  className='ml-10 cursor-pointer whitespace-nowrap rounded-2xl bg-[#DC4F13] px-14 py-4 text-center text-white transition hover:bg-[#c2440e] mobile:px-7 mobile:py-3'
                  href='#'
                  onClick={handleSignOut}
                >
                  Sign Out
                </Link>
              </div>
            )}
            {!auth?.isAuthenticated && (
              <div>
                <Link
                  className='w-full cursor-pointer whitespace-nowrap rounded-2xl bg-[#DC4F13] px-14 py-4 text-center text-white transition hover:bg-[#c2440e] mobile:px-7 mobile:py-3'
                  href='signin'
                >
                  Launch App
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className='mobile-menu' ref={mobileMenu}>
        <div className='mm-head'>
          <button className='close-button' onClick={() => handleMenuClick(false)}>
            <svg
              fill='none'
              stroke='#fff'
              strokeWidth={1.5}
              style={{ width: '20px' }}
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M6 18 18 6M6 6l12 12' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
            <span>Close</span>
          </button>
        </div>
        <Link href={'/'}>HOME</Link>
        <Link
          href={`${
            auth.isAuthenticated && user.role?.includes(3) ? `/dashboard/client/home` : '/'
          }`}
        >
          Client
        </Link>
        <Link
          href={`${
            auth.isAuthenticated && user.role?.includes(0) ? `/dashboard/freelancer/home` : '/'
          }`}
        >
          Freelancer
        </Link>

        {!auth?.isAuthenticated ? (
          <Link
            className='btn_classified'
            href={'#sign-out'}
            onClick={() => openPopup('TypeOfAccount')}
          >
            Sign Up
          </Link>
        ) : (
          <Link className='btn_classified' href={'/jobs'} onClick={handleSignOut}>
            Sign Out
          </Link>
        )}
        {!auth?.isAuthenticated && (
          <div>
            <Link className='btn_classified' href={'#sign-out'} onClick={() => openPopup('SignIn')}>
              Launch App
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
