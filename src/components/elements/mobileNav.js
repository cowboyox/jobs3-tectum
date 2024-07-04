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
        <div className="flex items-center md:hidden">
            <div className="flex p-2 rounded-[10px] bg-[#10191d]">
                <div className="relative w-8 h-8 cursor-pointer flex items-center justify-center"
                    onClick={() => setMenuOpen(!menuOpen)} >
                    <div
                        className={`bg-white h-[2px] w-full absolute transition-transform duration-300 ease-in-out rounded-full ${menuOpen ? 'rotate-45' : '-translate-y-1'}`}
                        style={{ top: '50%', transformOrigin: 'center' }}
                    />
                    <div
                        className={`bg-white h-[2px] absolute transition-transform duration-300 ease-in-out rounded-full ${menuOpen ? '-rotate-45 w-full' : 'w-3/4 translate-y-1'}`}
                        style={{ top: '50%', transformOrigin: 'center', left: menuOpen ? '0' : '0' }} 
                    />
                </div>
            </div>
            <div className={`fixed top-0 left-0 h-screen bg-[#10191d] shadow-lg transition-transform duration-300 ease-in-out z-50 p-8 flex flex-col gap-10 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{ width: '75vw', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)' }}>
                <img src="/assets/images/logo.svg" className='w-44 mobile:w-24' />
                <ul className="flex flex-col space-y-4 text-white">
                    {
                        props.links.map((item, index) => (
                            <Link key={index} href={item.link} className='text-base text-[#828383] uppercase font-semibold transition hover:text-white'>
                                {item.title}
                            </Link>
                        ))
                    }
                </ul>
                <div className="ml-auto w-auto flex gap-4">
                    <div className="w-full whitespace-nowrap px-4 py-4 text-center border border-white text-white transition cursor-pointer rounded-2xl mobile:py-3 hover:bg-white hover:text-black">
                        Sign In
                    </div>
                    <div className="w-full whitespace-nowrap px-4 rounded-2xl bg-[#DC4F13] transition hover:bg-[#c2440e] text-white py-4 mobile:py-3 text-center cursor-pointer">
                        Launch App
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
