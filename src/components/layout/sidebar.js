'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

/*----------- Icons -----------*/ 
import { CiUser } from "react-icons/ci";
import { AiOutlineFileSearch } from "react-icons/ai";
import { LuCalendarSearch } from "react-icons/lu";
import { TiDocumentText } from "react-icons/ti";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { TiChartPieOutline } from "react-icons/ti";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { CiCircleQuestion } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5"; 

const menu_data = [
    {
        id: 0,
        icon: <CiUser className='w-7 h-7' />,
        name: 'Profile',
        href: '/profile',
    },
    {
        id: 1,
        icon: <AiOutlineFileSearch className='w-7 h-7' />,
        name: 'My Projects',
        href: '/dashboard/proposals',
    },
    {
        id: 2,
        icon: <LuCalendarSearch className='w-7 h-7' />,
        name: 'My Schedule',
        href: '/dashboard/proposals',
    },
    {
        id: 3,
        icon: <TiDocumentText className='w-7 h-7' />,
        name: 'Job Listing',
        href: '/jobs',
    },
    {
        id: 4,
        icon: <HiOutlineClipboardDocumentList className='w-7 h-7' />,
        name: 'All Contracts',
        href: '/dashboard/proposals',
    },
    {
        id: 5,
        icon: <TiChartPieOutline className='w-7 h-7' />,
        name: 'Statistics',
        href: '/dashboard',
    },
    {
        id: 6,
        icon: <RiMoneyDollarBoxLine className='w-7 h-7' />,
        name: 'Balance',
        href: '/dashboard',
    },
    {
        id: 7,
        icon: <CiCircleQuestion className='w-7 h-7' />,
        name: 'Help',
        href: '/dashboard',
    },
    {
        id: 8,
        icon: <IoSettingsOutline className='w-7 h-7' />,
        name: 'Settings',
        href: '/dashboard/settings',
    }
];

const SideBar = ()=> {
    const sideBarRef = useRef(null); 
    function OpenSideBar() {
        if (window.innerWidth <= 768) { 
            sideBarRef.current.classList.toggle('-translate-x-full');
        }
    } 
    return (
        <div ref={sideBarRef} className="main_sidebar md:w-60 p-10 w-10/12 fixed left-0 bg-black z-40 min-h-screen transition md:sticky top-0 -translate-x-full md:translate-x-0">
            <div onClick={OpenSideBar} className="w-10/12 mx-auto mb-10">
                <img src='/assets/images/logo.svg' className='w-100'/> 
            </div> 
            <div onClick={OpenSideBar}>
                <div className="flex flex-col gap-3">
                    {menu_data.map(item => (
                        <Link 
                            key={item.id}
                            href={item.href}
                            className="flex gap-4 py-1 w-full transition-all hover:pl-1"
                        >
                            {item.icon} 
                            <span className='text-base uppercase text-slate-500 font-medium'>
                                {item.name.toUpperCase()}
                            </span>
                        </Link> 
                    ))}
                </div> 
            </div>
        </div>
    )
}

export default SideBar