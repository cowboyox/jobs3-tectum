'use client';
import React, { useEffect, useState } from 'react';
import './layout.css';

import Link from 'next/link';
import { BsPatchCheckFill } from 'react-icons/bs';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSocket } from '@/context/socket';
import { useCustomContext } from '@/context/use-custom';
import api from '@/utils/api';

const chats_filters = [
  // Please keep value unique as it's the identifier
  { label: 'Archived', value: 'archived' },
  { label: 'Unread Messages', value: 'unread' },
  { label: 'Spam Messages', value: 'spam' },
];
// const message = [
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

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
const MessageItem = ({ message }) => {
  return (
    <Link href={'/dashboard/inbox/' + message._id} socket='socket'>
      <div className='group flex cursor-pointer gap-4 rounded-xl p-4 transition hover:bg-[#1a272c]'>
        <div className='flex w-3/5 gap-3'>
          <div className='relative h-10 min-w-10'>
            <img
              alt={message.name}
              className='aspect-square h-full w-full rounded-full object-cover'
              src={message.avatar}
            />
            <div
              className={`absolute bottom-1 right-1 h-[10px] w-[10px] rounded-full ${
                message.online ? 'bg-green-500' : 'bg-gray-500'
              }`}
            ></div>
          </div>
          <div className='flex w-full flex-col gap-2'>
            <p className='flex items-center gap-3 text-nowrap text-sm font-semibold text-white'>
              {truncateText(message.name, 9)}
              {message.isVerified && <BsPatchCheckFill fill='#148fe8' />}
            </p>
            <p className='relative w-full text-nowrap text-xs font-light text-white'>
              {truncateText(message.message, 17)}
              <span className='absolute right-0 top-0 h-full w-1/2 bg-opacity-60 bg-gradient-to-r from-transparent to-black transition group-hover:to-[#1a272c]'></span>
            </p>
          </div>
        </div>
        <div className='flex w-2/5 items-center justify-between'>
          <span className='text-xs text-[#96B0BD]'>{message.timestamp}</span>
          <div className='flex items-center gap-3'>
            {message.unreadCount > 0 && (
              <span className='rounded-full bg-[#DC4F13] px-2 py-[1px] text-xs'>
                {message.unreadCount}
              </span>
            )}
            {message.starred ? (
              <FaStar className='w-4 cursor-copy fill-[#96B0BD]' />
            ) : (
              <FaRegStar className='w-4 cursor-copy fill-[#96B0BD]' />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

const InboxPage = ({ children }) => {
  const auth = useCustomContext();
  const [users, setUsers] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (auth.user) {
      socket.emit('add-user', auth.user._id);
    }
  }, [auth, socket]);

  useEffect(() => {
    if (auth.user) {
      try {
        api.get(`/api/v1/user/get-all-users`).then((res) => {
          let data = res.data;
          for (let i = 0; i < data.length; i++) {
            if (data[i]._id == auth.user._id) {
              data.splice(i, 1);
              i--;
              continue;
            }
            (data[i].id = i),
              (data[i].name = data[i].chosen_visible_name),
              (data[i].isVerified = true),
              (data[i].avatar = '/assets/images/users/user-14.png'),
              (data[i].online = true),
              (data[i].unreadCount = 0),
              (data[i].starred = true),
              (data[i].message = ''),
              (data[i].timestamp = ''),
              (data[i].starred = true);
          }
          setUsers(Array.isArray(res.data) ? res.data : []);
          setFilteredUsers(Array.isArray(res.data) ? res.data : []);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [auth]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = users.filter(
      (user) => user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

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
      <div className='inbox-container flex w-full overflow-hidden'>
        <div className='mobile:p-3 left-o top-0x mobile:h-full chats_col absolute flex w-full flex-col gap-4 border-r border-[#28373E] p-6 md:relative md:w-1/3'>
          {/* Search chats */}
          <div className='flex h-auto items-center rounded-xl border border-[#526872] px-4'>
            <IoIosSearch />
            <input
              className='h-12 w-full bg-transparent pl-4 text-base outline-none'
              onChange={handleSearch}
              placeholder='Search'
              value={searchTerm}
            />
          </div>
          {/* Filter Chats */}
          <Select className='w-full'>
            <SelectTrigger className='w-full gap-2 rounded-[8px] bg-[#1a272c] px-2 text-left text-[#A0B4C0] md:px-4'>
              <SelectValue placeholder='All Messages' />
            </SelectTrigger>
            <SelectContent className='rounded-xl bg-[#1a272c]'>
              {chats_filters.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Chats */}
          <div className='flex flex-col gap-2 overflow-scroll'>
            {filteredUsers &&
              filteredUsers.map((message, index) => <MessageItem key={index} message={message} />)}
          </div>
        </div>
        <div className='mobile:h-full chat_content w-full transition md:w-2/3 md:translate-x-0'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
