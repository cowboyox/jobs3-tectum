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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; 
import Notifications from '@/components/elements/notifications';
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

  if (!auth?.currentProfile) {
    return (
      <header
        className='flex flex-wrap items-center justify-end h-28 md:h-20 mobile:flex-col mobile:justify-center mobile:gap-3'
        id='header_container'
      />
    );
  }

  return (
    <header
      className='flex flex-wrap items-center justify-end h-28 md:h-20 mobile:flex-col mobile:justify-center mobile:gap-3'
      id='header_container'
    >
      {renderPopup()}
      <div className='w-full md:hidden'>
        <img className='h-6' src='/assets/images/logo.svg' />
      </div>
      <div className='flex items-center w-full gap-3 md:w-auto md:gap-4'>
        <LuAlignLeft
          className='w-5 h-5 mr-auto md:hidden'
          onClick={() => {
            OpenSideBar();
          }}
        />
        <div className='flex items-center gap-2'>
          {/* <span className='text-lg uppercase'>{handleTap(auth?.currentRole)}</span> */}
          {renderWalletButton()}
        </div>
        {/* <DropdownMenu>
          <DropdownMenuTrigger className='py-2 px-4 min-w-20 w-auto rounded-xl border border-[#1B272C] gap-3 flex items-center mobile:p-2'>
            <img src="/assets/images/icons/metamask.png" className='bg-[#10191D] h-7 w-7 rounded-full object-contain p-1' />
            <span className='text-sm'>0x907a...Ac62e2</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='flex flex-col gap-2 rounded-xl border-2 border-[#28373e] bg-[#10191d]' align='end'>
            <DropdownMenuItem className='flex gap-2 rounded-xl cursor-pointer py-3 px-2 bg-[#1B272C]'>
              <img src="/assets/images/icons/metamask.png" className='w-4' />
              <span className='text-sm'>0x907a...Ac62e2</span>
              <FaRegCopy className='ml-3 cursor-pointer' />
            </DropdownMenuItem>
            <DropdownMenuItem className='flex gap-2 py-3 cursor-pointer rounded-xl'>
              <RxReload className='w-5 stroke-[#96b0be]' />
              <span className='text-[15px]'>Change wallet</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex gap-2 py-3 cursor-pointer rounded-xl'>
              <IoIosLogOut className='w-5 stroke-[#96b0be]' />
              <span className='text-[15px]'>Disconnect</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <Select defaultValue={handleTap(auth?.currentRole)}>
          <SelectTrigger className='min-w-20 w-auto rounded-xl bg-[#10191D] gap-1 flex mobile:p-2 py-5 mobile:hidden'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className='rounded-xl bg-[#10191D] p-1' align='end'>
            <SelectGroup className='flex flex-col gap-2'>
              <SelectItem className='rounded bg-[#1B272C] cursor-pointer' value="Client">Client</SelectItem>
              <SelectItem className='rounded bg-[#1B272C] cursor-pointer' value="Freelancer">Freelancer</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className='p-[10px] rounded-xl bg-[#10191D] cursor-pointer mobile:hidden'> 
          <AiOutlineQuestion className='object-contain w-6 h-6 cursor-pointer' />
        </div>
        <div className='p-2 rounded-xl bg-[#10191D] cursor-pointer'> 
          <Notifications />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className='mobile:hidden'>
            <div className='relative w-20 md:h-12 md:w-12'>
              <img
                className='w-full h-full rounded-full aspect-square'
                src={auth?.currentProfile?.avatarURL ? auth?.currentProfile?.avatarURL : '/assets/images/users/user-5.png'}
              />
              {/* Change background color depending on user online status */}
              <div className='absolute w-2 h-2 bg-green-500 rounded-full bottom-1 right-1' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10} className='w-52 flex flex-col gap-0 rounded-xl border-2 border-[#28373e] bg-[#10191d]' align='end'>
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