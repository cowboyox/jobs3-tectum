import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='w-full'>
        <Image
        src={'/assets/dashboard-media/homeHeroSm.png'}
        alt='hero'
        width={10000}
        height={10000}
        className='w-full h-full object-cover md:hidden'
        />
        <Image
        src={'/assets/dashboard-media/homeHeroMed.png'}
        alt='hero'
        width={10000}
        height={10000}
        className='w-full h-full object-cover hidden md:block 2xl:hidden'
        />
        <Image
        src={'/assets/dashboard-media/homeHeroXl.png'}
        alt='hero'
        width={10000}
        height={10000}
        className='w-full h-full object-cover hidden 2xl:block'
        />

    </div>
  )
}

export default Hero