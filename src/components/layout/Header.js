import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useDisconnect } from 'wagmi';

import { usePopupFunctions } from '../popups/popups';

import { useCustomContext } from '@/context/use-custom';
// Dependencies

// Components

const Header = () => {
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

  // Authenticated user details
  const isAuthenticated = auth.isAuthenticated;
  const userRole = Array.isArray(user?.role) ? user.role : [];

  const clientUrl = isAuthenticated && userRole.includes(3) ? `/dashboard/client/home` : '/';
  const freelancerUrl =
    isAuthenticated && userRole.includes(0) ? `/dashboard/freelancer/home` : '/';

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
            <Link href='/'>HOME</Link>
            <Link href={clientUrl}>Client</Link>
            <Link href={freelancerUrl}>Freelancer</Link>
            {/* <Link href={employerUrl}>Employer</Link>
						<Link href={employeeUrl}>Employee</Link> */}
          </nav>
          <div className='right_side'>
            {!auth?.isAuthenticated ? (
              <Link
                className='btn_classified ml-10 whitespace-nowrap'
                href={'/signup'}
              >
                Sign Up
              </Link>
            ) : (
              <Link
                className='btn_classified ml-10 whitespace-nowrap'
                href={'/jobs'}
                onClick={handleSignOut}
              >
                Sign Out
              </Link>
            )}
            {!auth?.isAuthenticated && (
              <div>
                <Link
                  className='btn_classified whitespace-nowrap'
                  href={'signin'}
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
