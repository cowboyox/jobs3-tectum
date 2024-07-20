'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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
import { useToast } from '@/components/ui/use-toast';
import { useSocket } from '@/context/socket';
import { useCustomContext } from '@/context/use-custom';
import { useGetMembersWithMessages } from '@/hooks/useGetMembersWithMessages';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import api from '@/utils/api';
import { APIS, DEFAULT_AVATAR, USER_ROLE } from '@/utils/constants';
import { timeDifference } from '@/utils/Helpers';
import './layout.css';

const chats_filters = [
  { label: 'Archived', value: 'archived' },
  { label: 'Unread Messages', value: 'unread' },
  { label: 'Spam Messages', value: 'spam' },
];

const truncateText = (text, maxLength) => {
  return text?.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
const MessageItem = ({ user }) => {
  const auth = useCustomContext();
  const pathname = usePathname();
  const socket = useSocket();
  const { toast } = useToast();
  const [isSelected, setIsSelected] = useState(false);
  const [unReadCount, setUnReadCount] = useState(0);
  const [lastMessage, setLastMessage] = useState();
  const [userStatusColor, setUserStatusColor] = useState('bg-gray-500');
  const { data: usersWithMessages, refetch } = useGetMembersWithMessages(auth?.currentProfile?._id);
  const { data: currentProfile, refetch: refetchUserInfo } = useGetUserInfo(
    auth?.currentProfile?._id
  );

  useEffect(() => {
    if (pathname?.split('/').pop() === user._id) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [pathname, user._id]);

  useEffect(() => {
    setUserStatusColor(
      user.status === 'online'
        ? 'bg-green-500'
        : user.status === 'idle'
          ? 'bg-yellow-500'
          : 'bg-gray-500'
    );
  }, [user.status]);

  useEffect(() => {
    if (isSelected) {
      socket.emit('readMessage', { from: user._id, to: auth.currentProfile._id });
      setUnReadCount(0);
    }
  }, [auth?.currentProfile?._id, isSelected, socket, user._id]);

  useEffect(() => {
    socket.on('messagesRead', (data) => {
      if (data.senderId === user._id && data.receiverId === auth?.currentProfile?._id) {
        refetch();
      }
    });
  }, [socket, auth?.currentProfile?._id, user._id, refetch]);

  useEffect(() => {
    if (auth?.lastMessage?.get(user._id)) {
      setLastMessage(auth.lastMessage.get(user._id));
    }
  }, [auth?.lastMessage, user._id]);

  useEffect(() => {
    socket.on('statusChanged', ({ userId, status }) => {
      if (userId === user._id) {
        setUserStatusColor(
          status === 'online' ? 'bg-green-500' : status === 'idle' ? 'bg-yellow-500' : 'bg-gray-500'
        );
      }
    });

    return () => {
      socket.off('statusChanged');
    };
  }, [socket, user._id]);

  useEffect(() => {
    if (currentProfile && auth) {
      auth.setCurrentProfile(currentProfile);
    }
  }, [currentProfile, auth]);

  useEffect(() => {
    if (usersWithMessages?.messages && auth?.currentProfile?._id) {
      const unReadCount = usersWithMessages.messages.filter(
        (message) =>
          message.senderId._id === user._id &&
          message.receiverId._id === auth.currentProfile._id &&
          !message.read
      ).length;

      if (usersWithMessages.messages.length > 0) {
        setLastMessage(usersWithMessages.messages[usersWithMessages.messages.length - 1]);
      }

      setUnReadCount(unReadCount);
    }
  }, [usersWithMessages?.messages, auth.currentProfile._id, user._id]);

  const handleAddFavorite = async () => {
    if (auth?.currentProfile?._id) {
      api
        .put(`${APIS.ADD_FAVORITES}/${auth.currentProfile._id}/${user._id}`)
        .then(async () => {
          await refetchUserInfo();

          return toast({
            className:
              'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
            description: <h3>Successfully added to favorites</h3>,
            title: <h1 className='text-center'>Success</h1>,
            variant: 'default',
          });
        })
        .catch(() => {
          toast({
            className:
              'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
            description: <h3>Internal Server Error</h3>,
            title: <h1 className='text-center'>Error</h1>,
            variant: 'destructive',
          });
        });
    }
  };

  const handleRemoveFavorite = async () => {
    if (auth?.currentProfile?._id) {
      api
        .put(`${APIS.REMOVE_FAVORITES}/${auth.currentProfile._id}/${user._id}`)
        .then(async () => {
          await refetchUserInfo();

          return toast({
            className:
              'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
            description: <h3>Successfully removed from favorites</h3>,
            title: <h1 className='text-center'>Success</h1>,
            variant: 'default',
          });
        })
        .catch(() => {
          toast({
            className:
              'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
            description: <h3>Internal Server Error</h3>,
            title: <h1 className='text-center'>Error</h1>,
            variant: 'destructive',
          });
        });
    }
  };

  return (
    <Link
      href={`/dashboard/${auth?.currentRole === USER_ROLE.FREELANCER ? 'freelancer' : 'client'}/inbox/${user._id}`}
      socket='socket'
    >
      <div
        className={`${isSelected ? 'bg-[#1a272c]' : ''} group flex cursor-pointer gap-4 rounded-xl p-4 transition hover:bg-[#1a272c]`}
      >
        <div className='flex w-3/5 gap-3'>
          <div className='relative h-10 min-w-10'>
            <img
              alt={user.fullName}
              className='aspect-square h-full w-full rounded-full object-cover'
              src={user.avatarURL || DEFAULT_AVATAR}
            />
            <div
              className={`absolute bottom-0.5 right-0.5 h-[10px] w-[10px] rounded-full ${
                userStatusColor
              }`}
            />
          </div>
          <div className='flex w-full flex-col gap-2'>
            <p className='flex items-center gap-3 text-nowrap text-sm font-semibold text-white'>
              {truncateText(user.fullName, 9)}
              {user.isVerified && <BsPatchCheckFill fill='#148fe8' />}
            </p>
            <p className='relative w-full text-nowrap text-xs font-light text-medGray'>
              {lastMessage ? truncateText(lastMessage.messageText, 20) : ''}
            </p>
          </div>
        </div>
        <div className='flex w-2/5 items-center justify-between'>
          <span className='text-xs text-[#96B0BD]'>
            {lastMessage ? timeDifference(lastMessage.timeStamp) : ''}
          </span>
          <div className='flex items-center gap-3'>
            {unReadCount > 0 && (
              <span className='rounded-full bg-[#DC4F13] px-2 py-[1px] text-xs'>{unReadCount}</span>
            )}
            {auth?.currentProfile?.favorites.includes(user._id) ? (
              <FaStar
                className='w-4 cursor-pointer fill-[#96B0BD]'
                onClick={handleRemoveFavorite}
              />
            ) : (
              <FaRegStar
                className='w-4 cursor-pointer fill-[#96B0BD]'
                onClick={handleAddFavorite}
              />
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

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const { data: usersWithMessages, refetch } = useGetMembersWithMessages(auth?.currentProfile?._id);

  useEffect(() => {
    socket?.on('newMessage', (data) => {
      auth?.setLastMessage((prev) => {
        const res = new Map(prev);
        res.set(data.senderId, data);

        return res;
      });

      socket.emit('readMessage', { from: data.receiverId, to: data.senderId });
    });
  }, [auth, auth?.currentProfile?._id, refetch, socket]);

  useEffect(() => {
    if (usersWithMessages) {
      setUsers(usersWithMessages.users);
      setFilteredUsers(usersWithMessages.users);
    }
  }, [usersWithMessages]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = users.filter(
      (user) => user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  console.log(filteredUsers);

  return (
    <div className='inbox-page border-t border-[#28373E]'>
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
        <div className='left-o top-0x chats_col absolute flex w-full flex-col gap-4 border-r border-[#28373E] p-6 md:relative md:w-1/3 mobile:h-full mobile:p-3'>
          <div className='flex h-auto items-center rounded-xl border border-[#526872] px-4'>
            <IoIosSearch />
            <input
              className='h-12 w-full bg-transparent pl-4 text-base outline-none'
              onChange={handleSearch}
              placeholder='Search'
              value={searchTerm}
            />
          </div>
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
          <div className='flex flex-col gap-2 overflow-scroll'>
            {filteredUsers &&
              filteredUsers.map((user, index) => <MessageItem key={index} user={user} />)}
          </div>
        </div>
        <div className='chat_content w-full transition md:w-2/3 md:translate-x-0 mobile:h-full'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
