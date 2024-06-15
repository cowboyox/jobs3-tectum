import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/*--------- Hooks ---------*/
import { usePopupFunctions } from '../../components/popups/popups';
import { useCustomContext } from "@/context/use-custom";
import { useRouter } from 'next/navigation';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';



/*--------- Media ---------*/
import { CiBellOn } from "react-icons/ci";
import { AiOutlineQuestion } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa6";
import { LuAlignLeft } from "react-icons/lu";

const DashboardHeader = () => {
    const { openPopup, renderPopup } = usePopupFunctions();

    function OpenSideBar() {
        document.querySelector('.main_sidebar').classList.toggle('-translate-x-full')
    }
    const auth = useCustomContext()

    useEffect(() => {
        console.log("auth===== ", auth)
    }, [auth])

    const [user, setUser] = useState({
        email: "",
        name: "",
        role: [0],
        verified: false
    });

    const [accType, setAccType] = useState([]);

    useEffect(() => {
        let tmp = localStorage.getItem('jobs_2024_token');
        if (tmp === null) {
            console.log("Login First!");
        } else {
            setUser(JSON.parse(tmp).data.user);
            setAccType(JSON.parse(tmp).data.user.role);
        }
    }, [])


    const [currentNav, setCurrentNav] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    useEffect(() => {
        // if(!auth.isAuthenticated){
        // 	router.replace('/')
        // }
        setCurrentNav(window.location.href.split('/')[5]);
        setCurrentUser(window.location.href.split('/')[4]);
    }, [])

    const handleTap = (item) => {
        if (!item) {
            return "Freelancer";
        } else if (item === 1) {
            return "Employee";
        } else if (item === 2) {
            return "Employer";
        } else if (item === 3) {
            return "Client";
        }
        return "Freelancer";
    }

    const router = useRouter();

    const handleNavigation = (nav) => {
        setCurrentNav(nav);
        window.localStorage.setItem("currentRole", nav);
        return router.push(`/dashboard/${currentUser}/${nav}/home`)
    }

    return (
        <header className='flex justify-end flex-wrap items-center md:h-20 h-28 mobile:flex-col mobile:gap-3 mobile:justify-center' id='header_container'>
            {renderPopup()}
            <div className='w-full md:hidden'>
                <img src="/assets/images/logo.svg" className="h-6" />
            </div>
            <div className='flex items-center gap-3 md:gap-6 w-full md:w-auto'>
                <LuAlignLeft className='md:hidden mr-auto h-5 w-5' onClick={() => { OpenSideBar() }} />
                <DropdownMenu>
                    <DropdownMenuTrigger className='hidden md:flex'>
                        <div className='flex items-center gap-2'>
                            <span className='uppercase text-lg'>{currentNav}</span> <FaAngleDown />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10} className="w-52">
                        <DropdownMenuLabel className='uppercase'>{currentNav}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='text-base'>Profile</DropdownMenuItem>
                        <DropdownMenuItem className='text-base'>Wallet</DropdownMenuItem>
                        <DropdownMenuItem className='text-base'>Refer a friend</DropdownMenuItem>
                        <DropdownMenuItem className='text-base'>Settings</DropdownMenuItem>
                        {
                            Array.isArray(accType) && accType.map((item, index) => {
                                if (currentNav !== handleTap(item).toLowerCase()) {
                                    return (
                                        <DropdownMenuItem className="hover:bg-white" key={index}>
                                            <Button className='rounded w-full' onClick={() => handleNavigation(handleTap(item).toLowerCase())}>
                                                {handleTap(item)}
                                            </Button>
                                        </DropdownMenuItem>
                                    );
                                }
                                return null;
                            })
                        }

                    </DropdownMenuContent>
                </DropdownMenu>
                <AiOutlineQuestion className='w-6 h-6 cursor-pointer' />
                <CiBellOn className='w-6 h-6 cursor-pointer' />
                <img
                    src="/assets/images/user_img.png"
                    className="rounded-full h-10 w-10 object-cover aspect-square object-center cursor-pointer"
                />
            </div>
        </header>
    )
}

export default DashboardHeader;