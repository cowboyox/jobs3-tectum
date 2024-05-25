'use client';
import React, { useEffect } from 'react';
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
import { IoIosLogOut } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SideBar() {
    useEffect(() => {
        const menu_links = document.querySelectorAll('.main_sidebar a');
        menu_links.forEach(single_link => {
            single_link.addEventListener('click', () => {
                const menu_controls = document.querySelectorAll('.main_sidebar .menu_control')
                menu_links.forEach(will_remove_current => { will_remove_current.classList.remove('current'); });
                menu_controls.forEach(will_remove_current => { will_remove_current.classList.remove('current'); });

                single_link.classList.add('current')

                const from_dropdown = single_link.closest('.dropdown_container');
                if (from_dropdown) {
                    from_dropdown.querySelector('.menu_control').classList.add('current')
                }
            })
        });
    }, []);
    function OpenSideBar() {
        document.querySelector('.main_sidebar').classList.toggle('open')
    } 
    return (
        <div className='main_sidebar'>
            <div className="logo_container" onClick={() => { OpenSideBar() }}>
                <img src='/assets/images/logo.svg' alt="Logo" />
                {/* <span>Portal</span> */}
            </div> 
            <div className="menu_content" onClick={() => { OpenSideBar() }}>
                <div className="links_container" > 
                    <div className="menu_item">
                        <Link href="/profile" className="menu_control">
                            <CiUser /> <span>PROFILE</span>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/dashboard/proposals" className="menu_control">
                            <AiOutlineFileSearch />
                            <span>MY PROJECTS</span>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/dashboard/proposals" className="menu_control">
                            <LuCalendarSearch /> <span>MY SCHEDULE</span>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/jobs" className="menu_control">
                            <TiDocumentText /> <span>JOB LISTING</span>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/dashboard/proposals" className="menu_control">
                            <HiOutlineClipboardDocumentList /> <span>ALL CONTRACTS</span>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/dashboard" className="menu_control">
                            <TiChartPieOutline /> <span>Statistics</span>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/dashboard" className="menu_control">
                            <RiMoneyDollarBoxLine /> <span>BALANCE</span>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/dashboard" className="menu_control">
                            <CiCircleQuestion /> <span>HELP</span>
                        </Link>
                    </div>
                </div> 
                <div className="links_container" >
                    <div className="menu_heading">Support</div>
                    <div className="menu_item">
                        <Link href="/dashboard/settings" className="menu_control">
                            <IoSettingsOutline /> <span>Settings</span>
                        </Link>
                    </div>
                </div>
                <Link href="/mydemed/logout" className='logout'>
                    <strong>Logout</strong> <IoIosLogOut />
                </Link>
                <div className="menu_bottom">
                    <div className="social_icons">
                        <Link href="#"> 
                            <FaLinkedinIn /> 
                        </Link>
                        <Link href="#"> 
                            <FaXTwitter /> 
                        </Link>
                        <Link href="#"> 
                            <FaFacebookF /> 
                        </Link>
                        <Link href="#"> 
                            <FaTelegramPlane /> 
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}