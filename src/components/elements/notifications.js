import Link from 'next/link';
import React from 'react';
import { AiOutlineSound } from 'react-icons/ai';
import { CiBellOn } from 'react-icons/ci';
import { GoInbox } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NotificationItem = ({
  type,
  userImage,
  userName,
  message,
  time,
  icon,
  isOnline,
  actions,
  highlighted,
}) => {
  return (
    <div
      className={`flex p-4 ${type === 'offer' ? 'flex-col' : 'flex-row'} gap-4 ${highlighted ? 'bg-[#C440081F]' : 'bg-[#1a272c] transition hover:bg-[#162126]'} rounded-xl`}
    >
      <div className='flex w-full gap-4'>
        <div className='relative w-20 md:h-12 md:w-12'>
          {userImage ? (
            <img className='aspect-square h-full w-full rounded-full' src={userImage} />
          ) : (
            <div className='relative flex aspect-square w-20 items-center justify-center rounded-full bg-[#28373E] md:h-12 md:w-12'>
              <CiBellOn className='h-6 w-6 fill-[#96B0BD]' />
            </div>
          )}
          {isOnline && (
            <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500' />
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <p
            className={`text-sm ${type === 'general' ? 'font-bold text-white' : 'text-[#96B0BD]'}`}
          >
            <strong className='text-white'>{userName}</strong> {message}
          </p>
          <p className='text-xs text-[#96B0BD]'>{time}</p>
        </div>
        {icon && !highlighted && (
          <GoInbox className='my-auto ml-auto h-5 w-5 cursor-pointer fill-[#96B0BD]' />
        )}
        {highlighted && <div className='my-auto ml-auto h-3 w-3 rounded-full bg-[#DC4F13]' />}
      </div>
      {actions && (
        <>
          <div className='border-t border-[#28373E]' />
          <div className='ml-auto flex w-auto gap-3 rounded-2xl bg-[#10191D] p-2'>
            <div className='w-auto cursor-pointer rounded-2xl px-8 py-3 text-center text-white transition hover:bg-white hover:text-black mobile:py-3'>
              Reject
            </div>
            <div className='w-auto cursor-pointer rounded-xl bg-[#DC4F13] px-8 py-3 text-center text-white mobile:py-3'>
              Accept
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Notifications = () => {
  return (
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
              d='M12.0196 3.40991C8.7096 3.40991 6.0196 6.09991 6.0196 9.40991V12.2999C6.0196 12.9099 5.7596 13.8399 5.4496 14.3599L4.2996 16.2699C3.5896 17.4499 4.0796 18.7599 5.3796 19.1999C9.6896 20.6399 14.3396 20.6399 18.6496 19.1999C19.8596 18.7999 20.3896 17.3699 19.7296 16.2699L18.5796 14.3599C18.2796 13.8399 18.0196 12.9099 18.0196 12.2999V9.40991C18.0196 6.10991 15.3196 3.40991 12.0196 3.40991Z'
              stroke='#F5F5F5'
              stroke-linecap='round'
              stroke-miterlimit='10'
              stroke-width='1.5'
            />
            <path
              d='M13.8699 3.69994C13.5599 3.60994 13.2399 3.53994 12.9099 3.49994C11.9499 3.37994 11.0299 3.44994 10.1699 3.69994C10.4599 2.95994 11.1799 2.43994 12.0199 2.43994C12.8599 2.43994 13.5799 2.95994 13.8699 3.69994Z'
              stroke='#F5F5F5'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-miterlimit='10'
              stroke-width='1.5'
            />
            <path
              d='M15.0195 19.5601C15.0195 21.2101 13.6695 22.5601 12.0195 22.5601C11.1995 22.5601 10.4395 22.2201 9.89953 21.6801C9.35953 21.1401 9.01953 20.3801 9.01953 19.5601'
              stroke='#F5F5F5'
              stroke-miterlimit='10'
              stroke-width='1.5'
            />
            {/* <circle cx="19" cy="5.5" r="5" fill="#DC4F13"/> */}
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='mt-2 flex w-[520px] flex-col gap-0 rounded-xl border-2 border-[#28373E] bg-[#10191D] p-6'
        sideOffset={10}
      >
        <div className='flex items-center justify-between'>
          <span className='text-xl font-bold'>Notifications (3)</span>
          <span className='cursor-pointer text-base text-[#96B0BD]'>Mark all as read</span>
        </div>
        <Tabs className='mt-4' defaultValue='Inbox'>
          <TabsList className='h-auto w-full bg-transparent p-0'>
            <TabsTrigger
              className='h-12 w-full border-b-2 border-[#516170] bg-transparent text-base data-[state=active]:border-[#dc4f14] data-[state=active]:bg-transparent'
              value='Inbox'
            >
              Inbox
            </TabsTrigger>
            <TabsTrigger
              className='data-[state=active]:bg-transparent] flex h-12 w-full items-center gap-2 border-b-2 border-[#516170] bg-transparent text-base data-[state=active]:border-[#dc4f14]'
              value='General'
            >
              General{' '}
              <span className='rounded-xl border border-[#3E525B] px-[8px] text-[10px]'>12</span>
            </TabsTrigger>
            <TabsTrigger
              className='h-12 w-full border-b-2 border-[#516170] bg-transparent text-base data-[state=active]:border-[#dc4f14] data-[state=active]:bg-transparent'
              value='Archived'
            >
              Archived
            </TabsTrigger>
          </TabsList>
          <TabsContent className='flex flex-col gap-5' value='Inbox'>
            <div className='mt-6 flex flex-col gap-5'>
              <NotificationItem
                highlighted
                icon
                isOnline
                message='made a request related to your order'
                time='20 min ago'
                type='message'
                userImage='/assets/images/users/user-5.png'
                userName='Emily Rose'
              />
              <NotificationItem
                actions
                icon
                isOnline
                message='sent you an offer UI/UX Design'
                time='20 min ago'
                type='offer'
                userImage='/assets/images/users/user-5.png'
                userName='Emily Rose'
              />
              <NotificationItem
                icon
                message='Congrats on your new Gig!'
                time='20 min ago'
                type='general'
                userName=''
              />
              <NotificationItem
                icon
                isOnline
                message='made a request related to your order'
                time='20 min ago'
                type='message'
                userImage='/assets/images/users/user-5.png'
                userName='Emily Rose'
              />
              <div className='border-t border-[#28373E]' />
              <div className='flex justify-between'>
                <Link className='text-lg text-[#96B0BD]' href='/dashboard/inbox'>
                  See all
                </Link>
                <div className='flex gap-2'>
                  <AiOutlineSound className='cursor-pointer fill-[#96B0BD]' />
                  <IoSettingsOutline className='cursor-pointer stroke-[#96B0BD]' />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent className='flex flex-col gap-5' value='General'>
            <div className='mt-6 flex flex-col gap-5'>
              <NotificationItem
                highlighted
                icon
                isOnline
                message='made a request related to your order'
                time='20 min ago'
                type='message'
                userImage='/assets/images/users/user-5.png'
                userName='Emily Rose'
              />
              <NotificationItem
                icon
                message='Congrats on your new Gig!'
                time='20 min ago'
                type='general'
                userName=''
              />
              <NotificationItem
                icon
                isOnline
                message='made a request related to your order'
                time='20 min ago'
                type='message'
                userImage='/assets/images/users/user-5.png'
                userName='Emily Rose'
              />
            </div>
            <div className='border-t border-[#28373E]' />
            <div className='flex justify-between'>
              <Link className='text-lg text-[#96B0BD]' href='/dashboard/inbox'>
                See all
              </Link>
              <div className='flex gap-2'>
                <AiOutlineSound className='cursor-pointer fill-[#96B0BD]' />
                <IoSettingsOutline className='cursor-pointer stroke-[#96B0BD]' />
              </div>
            </div>
          </TabsContent>
          <TabsContent className='flex flex-col gap-5' value='Archived'>
            <NotificationItem
              actions
              icon
              isOnline
              message='sent you an offer UI/UX Design'
              time='20 min ago'
              type='offer'
              userImage='/assets/images/users/user-5.png'
              userName='Emily Rose'
            />
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
