'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BsPatchCheckFill } from 'react-icons/bs';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa6';
import { GoArrowUp } from 'react-icons/go';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { IoMdAttach } from 'react-icons/io';
import { TbDotsCircleHorizontal } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSocket } from '@/context/socket';
import { useCustomContext } from '@/context/use-custom';
import { useGetOneToOneMessages } from '@/hooks/useGetOneToOneMessages';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';

const MessageDetails = (props) => {
  return (
    <div
      className={`flex items-center justify-start gap-4 ${props.sender == 'me' ? 'flex-row-reverse' : ''} `}
    >
      <div className='relative h-5 min-w-5 md:h-7 md:min-w-7'>
        <img
          className='aspect-square h-full w-full rounded-full object-cover'
          src={props.user_image}
        />
      </div>
      <span className='text-sm text-[#526872]'>
        {props.date} at {props.time}
      </span>
    </div>
  );
};
const MessageText = (props) => {
  return (
    <div className={props.sender == 'me' ? 'pr-10' : 'pl-12'}>
      <div
        className={` ${
          props.sender == 'me' ? 'ml-auto rounded-tr-none' : 'mr-auto rounded-tl-none'
        } flex max-w-fit rounded-xl border border-[#526872] bg-[#28373E] p-3 text-sm font-normal`}
      >
        {props.text}
      </div>
    </div>
  );
};
// const Offer = (props) => {
//   return (
//     <div className='pr-10'>
//       <div className='flex flex-col gap-4 rounded-xl bg-[#10191D] p-5 font-normal text-[15x]'>
//         <p className='text-lg text-white'>{props.offer_description}</p>
//         <div className='border-t border-[#28373E]' />
//         <div className='flex flex-wrap gap-6'>
//           <div className='flex items-center gap-3'>
//             <GoClock className='h-5 w-5' />
//             <p className='text-[15px] text-[#96B0BD]'>{props.duration} Delivery</p>
//           </div>
//           {props.is_accepted && (
//             <div className='flex items-center gap-3'>
//               <CiCircleCheck className='h-5 w-5' />
//               <p className='text-[15px] text-[#96B0BD]'>Offer accepted</p>
//             </div>
//           )}
//           <div className='flex items-center gap-3'>
//             <CiReceipt className='h-5 w-5' />
//             <p className='text-[15px] text-[#96B0BD]'>
//               {props.price_currency}
//               {props.price}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const ChatPage = () => {
  const socket = useSocket();
  const { profileId } = useParams();
  const auth = useCustomContext();
  const [receiver, setRceiver] = useState(null);
  const [conversations, setConversation] = useState([]);
  const [input, setInput] = useState('');
  const { data: userInfo } = useGetUserInfo(profileId);
  const { data: messages } = useGetOneToOneMessages(auth?.currentProfile?._id, profileId);

  useEffect(() => {
    if (userInfo && auth?.currentProfile) {
      setRceiver({
        _id: userInfo._id,
        avatar: userInfo.avatarURL,
        isVerified: userInfo.userId?.verified || false,
        name: userInfo.fullName,
        online: userInfo.userId?.status === 'Online' ? true : false,
        starred: true,
        timestamp: userInfo.userId?.timestamp,
        unreadCount: 0,
      });

      let from = auth.currentProfile._id;
      let to = userInfo._id;

      socket.emit('getHistory', { from, to });

      socket?.on('history', (history) => {
        setConversation(history);
      });
      socket?.on('newMessage', (message) => {
        console.log({ message });
        setConversation((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket?.off('newMessage');
      };
    }
  }, [userInfo, auth?.currentProfile, socket]);

  console.log({ conversations });

  const sendMessage = () => {
    const message = {
      messageText: input,
      receiverId: receiver._id,
      senderId: auth.currentProfile._id,
    };
    socket.emit('sendMessage', message);
    setInput('');
    setConversation((prevMessages) => [...prevMessages, message]);
  };

  console.log({ receiver });

  return (
    <div className='flex h-full flex-col'>
      <style>{`
        @media(max-width: 768px) { 
          .chats_col {
            opacity: 0 !important;
            pointer-events: none;
          } 
          .chat_content {
            opacity: 1;
            pointer-events: all;
          }
        }
      `}</style>
      {receiver && (
        <>
          <div className='flex h-24 border-b border-[#28373E] px-8 mobile:px-5 mobile:py-3'>
            <div className='flex w-3/5 items-center gap-3'>
              <Link className='md:hidden' href='../inbox'>
                <FaAngleLeft />
              </Link>
              <div className='relative h-10 min-w-10'>
                <img
                  alt={receiver.name}
                  className='aspect-square h-full w-full rounded-full object-cover'
                  src={receiver.avatar}
                />
                <div
                  className={`absolute bottom-0 right-0 h-[10px] w-[10px] rounded-full ${
                    receiver.online ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <p className='flex items-center gap-3 text-nowrap text-xl font-semibold text-white mobile:text-base'>
                  {receiver.name}
                  {receiver.isVerified && <BsPatchCheckFill fill='#148fe8' />}
                </p>
                <p className='relative w-full text-nowrap text-sm text-[#526872] mobile:text-xs'>
                  @{receiver.name}
                </p>
              </div>
            </div>
            <div className='flex w-2/5 items-center justify-end gap-4'>
              <HiOutlineExclamationTriangle className='h-6 w-6 cursor-pointer stroke-[#96B0BD]' />

              {receiver.starred ? (
                <FaStar className='h-5 w-5 cursor-pointer fill-[#96B0BD]' />
              ) : (
                <FaRegStar className='h-5 w-5 cursor-pointer fill-[#96B0BD]' />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <TbDotsCircleHorizontal className='h-6 w-6 cursor-pointer stroke-[#96B0BD]' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='flex flex-col gap-1 rounded-xl border-2 border-[#28373e] bg-[#1a272c]'>
                  <DropdownMenuItem className='flex gap-2 rounded-xl py-2'>
                    <img className='w-5' src='/assets/images/icons/share.svg' />
                    <span className='text-[15px]'>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='flex gap-2 rounded-xl py-2'>
                    <img className='w-5' src='/assets/images/icons/forward.svg' />
                    <span className='text-[15px]'>Forward</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='flex gap-2 rounded-xl py-2'>
                    <img className='w-5' src='/assets/images/icons/export.svg' />
                    <span className='text-[15px]'>Export</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='flex gap-2 rounded-xl py-2'>
                    <img className='w-5' src='/assets/images/icons/delete.svg' />
                    <span className='text-[15px] text-[#DC4F13]'>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='relative flex flex-col items-center overflow-scroll'>
            <div className='flex w-full flex-col gap-9 px-8 pb-3 pt-8 mobile:px-5'>
              {conversations.map((conv, id) => (
                <div className='flex w-full flex-col gap-3' key={id}>
                  <MessageDetails
                    date={new Date(conv.timeStamp).toLocaleDateString('en-US')}
                    sender={conv.senderId === auth.currentProfile._id ? 'me' : ''}
                    time={new Date(conv.timeStamp).toLocaleTimeString('en-US')}
                    user_image={
                      conv.senderId == auth.currentProfile._id
                        ? auth.currentProfile.avatarURL
                        : receiver.avatar
                    }
                  />
                  <MessageText
                    sender={conv.senderId === auth.currentProfile._id ? 'me' : ''}
                    text={conv.messageText}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='flex h-24 w-full items-center justify-center mobile:p-2'>
            <div className='mx-auto flex h-14 w-full max-w-[684px] items-center gap-4 overflow-hidden rounded-2xl border border-[#526872] py-2 pl-4 pr-2'>
              <IoMdAttach className='h-6 w-6 cursor-pointer transition hover:fill-[#dc4f14]' />
              <textarea
                className='h-full w-full resize-none bg-transparent pt-2 outline-none placeholder:text-[#96B0BD]'
                onChange={(e) => setInput(e.target.value)}
                placeholder='Send message...'
                value={input}
              />
              <Button
                className='group rounded-xl bg-[#dc4f14] p-2 transition hover:bg-white'
                onClick={sendMessage}
              >
                <GoArrowUp className='h-full w-full fill-white group-hover:fill-black' />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPage;
