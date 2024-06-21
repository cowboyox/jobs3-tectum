'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Marquee from 'react-fast-marquee';

const Hero = () => {
  const router = useRouter();
  const [search, setSearch] = useState();

  const searchQuery = (e) => {
    e.preventDefault();
    router.push(`/jobs?search=${search}`);
  };

  return (
    <div className='hero_section'>
      <div className='section_content'>
        <h1>YOUR WEB3 CAREER STARTS HERE</h1>
        <p>Decentralising and globalising the employment landscape</p>
        <form onSubmit={(e) => searchQuery(e)}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search: Frontend developer, Marketing, Binance, etc.'
            type='text'
          />
          <button>
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              strokeWidth={1.5}
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </form>
        {/* <div className="sl_counters" >
					<div className="single_counter">
						<strong>20M+</strong>
						<span>users</span>
					</div>
					<div className="single_counter">
						<strong>500K+</strong>
						<span>jobs</span>
					</div>
					<div className="single_counter">
						<strong>100+</strong>
						<span>partners</span>
					</div>
				</div> */}
        <Marquee className='sl_logos'>
          <div className='logos-set'>
            <Image alt='' height={130} src={'/assets/images/Partners/Partner-1.webp'} width={450} />
            <Image alt='' height={130} src={'/assets/images/Partners/Partner-2.png'} width={450} />
            <Image alt='' height={130} src={'/assets/images/Partners/Partner-3.png'} width={450} />
            <Image alt='' height={130} src={'/assets/images/Partners/Partner-4.png'} width={450} />
            <Image alt='' height={130} src={'/assets/images/Partners/Partner-5.png'} width={450} />
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Hero;
