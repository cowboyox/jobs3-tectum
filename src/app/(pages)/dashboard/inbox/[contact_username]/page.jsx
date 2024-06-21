'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { BsPatchCheckFill } from 'react-icons/bs';
import { TbDotsCircleHorizontal } from 'react-icons/tb';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { GoClock } from 'react-icons/go';
import { CiCircleCheck } from 'react-icons/ci';
import { CiReceipt } from 'react-icons/ci';
import { IoMdAttach } from 'react-icons/io';
import { GoArrowUp } from 'react-icons/go';
import { FaAngleLeft } from 'react-icons/fa6';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { useCustomContext } from '@/context/use-custom';
import api from '@/utils/api';
import { useSocket } from '@/context/socket';

/* For backend:
 * I used the same messages from the parent to simulate like a backend query
 * But this needs to be changed for sure
 */
// const messages = [
//   {
//     id: 1,
//     user: {
//       name: "Emily Rose",
//       username: 'emily_rose',
//       avatar: "/assets/images/users/user-6.png",
//       online: true,
//       isVerified: true,
//     },
//     message: "Thank you for your help!",
//     timestamp: "4 hours",
//     unreadCount: 3,
//     starred: true,
//   },
//   {
//     id: 2,
//     user: {
//       name: "John Doe",
//       username: 'john_doe',
//       avatar: "/assets/images/users/user-7.png",
//       online: false,
//       isVerified: true,
//     },
//     message: "Can we reschedule our meeting?",
//     timestamp: "2 hours",
//     unreadCount: 1,
//     starred: false,
//   },
//   {
//     id: 3,
//     user: {
//       name: "Anna Smith",
//       username: 'anna_smith',
//       avatar: "/assets/images/users/user-8.png",
//       online: true,
//       isVerified: false,
//     },
//     message: "I'll send the report by tomorrow.",
//     timestamp: "1 day",
//     unreadCount: 0,
//     starred: true,
//   },
//   {
//     id: 4,
//     user: {
//       name: "Michael Brown",
//       username: 'michael_brown',
//       avatar: "/assets/images/users/user-9.png",
//       online: false,
//       isVerified: false,
//     },
//     message: "Looking forward to our meeting.",
//     timestamp: "3 days",
//     unreadCount: 5,
//     starred: true,
//   },
//   {
//     id: 5,
//     user: {
//       name: "Lisa Johnson",
//       username: 'lisa_johnson',
//       avatar: "/assets/images/users/user-10.png",
//       online: true,
//       isVerified: false,
//     },
//     message: "Please review the attached document.",
//     timestamp: "6 hours",
//     unreadCount: 2,
//     starred: false,
//   },
//   {
//     id: 6,
//     user: {
//       name: "David Wilson",
//       username: 'david_wilson',
//       avatar: "/assets/images/users/user-11.png",
//       online: true,
//       isVerified: true,
//     },
//     message: "Happy to assist with your inquiry.",
//     timestamp: "1 hour",
//     unreadCount: 0,
//     starred: false,
//   },
//   {
//     id: 7,
//     user: {
//       name: "Sophia Lee",
//       username: 'sophia_lee',
//       avatar: "/assets/images/users/user-12.png",
//       online: false,
//       isVerified: true,
//     },
//     message: "Can you provide more details?",
//     timestamp: "2 days",
//     unreadCount: 4,
//     starred: true,
//   },
//   {
//     id: 8,
//     user: {
//       name: "James Martinez",
//       username: 'james_martinez',
//       avatar: "/assets/images/users/user-13.png",
//       online: true,
//       isVerified: false,
//     },
//     message: "I've updated the project status.",
//     timestamp: "5 hours",
//     unreadCount: 0,
//     starred: false,
//   },
//   {
//     id: 9,
//     user: {
//       name: "Mia Clark",
//       username: 'mida_clark',
//       avatar: "/assets/images/users/user-14.png",
//       online: true,
//       isVerified: true,
//     },
//     message: "Thank you for the prompt response.",
//     timestamp: "8 hours",
//     unreadCount: 1,
//     starred: true,
//   },
// ];

