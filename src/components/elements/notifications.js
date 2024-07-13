import React from 'react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GoInbox } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineSound } from "react-icons/ai";
import { CiBellOn } from 'react-icons/ci';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const NotificationItem = ({ type, userImage, userName, message, time, icon, isOnline, actions, highlighted }) => {
  return (
    <div className={`p-4 flex ${type === 'offer' ? 'flex-col' : 'flex-row'} gap-4 ${highlighted ? 'bg-[#C440081F]' : 'bg-[#1a272c] transition hover:bg-[#162126]'} rounded-xl`}>
        <div className='flex w-full gap-4 items-start'>  
            <div className='relative w-20 md:h-12 md:w-12'>
                {userImage ? (
                <img
                    className='w-full h-full rounded-full aspect-square'
                    src={userImage}
                />
                ) : (
                <div className='relative w-full h-full bg-[#28373E] flex items-center justify-center rounded-full aspect-square'>
                  <CiBellOn className='w-6 h-6 fill-[#96B0BD]' />
                </div>
                )}
                {isOnline && (
                <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full' />
                )}
            </div>
            <div className='flex flex-col gap-2 w-full'> 
                <p className={`text-sm ${type === 'general' ? 'text-white font-bold' : 'text-[#96B0BD]'}`}>
                <strong className='text-white'>{userName}</strong> {message}
                </p>
                <p className='text-[#96B0BD] text-xs'>{time}</p>
            </div>
            {icon && !highlighted && <GoInbox className='w-5 h-5 fill-[#96B0BD] my-auto ml-auto cursor-pointer' />}
            {highlighted && <div className='w-3 h-3 bg-[#DC4F13] rounded-full my-auto ml-auto' />}
        </div>
        {actions && (
            <>
            <div className='border-t border-[#28373E]' />
            <div className="flex gap-3 p-2 rounded-2xl bg-[#10191D] w-auto ml-auto">
                <div className="w-auto px-8 py-3 text-center text-white transition cursor-pointer rounded-2xl mobile:py-3 hover:bg-white hover:text-black">
                Reject
                </div>
                <div className="w-auto px-8 rounded-xl bg-[#DC4F13] text-white py-3 mobile:py-3 text-center cursor-pointer">
                Accept
                </div>
            </div>
            </>
        )}
    </div>
  );
};

const Notifications = ({ className }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <div className='cursor-pointer rounded-xl bg-[#10191D] p-3'>
          <CiBellOn className='w-7 h-7 fill-[#96B0BD]' /> 
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10} align='end' className='mt-2 w-[520px] mobile:w-[95vw] mobile:ml-[2.5vw] mobile:h-[80vh] mobile:overflow-y-scroll flex flex-col gap-0 rounded-xl border-2 border-[#28373E] bg-[#10191D] p-6'>
        <div className="flex items-center justify-between">
          <span className='text-xl font-bold'>Notifications (3)</span>
          <span className='text-base text-[#96B0BD] cursor-pointer'>Mark all as read</span>
        </div>
        <Tabs className='mt-4' defaultValue='Inbox'>
          <TabsList className='w-full h-auto p-0 bg-transparent'>
            <TabsTrigger 
              className='w-full h-12 text-base bg-transparent border-b-2 border-[#516170] data-[state=active]:border-[#dc4f14] data-[state=active]:bg-transparent' 
              value="Inbox">
              Inbox
            </TabsTrigger>
            <TabsTrigger 
              className='w-full flex items-center gap-2 h-12 text-base bg-transparent border-b-2 border-[#516170] data-[state=active]:border-[#dc4f14] data-[state=active]:bg-transparent]' 
              value="General">
              General <span className='px-[8px] border border-[#3E525B] rounded-xl text-[10px]'>12</span>
            </TabsTrigger>
            <TabsTrigger 
              className='w-full h-12 text-base bg-transparent border-b-2 border-[#516170] data-[state=active]:border-[#dc4f14] data-[state=active]:bg-transparent' 
              value="Archived">
              Archived
            </TabsTrigger>
          </TabsList>
          <TabsContent className='flex flex-col gap-5' value='Inbox'>
            <div className='flex flex-col gap-5 mt-6'>
                <NotificationItem 
                    type="message"
                    userImage="/assets/images/users/user-5.png"
                    userName="Emily Rose"
                    message="made a request related to your order"
                    time="20 min ago"
                    icon
                    isOnline
                    highlighted
                />
                <NotificationItem 
                    type="offer"
                    userImage="/assets/images/users/user-5.png"
                    userName="Emily Rose"
                    message="sent you an offer UI/UX Design"
                    time="20 min ago"
                    icon
                    isOnline
                    actions
                />
                <NotificationItem 
                    type="general"
                    userName=""
                    icon
                    message="Congrats on your new Gig!"
                    time="20 min ago"
                />
                <NotificationItem 
                    type="message"
                    userImage="/assets/images/users/user-5.png"
                    userName="Emily Rose"
                    message="made a request related to your order"
                    time="20 min ago"
                    icon
                    isOnline
                />
                <div className='border-t border-[#28373E]' />
                <div className='flex justify-between'>
                <Link className='text-[#96B0BD] text-lg' href="/dashboard/client/inbox">See all</Link>
                <div className='flex gap-2'>
                    <AiOutlineSound className='fill-[#96B0BD] cursor-pointer' />
                    <IoSettingsOutline className='stroke-[#96B0BD] cursor-pointer' /> 
                </div>
                </div>
            </div>
          </TabsContent> 
          <TabsContent className='flex flex-col gap-5' value='General'>
            <div className='flex flex-col gap-5 mt-6'> 
                <NotificationItem 
                type="message"
                userImage="/assets/images/users/user-5.png"
                userName="Emily Rose"
                message="made a request related to your order"
                time="20 min ago"
                icon
                isOnline
                highlighted
                /> 
                <NotificationItem 
                type="general"
                userName=""
                icon
                message="Congrats on your new Gig!"
                time="20 min ago"
                />
                <NotificationItem 
                    type="message"
                    userImage="/assets/images/users/user-5.png"
                    userName="Emily Rose"
                    message="made a request related to your order"
                    time="20 min ago"
                    icon
                    isOnline
                />
            </div>
            <div className='border-t border-[#28373E]' />
            <div className='flex justify-between'>
              <Link className='text-[#96B0BD] text-lg' href="/dashboard/client/inbox">See all</Link>
              <div className='flex gap-2'>
                <AiOutlineSound className='fill-[#96B0BD] cursor-pointer' />
                <IoSettingsOutline className='stroke-[#96B0BD] cursor-pointer' /> 
              </div>
            </div>
          </TabsContent> 
          <TabsContent className='flex flex-col gap-5' value='Archived'>
            <NotificationItem 
              type="offer"
              userImage="/assets/images/users/user-5.png"
              userName="Emily Rose"
              message="sent you an offer UI/UX Design"
              time="20 min ago"
              icon
              isOnline
              actions
            />
          </TabsContent> 
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Notifications