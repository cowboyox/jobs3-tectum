'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
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
import { useToast } from '@/components/ui/use-toast';
import { useSocket } from '@/context/socket';
import { useCustomContext } from '@/context/use-custom';
import { useGetMembersWithMessages } from '@/hooks/useGetMembersWithMessages';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import api from '@/utils/api';
import { APIS, DEFAULT_AVATAR } from '@/utils/constants';

const MessageDetails = (props) => {
  return (
    <div
      className={`flex items-center justify-start gap-4 ${props.sender == 'me' ? 'flex-row-reverse' : ''} `}
    >
      <div className='relative h-5 min-w-5 md:h-7 md:min-w-7'>
        <img
          className='aspect-square h-full w-full rounded-full object-cover'
          src={props.user_image || DEFAULT_AVATAR}
        />
      </div>
      <span className='text-sm text-[#526872]'>{props.time}</span>
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

const ChatPage = ({ profileId }) => {
  const socket = useSocket();
  const auth = useCustomContext();
  const [receiver, setRceiver] = useState(null);
  const [conversations, setConversation] = useState([]);
  const [userStatusColor, setUserStatusColor] = useState('bg-gray-500');
  const [input, setInput] = useState('');
  const { data: userInfo } = useGetUserInfo(profileId);
  const { data: currentProfile, refetch: refetchUserInfo } = useGetUserInfo(
    auth?.currentProfile?._id
  );
  const messagesEndRef = useRef(null);
  const { toast } = useToast();
  const { data: usersWithMessages, refetch } = useGetMembersWithMessages(auth?.currentProfile?._id);

  useEffect(() => {
    setUserStatusColor(
      receiver?.status === 'online'
        ? 'bg-green-500'
        : receiver?.status === 'idle'
          ? 'bg-yellow-500'
          : 'bg-gray-500'
    );
  }, [receiver?.status]);

  useEffect(() => {
    socket?.on('statusChanged', ({ userId, status }) => {
      if (userId === profileId) {
        setUserStatusColor(
          status === 'online' ? 'bg-green-500' : status === 'idle' ? 'bg-yellow-500' : 'bg-gray-500'
        );
      }
    });

    return () => {
      socket?.off('statusChanged');
    };
  }, [socket, profileId]);

  useEffect(() => {
    if (userInfo && auth?.currentProfile) {
      setRceiver({
        _id: userInfo._id,
        avatar: userInfo.avatarURL,
        isVerified: userInfo.userId?.verified || false,
        name: userInfo.fullName,
        status: userInfo.status,
        timestamp: userInfo.userId?.timestamp,
      });

      let from = auth.currentProfile._id;
      let to = userInfo._id;

      socket?.emit('getHistory', { from, to });

      socket?.on('history', (history) => {
        setConversation(history);
      });

      socket?.on('newMessage', (message) => {
        setConversation((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket?.off('newMessage');
      };
    }
  }, [userInfo, auth.currentProfile, socket, refetch, usersWithMessages]);

  useEffect(() => {
    if (usersWithMessages) {
      let convs = [];

      usersWithMessages.messages.map((message) => {
        convs.push({
          messageText: message.messageText,
          receiverId: message.receiverId._id,
          senderId: message.senderId._id,
          timeStamp: message.timeStamp,
        });
      });

      setConversation(convs);
    }
  }, [usersWithMessages]);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // UseEffect to scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  useEffect(() => {
    if (currentProfile && auth) {
      auth.setCurrentProfile(currentProfile);
    }
  }, [currentProfile, auth]);

  const sendMessage = () => {
    const message = {
      messageText: input,
      receiverId: receiver._id,
      senderId: auth.currentProfile._id,
      timeStamp: new Date(),
    };
    socket.emit('sendMessage', message);

    setConversation((prevMessages) => [...prevMessages, message]);
    setInput('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const handleChange = (e) => {
    if (e.target.value !== '\n') {
      setInput(e.target.value);
    }
  };

  const handleAddFavorite = async () => {
    if (auth?.currentProfile?._id) {
      api
        .put(`${APIS.ADD_FAVORITES}/${auth.currentProfile._id}/${profileId}`)
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
        .put(`${APIS.REMOVE_FAVORITES}/${auth.currentProfile._id}/${profileId}`)
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
          <div className='flex flex-col justify-between gap-4 border-b border-[#28373E] px-8 sm:flex-row mobile:px-5 mobile:py-3'>
            <div className='flex items-center gap-3 py-4'>
              <Link className='md:hidden' href='../inbox'>
                <FaAngleLeft />
              </Link>
              <div className='relative h-10 min-w-10'>
                <img
                  alt={receiver.name}
                  className='aspect-square h-full w-full rounded-full object-cover'
                  src={receiver.avatar || DEFAULT_AVATAR}
                />
                <div
                  className={`absolute bottom-0 right-0 h-[10px] w-[10px] rounded-full ${
                    userStatusColor
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
            <div className='flex items-center justify-end gap-4'>
              <HiOutlineExclamationTriangle className='h-6 w-6 cursor-pointer stroke-[#96B0BD]' />

              {auth?.currentProfile?.favorites.includes(profileId) ? (
                <FaStar
                  className='w-5 cursor-pointer fill-[#96B0BD]'
                  onClick={handleRemoveFavorite}
                />
              ) : (
                <FaRegStar
                  className='w-5 cursor-pointer fill-[#96B0BD]'
                  onClick={handleAddFavorite}
                />
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
          <div className='relative flex flex-1 flex-col items-center overflow-scroll'>
            <div className='flex w-full flex-col gap-9 px-8 pb-3 pt-8 mobile:px-5'>
              {conversations.map((conv, id) => (
                <div className='flex w-full flex-col gap-3' key={id}>
                  <MessageDetails
                    date={new Date(conv.timeStamp).toLocaleDateString('en-US')}
                    sender={conv.senderId === auth.currentProfile._id ? 'me' : ''}
                    time={new Date(conv.timeStamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
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
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className='flex h-24 w-full items-center justify-center mobile:p-2'>
            <div className='mx-auto flex h-14 w-full max-w-[684px] items-center gap-4 overflow-hidden rounded-2xl border border-[#526872] py-2 pl-4 pr-2'>
              <IoMdAttach className='h-6 w-6 cursor-pointer transition hover:fill-[#dc4f14]' />
              <textarea
                className='h-full w-full resize-none bg-transparent pt-2 outline-none placeholder:text-[#96B0BD]'
                onChange={handleChange}
                onKeyDown={handleKeyDown}
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
