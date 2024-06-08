import React from 'react';
import './layout.css';

import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { IoIosSearch } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";

const chats_filters = [
  // Please keep value unique as it's the identifier
  { label: 'Archived', value: 'archived'}, 
  { label: 'Unread Messages', value: 'unread'}, 
  { label: 'Spam Messages', value: 'spam'}, 
]
const messages = [
  {
    id: 1,
    user: {
      name: "Emily Rose",
      username: 'emily_rose',
      avatar: "/assets/images/users/user-6.png",
      online: true,
      isVerified: true,
    },
    message: "Thank you for your help!",
    timestamp: "4 hours",
    unreadCount: 3,
    starred: true,
  },
  {
    id: 2,
    user: {
      name: "John Doe",
      username: 'john_doe',
      avatar: "/assets/images/users/user-7.png",
      online: false,
      isVerified: true,
    },
    message: "Can we reschedule our meeting?",
    timestamp: "2 hours",
    unreadCount: 1,
    starred: false,
  },
  {
    id: 3,
    user: {
      name: "Anna Smith",
      username: 'anna_smith',
      avatar: "/assets/images/users/user-8.png",
      online: true,
      isVerified: false,
    },
    message: "I'll send the report by tomorrow.",
    timestamp: "1 day",
    unreadCount: 0,
    starred: true,
  },
  {
    id: 4,
    user: {
      name: "Michael Brown",
      username: 'michael_brown',
      avatar: "/assets/images/users/user-9.png",
      online: false,
      isVerified: false,
    },
    message: "Looking forward to our meeting.",
    timestamp: "3 days",
    unreadCount: 5,
    starred: true,
  },
  {
    id: 5,
    user: {
      name: "Lisa Johnson",
      username: 'lisa_johnson',
      avatar: "/assets/images/users/user-10.png",
      online: true,
      isVerified: false,
    },
    message: "Please review the attached document.",
    timestamp: "6 hours",
    unreadCount: 2,
    starred: false,
  },
  {
    id: 6,
    user: {
      name: "David Wilson",
      username: 'david_wilson',
      avatar: "/assets/images/users/user-11.png",
      online: true,
      isVerified: true,
    },
    message: "Happy to assist with your inquiry.",
    timestamp: "1 hour",
    unreadCount: 0,
    starred: false,
  },
  {
    id: 7,
    user: {
      name: "Sophia Lee",
      username: 'sophia_lee',
      avatar: "/assets/images/users/user-12.png",
      online: false,
      isVerified: true,
    },
    message: "Can you provide more details?",
    timestamp: "2 days",
    unreadCount: 4,
    starred: true,
  },
  {
    id: 8,
    user: {
      name: "James Martinez",
      username: 'james_martinez',
      avatar: "/assets/images/users/user-13.png",
      online: true,
      isVerified: false,
    },
    message: "I've updated the project status.",
    timestamp: "5 hours",
    unreadCount: 0,
    starred: false,
  },
  {
    id: 9,
    user: {
      name: "Mia Clark",
      username: 'mida_clark',
      avatar: "/assets/images/users/user-14.png",
      online: true,
      isVerified: true,
    },
    message: "Thank you for the prompt response.",
    timestamp: "8 hours",
    unreadCount: 1,
    starred: true,
  },
];

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
const MessageItem = ({ message }) => {
  return (
    <Link href={'/dashboard/inbox/' + message.user.username}>
        <div className="p-4 cursor-pointer flex gap-4 transition hover:bg-[#1a272c] group rounded-xl">
        <div className="w-3/5 flex gap-3">
            <div className="min-w-10 h-10 relative">
                <img
                    src={message.user.avatar}
                    alt={message.user.name}
                    className="rounded-full w-full h-full aspect-square object-cover"
                />
                <div
                    className={`rounded-full h-[10px] w-[10px] absolute right-1 bottom-1 ${
                    message.user.online ? "bg-green-500" : "bg-gray-500"
                    }`}
                ></div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <p className="text-white font-semibold text-sm flex gap-3 items-center text-nowrap"> 
                    {truncateText(message.user.name, 9)}
                    {message.user.isVerified && (
                    <BsPatchCheckFill fill='#148fe8' /> 
                    )}
                </p>
                <p className="text-white font-light text-xs text-nowrap relative w-full ">
                    {truncateText(message.message, 17)}
                    <span className='w-1/2 bg-gradient-to-r from-transparent to-black transition group-hover:to-[#1a272c] bg-opacity-60 absolute right-0 top-0 h-full'></span>
                </p>
            </div>
        </div>
        <div className="w-2/5 flex justify-between items-center">
          <span className="text-[#96B0BD] text-xs">{message.timestamp}</span>
          <div className="flex items-center gap-3">
          {message.unreadCount > 0 && (
            <span className="bg-[#DC4F13] text-xs py-[1px] px-2 rounded-full">
            {message.unreadCount}
            </span>
          )}
          {message.starred ? (
              <FaStar className="fill-[#96B0BD] cursor-copy w-4" />
          ) : (
              <FaRegStar className="fill-[#96B0BD] cursor-copy w-4" />
          )}
          </div>
        </div>
        </div>
    </Link>
  );
};

const InboxPage = ({ children }) => {
  return (
    <div className='inbox-page border-t border-[#28373E]'>
    {/* 
      * Selmani NOTE:
      * I used this basic method to toggle chat on mobile which works just fine
      * Any better method is welcome as well :)
    */}
      <style>{`
        @media(max-width: 768px) { 
          .chats_col {
            opacity: 1;
            pointer-events: all;
          } 
          .chat_content {
            opacity: 0;
            pointer-events: none;
          }
        }
      `}</style>
      <div className='flex overflow-hidden w-full inbox-container'>
        <div className='w-full md:w-1/3 border-r border-[#28373E] p-6 mobile:p-3 flex flex-col gap-4 absolute md:relative left-o top-0x mobile:h-full chats_col'>
          {/* Search chats */}
          <div className='flex h-auto px-4 items-center border border-[#526872] rounded-xl'>
            <IoIosSearch />
            <input className='w-full h-12 pl-4 bg-transparent text-base outline-none' placeholder='Search' />
          </div>
          {/* Filter Chats */}
          <Select className="w-full">
            <SelectTrigger className='bg-[#1a272c] text-[#A0B4C0] rounded-[8px] gap-2 w-full px-2 md:px-4 text-left'>
              <SelectValue placeholder='All Messages' />
            </SelectTrigger>
            <SelectContent className='bg-[#1a272c] rounded-xl'>
              {chats_filters.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Chats */}
          <div className="flex flex-col gap-2 overflow-scroll">
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </div>
        </div>
        <div className="w-full md:w-2/3 md:translate-x-0 transition mobile:h-full chat_content">
          { children }
        </div>
      </div>
    </div>
  )
}

export default InboxPage