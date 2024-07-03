import React from 'react'
import Link from 'next/link';
import MobileNav from '@/components/elements/mobileNav';

const menuLinks = [
    {
        title: 'Help Center',
        link: '/help'
    },
    {
        title: 'Support',
        link: '/support'
    },
    {
        title: 'Known Issues',
        link: '/known-issues'
    }
]
const NewHeader = () => {
  return (
    <div className='flex px-5 py-8'>
        <div className="max-w-7xl mx-auto w-full flex items-center gap-10 mobile:gap-1">
            <img src="/assets/images/logo.svg" className='w-44 mobile:w-24' />
            <div className='flex gap-5 items-center mobile:hidden'>
                {
                    menuLinks.map((item, index) => (
                        <Link key={index} href={item.link} className='text-base text-[#828383] uppercase font-semibold transition hover:text-white'>
                            {item.title}
                        </Link>
                    ))
                }
            </div>
            <div className="ml-auto w-auto flex gap-4">
                <div className="w-full whitespace-nowrap px-7 py-4 text-center border border-white text-white transition cursor-pointer rounded-2xl mobile:py-3 hover:bg-white hover:text-black mobile:hidden">
                    Sign In
                </div>
                <div className="w-full whitespace-nowrap px-14 rounded-2xl bg-[#DC4F13] transition hover:bg-[#c2440e] text-white py-4 mobile:py-3 text-center cursor-pointer mobile:px-7">
                    Launch App
                </div>
            </div>
            <MobileNav links={menuLinks} />
        </div>
    </div>
  )
}

export default NewHeader
