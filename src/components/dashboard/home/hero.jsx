import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <div className='w-full'>
      <Image
        alt='hero'
        className='h-full w-full object-cover md:hidden'
        height={10000}
        src={'/assets/dashboard-media/homeHeroSm.png'}
        width={10000}
      />
      <Image
        alt='hero'
        className='hidden h-full w-full object-cover md:block'
        height={10000}
        src={'/assets/dashboard-media/homeHeroMed.png'}
        width={10000}
      />
      {/* <Image
        alt='hero'
        className='hidden h-full w-full object-cover 2xl:block'
        height={10000}
        src={'/assets/dashboard-media/homeHeroXl.png'}
        width={10000}
      /> */}
    </div>
  );
};

export default Hero;
