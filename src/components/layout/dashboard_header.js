/*--------- Hooks ---------*/
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlineQuestion } from 'react-icons/ai';
import { LuAlignLeft } from 'react-icons/lu';
import { useDisconnect } from 'wagmi';

import { usePopupFunctions } from '../../components/popups/popups';

import Notifications from '@/components/elements/notifications';
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
    return <WalletMultiButton className='bg-secondary hover:bg-[#15539a]' />;
  };

  if (!auth?.currentProfile) {
    return (
      <header
        className='flex h-28 flex-wrap items-center justify-end md:h-20 mobile:flex-col mobile:justify-center mobile:gap-3'
        id='header_container'
      />
    );
  }

  return (
    <header
      className='flex h-28 flex-wrap items-center justify-end md:h-20 mobile:flex-col mobile:justify-center mobile:gap-3'
      id='header_container'
    >
      {renderPopup()}
      <div className='w-full md:hidden'>
        <img className='h-6' src='/assets/images/logo.svg' />
      </div>
      <div className='flex w-full items-center gap-3 md:w-auto md:gap-4'>
        <LuAlignLeft
          className='mr-auto h-5 w-5 md:hidden'
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
          <SelectTrigger className='flex w-auto min-w-20 gap-1 rounded-xl bg-[#10191D] py-5 mobile:hidden mobile:p-2'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent align='end' className='rounded-xl bg-[#10191D] p-1'>
            <SelectGroup className='flex flex-col gap-2'>
              <SelectItem className='cursor-pointer rounded bg-[#1B272C]' value='Client'>
                Client
              </SelectItem>
              <SelectItem className='cursor-pointer rounded bg-[#1B272C]' value='Freelancer'>
                Freelancer
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className='cursor-pointer rounded-xl bg-[#10191D] p-[10px] mobile:hidden'>
          <AiOutlineQuestion className='h-6 w-6 cursor-pointer object-contain' />
        </div>
        <div className='cursor-pointer rounded-xl bg-[#10191D] p-2'>
          <Notifications />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className='mobile:hidden'>
            <div className='relative w-20 md:h-12 md:w-12'>
              <img
                className='aspect-square h-full w-full rounded-full'
                src={
                  auth?.currentProfile?.avatarURL
                    ? auth?.currentProfile?.avatarURL
                    : '/assets/images/users/user-5.png'
                }
              />
              {/* Change background color depending on user online status */}
              <div className='absolute bottom-1 right-1 h-2 w-2 rounded-full bg-green-500' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='flex w-52 flex-col gap-0 rounded-xl border-2 border-[#28373e] bg-[#10191d]'
            sideOffset={10}
          >
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