const MessageDetails = (props) => {
  return (
    <div
      className={`flex items-center justify-start gap-4 ${props.sender == 'me' ? 'flex-row-reverse' : ''} `}
    >
      <div className='relative h-5 min-w-5 md:h-7 md:min-w-7'>
        <img
          src={props.user_image}
          className='aspect-square h-full w-full rounded-full object-cover'
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
const Offer = (props) => {
  return (
    <div className='pr-10'>
      <div className='flex flex-col gap-4 rounded-xl bg-[#10191D] p-5 font-normal text-[15x]'>
        <p className='text-lg text-white'>{props.offer_description}</p>
        <div className='border-t border-[#28373E]'></div>
        <div className='flex flex-wrap gap-6'>
          <div className='flex items-center gap-3'>
            <GoClock className='h-5 w-5' />
            <p className='text-[15px] text-[#96B0BD]'>{props.duration} Delivery</p>
          </div>
          {props.is_accepted && (
            <div className='flex items-center gap-3'>
              <CiCircleCheck className='h-5 w-5' />
              <p className='text-[15px] text-[#96B0BD]'>Offer accepted</p>
            </div>
          )}
          <div className='flex items-center gap-3'>
            <CiReceipt className='h-5 w-5' />
            <p className='text-[15px] text-[#96B0BD]'>
              {props.price_currency}
              {props.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatPage = (parameters) => {
  const socket = useSocket();
  const auth = useCustomContext();
  const [receiver, setRceiver] = useState(null);
  const [conversations, setConversation] = useState([]);
  const [input, setInput] = useState('');
  useEffect(() => {
    api.get(`/api/v1/user/get-user/${parameters.params.contact_username}`).then((res) => {
      let data = res.data;
      (data.name = data.chosen_visible_name),
        (data.isVerified = true),
        (data.avatar = '/assets/images/users/user-14.png'),
        (data.online = true),
        (data.unreadCount = 0),
        (data.starred = true),
        (data.message = ''),
        (data.timestamp = ''),
        (data.starred = true);
      setRceiver(data);
      if (auth.user) {
        let from = auth.user._id;
        let to = data._id;
        socket.emit('getHistory', { from, to });
      }
    });

    socket?.on('history', (history) => {
      setConversation(history);
    });
    // Handle incoming messages
    socket?.on('newMessage', (message) => {
      setConversation((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket?.off('newMessage');
      socket?.off('history');
    };
  }, [auth]);

  const sendMessage = () => {
    const message = { senderId: auth.user._id, receiverId: receiver._id, messageText: input };
    socket.emit('sendMessage', message);
    setInput('');
    setConversation((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className='flex h-full flex-col'>
      {/*
       * Selmani NOTE:
       * I used this basic method to toggle chat on mobile which works just fine
       * Any better method is welcome as well :)
       */}
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
      {/* {messages.map((chat)=> (
        chat.user.username == parameters.params.contact_username && */}
      {receiver && (
        <>
          {/* Chat header */}
          <div className='flex h-24 border-b border-[#28373E] px-8 mobile:px-5 mobile:py-3'>
            <div className='flex w-3/5 items-center gap-3'>
              <Link href='../inbox' className='md:hidden'>
                <FaAngleLeft />
              </Link>
              <div className='relative h-10 min-w-10'>
                <img
                  src={receiver.avatar}
                  alt={receiver.name}
                  className='aspect-square h-full w-full rounded-full object-cover'
                />
                <div
                  className={`absolute bottom-0 right-0 h-[10px] w-[10px] rounded-full ${
                    receiver.online ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                ></div>
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
                    <img src='/assets/images/icons/share.svg' className='w-5' />
                    <span className='text-[15px]'>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='flex gap-2 rounded-xl py-2'>
                    <img src='/assets/images/icons/forward.svg' className='w-5' />
                    <span className='text-[15px]'>Forward</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='flex gap-2 rounded-xl py-2'>
                    <img src='/assets/images/icons/export.svg' className='w-5' />
                    <span className='text-[15px]'>Export</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='flex gap-2 rounded-xl py-2'>
                    <img src='/assets/images/icons/delete.svg' className='w-5' />
                    <span className='text-[15px] text-[#DC4F13]'>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* Chat Content */}
          <div className='relative flex flex-col items-center overflow-scroll'>
            <div className='flex max-w-[464px] flex-col gap-9 pb-3 pt-8 mobile:px-5'>
              {/* Chat */}
              {conversations.map((conv, id) => (
                <div className='flex flex-col gap-3' key={id}>
                  <MessageDetails
                    user_image='/assets/images/users/user-6.png'
                    date='17 May 2024'
                    time='17:37'
                    sender={conv.senderId == auth.user._id ? 'me' : ''}
                  />
                  <MessageText text={conv.messageText} />
                </div>
              ))}
              {/* <div className="flex flex-col gap-3"> 
                  <MessageDetails 
                    user_image='/assets/images/users/user-6.png'
                    date='17 May 2024'
                    time='17:37'
                  />
                  <MessageText text="Thank you for sharing. Based on the statistics from a total of 13 pages, the total word count to be translated is 5250, right?" />
                </div> 
                <div className="flex flex-col gap-3"> 
                  <MessageDetails 
                    user_image='/assets/images/users/user-5.png'
                    date='17 May 2024'
                    time='17:37'
                    sender='me'
                  />
                  <Offer 
                    offer_description='Translate english to simplified mandarian traditional chinese'
                    is_accepted={true}
                    duration="3 Days"
                    price={448}
                    price_currency="$"
                  />
                </div>
                <div className="flex flex-col gap-3"> 
                  <MessageDetails 
                    user_image='/assets/images/users/user-6.png'
                    date='17 May 2024'
                    time='17:37' 
                  />
                  <MessageText text="Hi, Thanks again for your order! Your delivery is enclosed. If there are any problems, please let me know. I'll get back to you as soon as I can." />
                </div> 
                <div className="flex flex-col gap-3"> 
                  <MessageDetails 
                    user_image='/assets/images/users/user-5.png'
                    date='17 May 2024'
                    time='17:37' 
                    sender="me"
                  />
                  <MessageText text="Thank you for your work, Emily!" sender="me" />
                </div>  */}
            </div>
          </div>
          {/* Message Input */}
          <div className='flex h-24 w-full items-center justify-center mobile:p-2'>
            <div className='mx-auto flex h-14 w-full max-w-[684px] items-center gap-4 overflow-hidden rounded-2xl border border-[#526872] py-2 pl-4 pr-2'>
              <IoMdAttach className='h-6 w-6 cursor-pointer transition hover:fill-[#dc4f14]' />
              <textarea
                placeholder='Send message...'
                className='h-full w-full resize-none bg-transparent pt-2 outline-none placeholder:text-[#96B0BD]'
                value={input}
                onChange={(e) => setInput(e.target.value)}
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
      {/* ))} */}
    </div>
  );
};

export default ChatPage;
