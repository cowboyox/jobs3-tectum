/*--------- Hooks ---------*/
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { LuAlignLeft } from 'react-icons/lu';
import { useDisconnect } from 'wagmi';

import { usePopupFunctions } from '../../components/popups/popups';

import Notifications from '@/components/elements/notifications';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { useCustomContext } from '@/context/ContextProvider';
import api from '@/utils/api';
import { PAYTOKEN_MINT, USER_ROLE } from '@/utils/constants';

const menu_data = [
  {
    href: `/dashboard/freelancer/home`,
    name: 'Home',
  },
  {
    href: `/dashboard/freelancer/profile`,
    name: 'Profile',
  },
  {
    href: `/dashboard/freelancer/portfolio`,
    name: 'Portfolio',
  },
  {
    href: `/dashboard/freelancer/find-job`,
    name: 'Gig Search',
  },
  {
    href: `/dashboard/freelancer/my-gigs`,
    name: 'My Gigs',
  },
  {
    href: `/dashboard/freelancer/orders`,
    name: 'Gig Orders',
  },
  {
    href: `/dashboard/freelancer/review`,
    name: 'Write a review',
  },
  {
    href: `/dashboard/freelancer/offer`,
    name: 'Client Orders',
  },
  {
    href: `/dashboard/freelancer/disputes`,
    name: 'Disputes',
  },
  {
    href: `/dashboard/freelancer/inbox`,
    name: 'Messages',
  },
  {
    href: `/dashboard/freelancer/settings`,
    name: 'Settings',
  },
  {
    href: `/dashboard/client/home`,
    name: 'Home',
  },
  {
    href: `/dashboard/client/profile`,
    name: 'Profile',
  },
  {
    href: `/dashboard/client/my-gigs`,
    name: 'My Gigs',
  },
  {
    href: `/dashboard/client/post-gig`,
    name: 'Post a Gig',
  },
  {
    href: `/dashboard/client/freelancers`,
    name: 'Freelancers',
  },
  {
    href: `/dashboard/client/gig-search`,
    name: 'Gig Search',
  },
  {
    href: `/dashboard/client/orders`,
    name: 'Gig Orders',
  },
  {
    href: `/dashboard/client/review`,
    name: 'Write a review',
  },
  {
    href: `/dashboard/client/offer`,
    name: 'Orders',
  },
  {
    href: `/dashboard/client/disputes`,
    name: 'Disputes',
  },
  {
    href: `/dashboard/client/inbox`,
    name: 'Messages',
  },
  {
    href: `/dashboard/client/settings`,
    name: 'Settings',
  },
];

