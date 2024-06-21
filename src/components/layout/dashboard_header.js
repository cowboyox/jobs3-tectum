/*--------- Hooks ---------*/
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlineQuestion } from 'react-icons/ai';
import { CiBellOn } from 'react-icons/ci';
import { LuAlignLeft } from 'react-icons/lu';
import { useDisconnect } from 'wagmi';

import { usePopupFunctions } from '../../components/popups/popups';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCustomContext } from '@/context/use-custom';

const DashboardHeader = () => {
  const { renderPopup } = usePopupFunctions();

  function OpenSideBar() {
    document.querySelector('.main_sidebar').classList.toggle('-translate-x-full');
  }
  const auth = useCustomContext();

  const [accType, setAccType] = useState([]);

  useEffect(() => {
    let tmp = localStorage.getItem('jobs_2024_token');
    if (tmp === null) {
    } else {
      setAccType(JSON.parse(tmp).data.user.role);
    }
  }, []);

  const handleTap = (item) => {
    if (!item) {
      return 'Freelancer';
    } else if (item === 1) {
      return 'Employee';
    } else if (item === 2) {
      return 'Employer';
    } else if (item === 3) {
      return 'Client';
    }
    return 'Freelancer';
  };

  const router = useRouter();
  const { disconnect } = useDisconnect();

  const handleNavigation = (roleNumber) => {
    let tmp = localStorage.getItem('jobs_2024_token');
    if (tmp) {
      let { data } = JSON.parse(tmp);
      let obj = { ...data, currentRole: roleNumber };
      auth.setCurrentRole(roleNumber);
      localStorage.setItem('jobs_2024_token', JSON.stringify({ data: obj }));
    }

    return router.push(`/dashboard/${handleTap(roleNumber).toLowerCase()}/home`);
  };

  const handleSignOut = () => {
    disconnect();
    auth.signOut();
    location.href = '/';
  };

  return (
    <header
      className='flex h-28 flex-wrap items-center justify-end md:h-20 mobile:flex-col mobile:justify-center mobile:gap-3'
      id='header_container'
    >
      {renderPopup()}
      <div className='w-full md:hidden'>
        <img className='h-6' src='/assets/images/logo.svg' />
      </div>
      <div className='flex w-full items-center gap-3 md:w-auto md:gap-6'>
        <LuAlignLeft
          className='mr-auto h-5 w-5 md:hidden'
          onClick={() => {
            OpenSideBar();
          }}
        />
        <div className='flex items-center gap-2'>
          <span className='text-lg uppercase'>{handleTap(auth?.currentRole)}</span>
        </div>
        <AiOutlineQuestion className='h-6 w-6 cursor-pointer' />
        <CiBellOn className='h-6 w-6 cursor-pointer' />
        <DropdownMenu>
          <DropdownMenuTrigger className='hidden md:flex'>
            <img
              className='aspect-square h-10 w-10 cursor-pointer rounded-full object-cover object-center'
              src='/assets/images/user_img.png'
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-52' sideOffset={10}>
            <DropdownMenuLabel className='uppercase'>
              {handleTap(auth?.currentRole)}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-base'>Profile</DropdownMenuItem>
            <DropdownMenuItem className='text-base'>Wallet</DropdownMenuItem>
            <DropdownMenuItem className='text-base'>Refer a friend</DropdownMenuItem>
            <DropdownMenuItem className='text-base'>Settings</DropdownMenuItem>
            {Array.isArray(accType) &&
              accType?.map((item, index) => {
                if (auth?.currentRole !== item) {
                  return (
                    <DropdownMenuItem className='hover:bg-white' key={index}>
                      <Button className='w-full rounded' onClick={() => handleNavigation(item)}>
                        {handleTap(item)}
                      </Button>
                    </DropdownMenuItem>
                  );
                }
              })}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-base' onClick={handleSignOut}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
