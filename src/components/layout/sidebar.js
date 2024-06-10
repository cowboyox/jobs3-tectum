'use client';
import React, { useEffect, useRef, useState } from 'react';
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
import { AiOutlineHome } from "react-icons/ai";

const SideBar = () => {
    const [user, setUser] = useState({
        email: "",
        name: "",
        role: 0,
        verified: false
    });
    useEffect(() => {
        let tmp = localStorage.getItem('jobs_2024_token');
        if (tmp === null) {
            toast({
                variant: "destructive",
                title: <h1 className='text-center'>Error</h1>,
                description: <h3>Please Login First</h3>,
                className: "bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center"
            });
            alert("Please Login First");
            router.push('/');
        } else {
            setUser(JSON.parse(tmp).data.user);
        }
    }, [])
    const freelancer_menu_data = [
        {
            id: 0,
            icon: <AiOutlineHome className='w-7 h-7' />,
            name: 'Home',
            href: '/dashboard',
        },
        {
            id: 1,
            icon: <CiUser className='w-7 h-7' />,
            name: 'Profile',
            href: `/dashboard/${user.name}/freelancer/profile`,
        },
        {
            id: 2,
            icon: <AiOutlineFileSearch className='w-7 h-7' />,
            name: 'Gig Search',
            href: `/dashboard/${user.name}/freelancer/find-job`,
        },
        {
            id: 3,
            icon: <LuCalendarSearch className='w-7 h-7' />,
            name: 'My Gigs',
            href: `/dashboard/${user.name}/freelancer/my-gigs`,
        },
        {
            id: 4,
            icon: <TiDocumentText className='w-7 h-7' />,
            name: 'Gig Orders',
            href: `/dashboard/${user.name}/freelancer/orders`,
        },
        {
            id: 5,
            icon: <HiOutlineClipboardDocumentList className='w-7 h-7' />,
            name: 'Disputes',
            href: `/dashboard/${user.name}/freelancer/disputes`,
        },
        {
            id: 6,
            icon: <IoSettingsOutline className='w-7 h-7' />,
            name: 'Messages',
            href: `/dashboard/${user.name}/freelancer/inbox`,
        }
    ];
    const client_menu_data = [
        {
            id: 0,
            icon: <AiOutlineHome className='w-7 h-7' />,
            name: 'Home',
            href: '/dashboard',
        },
        {
            id: 1,
            icon: <CiUser className='w-7 h-7' />,
            name: 'Profile',
            href: `/dashboard/${user.name}/client/profile`,
        },
        {
            id: 2,
            icon: <LuCalendarSearch className='w-7 h-7' />,
            name: 'My Gigs',
            href: `/dashboard/${user.name}/client/my-gigs`,
        },
        {
            id: 3,
            icon: <AiOutlineFileSearch className='w-7 h-7' />,
            name: 'Freelancers Search',
            href: `/dashboard/${user.name}/client/freelancers`,
        },
        {
            id: 4,
            icon: <AiOutlineFileSearch className='w-7 h-7' />,
            name: 'Gig Search',
            href: `/dashboard/${user.name}/client/freelancers`,
        },
        {
            id: 5,
            icon: <TiDocumentText className='w-7 h-7' />,
            name: 'Gig Orders',
            href: `/dashboard/${user.name}/client/orders`,
        },
        {
            id: 6,
            icon: <HiOutlineClipboardDocumentList className='w-7 h-7' />,
            name: 'Disputes',
            href: `/dashboard/${user.name}/client/disputes`,
        },
        {
            id: 7,
            icon: <IoSettingsOutline className='w-7 h-7' />,
            name: 'Messages',
            href: `/dashboard/${user.name}/client/inbox`,
        }
    ];
    const sideBarRef = useRef(null);
    function OpenSideBar() {
        if (window.innerWidth <= 768) {
            sideBarRef.current.classList.toggle('-translate-x-full');
        }
    }
    return (
        <div ref={sideBarRef} className="main_sidebar md:w-60 p-10 w-10/12 fixed left-0 bg-black z-40 min-h-screen transition md:sticky top-0 -translate-x-full md:translate-x-0">
            <div onClick={OpenSideBar} className="w-10/12 mx-auto mb-10">
                <img src='/assets/images/logo.svg' className='w-100' />
            </div>
            <div onClick={OpenSideBar}>
                <div className="flex flex-col gap-3">
                    {!user.role && freelancer_menu_data.map(item => (
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
                    {user.role === 3 && client_menu_data.map(item => (
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