const DashboardHeader = () => {
  const { renderPopup } = usePopupFunctions();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  function OpenSideBar() {
    document.querySelector('.main_sidebar').classList.toggle('-translate-x-full');
  }
  const auth = useCustomContext();

  const [title, setTitle] = useState('');
  const [balance, setBalance] = useState(0);

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

  const handleChangeRole = (roleNumber) => {
    auth.setCurrentRole(roleNumber);
    router.push(`/dashboard/${handleTap(roleNumber).toLowerCase()}/home`);
  };

  const router = useRouter();
  const pathname = usePathname();

  const { disconnect } = useDisconnect();

  const handleSignOut = () => {
    disconnect();
    auth.signOut();
    location.href = '/';
  };

  const renderWalletButton = () => {
    return <WalletMultiButton className='bg-secondary hover:bg-[#15539a]' />;
  };

  useEffect(() => {
    setTitle(
      menu_data.find((item) => item.href == pathname.split('/').slice(0, 4).join('/'))?.name || ''
    );
  }, [pathname]);

  useEffect(() => {
    if (wallet && connection) {
      (async function () {
        try {
          const walletAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, wallet?.publicKey);

          const accountInfo = await connection.getAccountInfo(walletAta);
          if (!accountInfo) {
            console.log('Token account does not exist. Creating it...');
            // await createTokenAccount(wallet, connection, PAYTOKEN_MINT);
            setBalance(0);
          } else {
            // Get the token balance
            const info = await connection.getTokenAccountBalance(walletAta);
            setBalance(info.value.uiAmount);
          }
        } catch (error) {
          console.log('Error while getting balance of the wallet:', error);
          setBalance(0);
        }
      })();
    }
  }, [wallet, connection]);

  useEffect(() => {
    (async () => {
      const info = JSON.parse(localStorage.getItem('jobs_2024_token'));
      let token;

      if (info) {
        token = info?.data?.token; // Replace 'your_token_key' with the actual key name
      }

      console.log("token", token);

      if (wallet && token) {
        console.log("wallet and token") ;
        try {
          console.log("11111") ;
          await api.put(
            `/api/v1/profile/update-walletPublickey`,
            JSON.stringify({ walletPublicKey: wallet.publicKey })
          );
          console.log("22222");
        } catch (error) {
          console.log('Error while updating wallet publicKey:', error);
        }
      }
    })();
  }, [wallet]);

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
      className='flex h-28 flex-wrap items-center justify-between md:h-20 mobile:flex-nowrap mobile:justify-center mobile:gap-3'
      id='header_container'
    >
      {renderPopup()}
      <div className='mobile:hidden'>
        <h1 className='text-3xl font-bold text-[#F5F5F5]'>{title}</h1>
      </div>
      <div className='flex w-full items-center gap-3 md:w-auto md:gap-4 mobile:justify-between'>
        <div
          className='order-1 cursor-pointer rounded-[10px] bg-[#10191D] p-3 md:hidden'
          onClick={() => {
            OpenSideBar();
          }}
        >
          <LuAlignLeft className='mr-auto h-7 w-7 fill-[#96B0BD] stroke-[#96B0BD]' />
        </div>
        <div className='flex items-center gap-2 mobile:hidden'>{renderWalletButton()}</div>
        <Select defaultValue={auth?.currentRole} onValueChange={handleChangeRole}>
          <SelectTrigger className='flex w-auto min-w-20 gap-1 rounded-xl bg-[#10191D] py-5 text-base font-normal mobile:order-3 mobile:py-6'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent align='end' className='w-40 rounded-xl bg-[#10191D]'>
            <SelectGroup className='flex flex-col gap-2'>
              {auth?.user?.role.includes(3) && (
                <SelectItem
                  className='cursor-pointer rounded-xl py-3 text-lg font-medium text-[#96B0BD]'
                  value={USER_ROLE.CLIENT}
                >
                  Client
                </SelectItem>
              )}
              {auth?.user?.role.includes(0) && (
                <SelectItem
                  className='cursor-pointer rounded-xl py-3 text-lg font-medium text-[#96B0BD]'
                  value={USER_ROLE.FREELANCER}
                >
                  Freelancer
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger className='mobile:hidden'>
            <div className='cursor-pointer rounded-xl bg-[#10191D] p-[10px] mobile:hidden'>
              <svg
                fill='none'
                height='25'
                viewBox='0 0 24 25'
                width='24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M17 18.93H13L8.54999 21.89C7.88999 22.33 7 21.86 7 21.06V18.93C4 18.93 2 16.93 2 13.93V7.92993C2 4.92993 4 2.92993 7 2.92993H17C20 2.92993 22 4.92993 22 7.92993V13.93C22 16.93 20 18.93 17 18.93Z'
                  stroke='#8599A5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit='10'
                  strokeWidth='1.5'
                />
                <path
                  d='M11.9998 11.8599V11.6499C11.9998 10.9699 12.4198 10.6099 12.8398 10.3199C13.2498 10.0399 13.6598 9.6799 13.6598 9.0199C13.6598 8.0999 12.9198 7.35986 11.9998 7.35986C11.0798 7.35986 10.3398 8.0999 10.3398 9.0199'
                  stroke='#8599A5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                />
                <path
                  d='M11.9955 14.25H12.0045'
                  stroke='#8599A5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                />
              </svg>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='flex w-64 flex-col gap-0 rounded-xl border-2 border-[#28373e] bg-[#10191d]'
            sideOffset={10}
          >
            <DropdownMenuItem className='cursor-pointer rounded p-3 text-lg font-medium text-[#96B0BD] hover:bg-[#1B272C] hover:text-[#F5F5F5]'>
              <h1 onClick={() => router.push(`/help`)}>Help and support</h1>
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer p-3 text-lg font-medium text-[#96B0BD] hover:bg-[#1B272C] hover:text-[#F5F5F5]'>
              <h1>Community and Forums</h1>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Notifications className='mobile:order-2' />

        <DropdownMenu>
          <DropdownMenuTrigger className='mobile:order-4'>
            <div className='relative h-12 w-12 mobile:h-10 mobile:w-10'>
              <img
                className='aspect-square h-full w-full rounded-full object-cover'
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
            className='flex w-72 flex-col gap-0 rounded-xl border-2 border-[#28373e] bg-[#10191d]'
            sideOffset={10}
          >
            <DropdownMenuItem className='rounded py-3 text-lg font-medium hover:bg-[#1B272C]'>
              <div className='flex w-full items-center justify-between text-[#96B0BD]'>
                <div className='flex items-center gap-2'>
                  <svg
                    fill='none'
                    height='25'
                    viewBox='0 0 24 25'
                    width='24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M13 9.5H7'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M22.0002 11.4699V13.53C22.0002 14.08 21.5602 14.5299 21.0002 14.5499H19.0402C17.9602 14.5499 16.9702 13.7599 16.8802 12.6799C16.8202 12.0499 17.0602 11.4599 17.4802 11.0499C17.8502 10.6699 18.3602 10.45 18.9202 10.45H21.0002C21.5602 10.47 22.0002 10.9199 22.0002 11.4699Z'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M17.48 11.05C17.06 11.46 16.82 12.05 16.88 12.68C16.97 13.76 17.96 14.55 19.04 14.55H21V16C21 19 19 21 16 21H7C4 21 2 19 2 16V9C2 6.28 3.64 4.38 6.19 4.06C6.45 4.02 6.72 4 7 4H16C16.26 4 16.51 4.00999 16.75 4.04999C19.33 4.34999 21 6.26 21 9V10.45H18.92C18.36 10.45 17.85 10.67 17.48 11.05Z'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                    />
                  </svg>
                  <h1>Balance</h1>
                </div>
                <div>
                  {wallet?.publicKey ? (
                    <h1 className='text-[#F5F5F5]'>$ {balance.toFixed(2)}</h1>
                  ) : (
                    <h1 className='text-sm text-[#F5F5F5]'>No Wallet Connected</h1>
                  )}
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer rounded py-3 text-lg font-medium hover:bg-[#1B272C]'>
              <div className='flex items-center gap-2'>
                <svg
                  fill='none'
                  height='25'
                  viewBox='0 0 24 25'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M9.5 14.25C9.5 15.22 10.25 16 11.17 16H13.05C13.85 16 14.5 15.32 14.5 14.47C14.5 13.56 14.1 13.23 13.51 13.02L10.5 11.97C9.91 11.76 9.51001 11.44 9.51001 10.52C9.51001 9.67999 10.16 8.98999 10.96 8.98999H12.84C13.76 8.98999 14.51 9.76999 14.51 10.74'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M12 8V17'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M22 12.5C22 18.02 17.52 22.5 12 22.5C6.48 22.5 2 18.02 2 12.5C2 6.98 6.48 2.5 12 2.5'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M22 6.5V2.5H18'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M17 7.5L22 2.5'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                </svg>
                <h1 className='text-[#96B0BD]'>$THREE Wallet</h1>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer rounded py-3 text-lg font-medium hover:bg-[#1B272C]'>
              <div className='flex items-center gap-2'>
                <svg
                  fill='none'
                  height='25'
                  viewBox='0 0 24 25'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18.5 20H14.5'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M16.5 22V18'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M12.1596 11.37C12.0596 11.36 11.9396 11.36 11.8296 11.37C9.44961 11.29 7.55961 9.34 7.55961 6.94C7.54961 4.49 9.53961 2.5 11.9896 2.5C14.4396 2.5 16.4296 4.49 16.4296 6.94C16.4296 9.34 14.5296 11.29 12.1596 11.37Z'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M11.99 22.3099C10.17 22.3099 8.36004 21.8499 6.98004 20.9299C4.56004 19.3099 4.56004 16.6699 6.98004 15.0599C9.73004 13.2199 14.24 13.2199 16.99 15.0599'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                </svg>
                <h1 className='text-[#96B0BD]'>Refer a Friend</h1>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='cursor-pointer rounded py-3 text-lg font-medium hover:bg-[#1B272C]'
              onClick={() =>
                router.push(
                  `/dashboard/${auth?.currentRole == 3 ? 'client' : 'freelancer'}/settings`
                )
              }
            >
              <div className='flex items-center gap-2'>
                <svg
                  fill='none'
                  height='25'
                  viewBox='0 0 24 25'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 15.5C13.6569 15.5 15 14.1569 15 12.5C15 10.8431 13.6569 9.5 12 9.5C10.3431 9.5 9 10.8431 9 12.5C9 14.1569 10.3431 15.5 12 15.5Z'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.49854'
                  />
                  <path
                    d='M2 13.3799V11.6199C2 10.5799 2.85 9.71994 3.9 9.71994C5.71 9.71994 6.45 8.43994 5.54 6.86994C5.02 5.96994 5.33 4.79994 6.24 4.27994L7.97 3.28994C8.76 2.81994 9.78 3.09994 10.25 3.88994L10.36 4.07994C11.26 5.64994 12.74 5.64994 13.65 4.07994L13.76 3.88994C14.23 3.09994 15.25 2.81994 16.04 3.28994L17.77 4.27994C18.68 4.79994 18.99 5.96994 18.47 6.86994C17.56 8.43994 18.3 9.71994 20.11 9.71994C21.15 9.71994 22.01 10.5699 22.01 11.6199V13.3799C22.01 14.4199 21.16 15.2799 20.11 15.2799C18.3 15.2799 17.56 16.5599 18.47 18.1299C18.99 19.0399 18.68 20.1999 17.77 20.7199L16.04 21.7099C15.25 22.1799 14.23 21.8999 13.76 21.1099L13.65 20.9199C12.75 19.3499 11.27 19.3499 10.36 20.9199L10.25 21.1099C9.78 21.8999 8.76 22.1799 7.97 21.7099L6.24 20.7199C5.33 20.1999 5.02 19.0299 5.54 18.1299C6.45 16.5599 5.71 15.2799 3.9 15.2799C2.85 15.2799 2 14.4199 2 13.3799Z'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.49854'
                  />
                </svg>
                <h1 className='text-[#96B0BD]'>Settings</h1>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='cursor-pointer rounded py-3 text-lg font-medium hover:bg-[#1B272C]'
              onClick={handleSignOut}
            >
              <div className='flex items-center gap-2'>
                <svg
                  fill='none'
                  height='25'
                  viewBox='0 0 24 25'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8.90039 8.06023C9.21039 4.46023 11.0604 2.99023 15.1104 2.99023H15.2404C19.7104 2.99023 21.5004 4.78023 21.5004 9.25023V15.7702C21.5004 20.2402 19.7104 22.0302 15.2404 22.0302H15.1104C11.0904 22.0302 9.24039 20.5802 8.91039 17.0402'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M15.0001 12.5H3.62012'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M5.85 9.1499L2.5 12.4999L5.85 15.8499'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                </svg>
                <h1 className='text-[#96B0BD]'>Logout</h1>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
