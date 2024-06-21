'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { BsPatchCheckFill } from "react-icons/bs";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { GoClock } from "react-icons/go";
import { CiCircleCheck } from "react-icons/ci";
import { CiReceipt } from "react-icons/ci";
import { IoMdAttach } from "react-icons/io";
import { GoArrowUp } from "react-icons/go";
import { FaAngleLeft } from "react-icons/fa6";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

import { useCustomContext } from "@/context/use-custom";
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

const MessageDetails = (props)=> {
  return (
    <div className={`
      flex items-center gap-4 justify-start
      ${props.sender == 'me' ? 'flex-row-reverse' : ''}
    `}>
      <div className="min-w-5 h-5 md:min-w-7 md:h-7 relative">
        <img
          src={props.user_image}
          className="rounded-full w-full h-full aspect-square object-cover"
        />
      </div>
      <span className='text-[#526872] text-sm'>
        {props.date} at {props.time}
      </span>
    </div> 
  )
}
const MessageText = (props)=> {
  return (
    <div className={props.sender == "me" ? 'pr-10' : 'pl-12'}> 
      <div className={`
        ${props.sender == "me" 
          ? 'rounded-tr-none ml-auto' 
          : 'rounded-tl-none mr-auto'} 
        flex text-sm p-3 font-normal rounded-xl bg-[#28373E] border border-[#526872] max-w-fit
      `}>
        {props.text}
      </div>
    </div>
  )
}
const Offer = (props)=> {
  return (
    <div className='pr-10'>
      <div className="flex flex-col gap-4 text-[15x] p-5 font-normal rounded-xl bg-[#10191D]">
        <p className="text-white text-lg">
          {props.offer_description}
        </p>
        <div className='border-t border-[#28373E]'></div>
        <div className="flex gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <GoClock className='w-5 h-5' />
            <p className='text-[#96B0BD] text-[15px]'>
              {props.duration} Delivery
            </p>
          </div>
          {props.is_accepted && (
            <div className="flex items-center gap-3">
              <CiCircleCheck className='w-5 h-5' />
              <p className='text-[#96B0BD] text-[15px]'>
                Offer accepted
              </p>
            </div>
          )}
          <div className="flex items-center gap-3">
            <CiReceipt className='w-5 h-5' />
            <p className='text-[#96B0BD] text-[15px]'>
              {props.price_currency}{props.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ChatPage = (parameters) => {
  const socket = useSocket();
  const auth = useCustomContext();
  const [receiver, setRceiver] = useState(null)
  const [conversations, setConversation] = useState([])
  const [input, setInput] = useState('')
  useEffect(() => {
    api.get(`/api/v1/user/get-user/${parameters.params.contact_username}`)
    .then((res) => {
      let data = res.data
      data.name = data.chosen_visible_name,
      data.isVerified = true,
      data.avatar = '/assets/images/users/user-14.png',
      data.online = true,
      data.unreadCount = 0,
      data.starred = true,
      data.message = "",
      data.timestamp = "",
      data.starred = true
      setRceiver(data)
      if (auth.user){
        let from = auth.user._id
        let to = data._id
        socket.emit('getHistory', { from, to})
      }
    })

    socket?.on('history', (history) => {
      setConversation(history);
    });
    // Handle incoming messages
    socket?.on('newMessage', (message) => {
      setConversation((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket?.off('newMessage');
    };
  }, [auth])

  const sendMessage = () => {
    const message = { senderId: auth.user._id, receiverId : receiver._id, messageText: input };
    socket.emit('sendMessage', message);
    setInput('');
    setConversation((prevMessages) => [...prevMessages, message]);
  }

  return (
    <div className='flex flex-col h-full'>
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
        {receiver && 
         ( 
          <>
            {/* Chat header */}
            <div className="flex px-8 border-b border-[#28373E] h-24 mobile:py-3 mobile:px-5">
              <div className="w-3/5 flex items-center gap-3">
                <Link href="../inbox" className='md:hidden'>
                  <FaAngleLeft />
                </Link>
                <div className="min-w-10 h-10 relative">
                  <img
                      src={receiver.avatar}
                      alt={receiver.name}
                      className="rounded-full w-full h-full aspect-square object-cover"
                  />
                  <div
                      className={`rounded-full h-[10px] w-[10px] absolute right-0 bottom-0 ${
                        receiver.online ? "bg-green-500" : "bg-gray-500"
                      }`}
                  ></div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-white font-semibold text-xl flex gap-3 items-center text-nowrap mobile:text-base"> 
                    {receiver.name}
                    {receiver.isVerified && (
                      <BsPatchCheckFill fill='#148fe8' /> 
                    )}
                  </p>
                  <p className="text-[#526872] text-sm text-nowrap relative w-full mobile:text-xs">
                      @{receiver.name}
                  </p>
                </div>
              </div>
              <div className="w-2/5 flex justify-end items-center gap-4">
                <HiOutlineExclamationTriangle className="stroke-[#96B0BD] w-6 h-6 cursor-pointer" />

                {receiver.starred ? (
                  <FaStar className="fill-[#96B0BD] w-5 h-5 cursor-pointer" />
                ) : (
                  <FaRegStar className="fill-[#96B0BD] w-5 h-5 cursor-pointer" />
                )} 
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <TbDotsCircleHorizontal className='w-6 h-6 cursor-pointer stroke-[#96B0BD]' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-xl bg-[#1a272c] border-2 border-[#28373e] flex flex-col gap-1"> 
                    <DropdownMenuItem className='py-2 rounded-xl flex gap-2'>
                      <img 
                        src="/assets/images/icons/share.svg"
                        className='w-5' 
                      />
                      <span className='text-[15px]'>
                        Share
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='py-2 rounded-xl flex gap-2'>
                      <img 
                        src="/assets/images/icons/forward.svg"
                        className='w-5' 
                      />
                      <span className='text-[15px]'>
                        Forward
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='py-2 rounded-xl flex gap-2'>
                      <img 
                        src="/assets/images/icons/export.svg"
                        className='w-5' 
                      />
                      <span className='text-[15px]'>
                        Export
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='py-2 rounded-xl flex gap-2'>
                      <img 
                        src="/assets/images/icons/delete.svg"
                        className='w-5' 
                      />
                      <span className='text-[#DC4F13] text-[15px]'>
                        Delete
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {/* Chat Content */}
            <div className="flex flex-col items-center relative overflow-scroll">
              <div className="max-w-[464px] flex flex-col gap-9 pt-8 pb-3 mobile:px-5">
                {/* Chat */}
                {conversations.map((conv, id) => (
                  <div className="flex flex-col gap-3" key={id}> 
                    <MessageDetails 
                      user_image='/assets/images/users/user-6.png'
                      date='17 May 2024'
                      time='17:37'
                      sender = {conv.senderId == auth.user._id ? "me" : ""}
                    />
                    <MessageText text={conv.messageText} />
                  </div>
                ) )}
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
            <div className="w-full h-24 flex items-center justify-center mobile:p-2">
              <div className="w-full py-2 max-w-[684px] mx-auto flex border rounded-2xl border-[#526872] h-14 overflow-hidden pl-4 pr-2 items-center gap-4">
                <IoMdAttach className='w-6 h-6 cursor-pointer hover:fill-[#dc4f14] transition' />
                <textarea placeholder='Send message...' className='w-full h-full bg-transparent pt-2 placeholder:text-[#96B0BD] outline-none resize-none' value={input} onChange={(e) => setInput(e.target.value)}/>
                <Button className='rounded-xl bg-[#dc4f14] p-2 hover:bg-white transition group' onClick={sendMessage}>
                  <GoArrowUp className='w-full h-full fill-white group-hover:fill-black' />
                </Button>
              </div>
            </div>
          </>
        )}
      {/* ))} */}
    </div>
  )
}

export default ChatPage
