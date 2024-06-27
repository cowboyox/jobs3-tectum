/*--------- Hooks ---------*/
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlineQuestion } from 'react-icons/ai';
import { CiBellOn } from 'react-icons/ci';
import { LuAlignLeft } from 'react-icons/lu';
import { useDisconnect } from 'wagmi';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

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

  const renderWalletButton = () => {
    return (
        <WalletMultiButton className="bg-secondary hover:bg-[#15539a]" />
    );
};

  return (
    <header
      className='flex flex-wrap items-center justify-end h-28 md:h-20 mobile:flex-col mobile:justify-center mobile:gap-3'
      id='header_container'
    >
      {renderPopup()}
      <div className='w-full md:hidden'>
        <img className='h-6' src='/assets/images/logo.svg' />
      </div>
      <div className='flex items-center w-full gap-3 md:w-auto md:gap-6'>
        <LuAlignLeft
          className='w-5 h-5 mr-auto md:hidden'
          onClick={() => {
            OpenSideBar();
          }}
        />
        <div className='flex items-center gap-2'>
          <span className='text-lg uppercase'>{handleTap(auth?.currentRole)}</span>
          {renderWalletButton()}
        </div>
        <AiOutlineQuestion className='w-6 h-6 cursor-pointer' />
        <CiBellOn className='w-6 h-6 cursor-pointer' />
        <DropdownMenu>
          <DropdownMenuTrigger className='hidden md:flex'>
            <img
              className='object-cover object-center w-10 h-10 rounded-full cursor-pointer aspect-square'
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
