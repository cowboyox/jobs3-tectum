'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/ContextProvider';
import { useGetArchivedMessages } from '@/hooks/useGetArchivedMessages';
import { useGetArchivedProposals } from '@/hooks/useGetArchivedProposals';
import { useGetClientGigById } from '@/hooks/useGetClientGigById';
import { useGetFreelancerGigById } from '@/hooks/useGetFreelancerGigById';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import api from '@/utils/api';
import { USER_ROLE } from '@/utils/constants';
import { timeDifference } from '@/utils/Helpers';

const NotificationMessageItem = ({ msg, refetchArchivedMessages }) => {
  const { data: userInfo } = useGetUserInfo(msg.senderId);
  const router = useRouter();
  const auth = useCustomContext();
  const { toast } = useToast();

  const handleArchive = async (e) => {
    e.stopPropagation();

    try {
      await api.put(
        `/api/v1/message/updateArchivedMessage/${msg._id}`,
        JSON.stringify({ isArchived: !msg.archived })
      );

      await refetchArchivedMessages();

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully {!msg.archived ? 'archived!' : 'removed!'}</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (err) {
      console.error('Error corrupted during posting gig', err);
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Internal Server Error</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  return (
    <div
      className={`'flex-row' hover:bg-[#162126]'} flex gap-4 rounded-xl bg-[#C440081F] p-4 transition`}
      onClick={() =>
        router.push(
          `/dashboard/${auth?.currentRole === USER_ROLE.FREELANCER ? 'freelancer' : 'client'}/inbox/${msg.senderId}`
        )
      }
    >
      <div className='flex w-full items-start gap-4'>
        <div className='relative w-20 md:h-12 md:w-12'>
          {userInfo?.avatarURL ? (
            <img className='aspect-square h-full w-full rounded-full' src={userInfo?.avatarURL} />
          ) : (
            <div className='relative flex aspect-square h-full w-full items-center justify-center rounded-full bg-[#28373E]'>
              <CiBellOn className='h-6 w-6 fill-[#96B0BD]' />
            </div>
          )}
          {userInfo?.status === 'online' ? (
            <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500' />
          ) : userInfo?.status === 'idle' ? (
            <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-yellow-500' />
          ) : (
            <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-500' />
          )}
        </div>
        <div className='flex w-full flex-col gap-2'>
          <p className={`text-sm text-[#96B0BD]`}>
            <strong className='text-white'>{userInfo?.fullName}</strong> {msg.messageText}
          </p>
          <p className='text-xs text-[#96B0BD]'>{timeDifference(msg.timeStamp)}</p>
        </div>
        <GoInbox
          className='my-auto ml-auto h-5 w-5 cursor-pointer fill-[#96B0BD]'
          onClick={handleArchive}
        />
      </div>
    </div>
  );
};

const NotificationClientOrderItem = ({ order, refetchArchivedProposals }) => {
  const { data: userInfo } = useGetUserInfo(order.proposer);
  const { data: gigInfo } = useGetFreelancerGigById(order.freelancerGig);
  const router = useRouter();
  const { toast } = useToast();

  const handleArchive = async (e) => {
    e.stopPropagation();

    try {
      await api.put(
        `/api/v1/proposal/updateArchivedProposal/${order._id}`,
        JSON.stringify({ isArchived: !order.archived })
      );

      await refetchArchivedProposals();

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully {!order.archived ? 'archived!' : 'removed!'}</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (err) {
      console.error('Error corrupted during posting gig', err);
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Internal Server Error</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  return (
    <div
      className={`'flex-row' hover:bg-[#162126]'} flex gap-4 rounded-xl bg-[#C440081F] p-4 transition`}
      onClick={() => router.push(`/dashboard/freelancer/offer`)}
    >
      <div className='flex w-full items-start gap-4'>
        <div className='relative w-20 md:h-12 md:w-12'>
          {userInfo?.avatarURL ? (
            <img className='aspect-square h-full w-full rounded-full' src={userInfo?.avatarURL} />
          ) : (
            <div className='relative flex aspect-square h-full w-full items-center justify-center rounded-full bg-[#28373E]'>
              <CiBellOn className='h-6 w-6 fill-[#96B0BD]' />
            </div>
          )}
          {userInfo?.status === 'online' ? (
            <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500' />
          ) : userInfo?.status === 'idle' ? (
            <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-yellow-500' />
          ) : (
            <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-500' />
          )}
        </div>
        <div className='flex w-full flex-col gap-2'>
          <p className={`text-sm text-[#96B0BD]`}>
            <strong className='text-white'>{userInfo?.fullName} </strong>applied to your gig!
          </p>
          <p className='text-xs text-[#96B0BD]'>Gig: {gigInfo?.gigTitle}</p>
        </div>
        <GoInbox
          className='my-auto ml-auto h-5 w-5 cursor-pointer fill-[#96B0BD]'
          onClick={handleArchive}
        />
      </div>
    </div>
  );
};

const NotificationFreelancerOrderItem = ({ order, refetchArchivedProposals }) => {
  const { data: userInfo } = useGetUserInfo(order.proposer);
  const { data: gigInfo } = useGetClientGigById(order.clientGig);
  const router = useRouter();
  const { toast } = useToast();

  const handleArchive = async (e) => {
    e.stopPropagation();

    try {
      await api.put(
        `/api/v1/proposal/updateArchivedProposal/${order._id}`,
        JSON.stringify({ isArchived: !order.archived })
      );

      await refetchArchivedProposals();

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully {!order.archived ? 'archived!' : 'removed!'}</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (err) {
      console.error('Error corrupted during posting gig', err);
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Internal Server Error</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  return (
    <div
      className={`'flex-row' hover:bg-[#162126]'} flex gap-4 rounded-xl bg-[#C440081F] p-4 transition`}
      onClick={() => router.push(`/dashboard/client/offer`)}
    >
      <div className='flex w-full items-start gap-4'>
        <div className='relative w-20 md:h-12 md:w-12'>
          {userInfo?.avatarURL ? (
            <img className='aspect-square h-full w-full rounded-full' src={userInfo?.avatarURL} />
          ) : (
            <div className='relative flex aspect-square h-full w-full items-center justify-center rounded-full bg-[#28373E]'>
              <CiBellOn className='h-6 w-6 fill-[#96B0BD]' />
            </div>
          )}
          {userInfo?.status === 'online' ? (
            <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500' />
          ) : userInfo?.status === 'idle' ? (
            <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-yellow-500' />
          ) : (
            <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-500' />
          )}
        </div>
        <div className='flex w-full flex-col gap-2'>
          <p className={`text-sm text-[#96B0BD]`}>
            <strong className='text-white'>{userInfo?.fullName} </strong>applied to your gig!
          </p>
          <p className='text-xs text-[#96B0BD]'>Gig: {gigInfo?.gigTitle}</p>
        </div>
        <GoInbox
          className='my-auto ml-auto h-5 w-5 cursor-pointer fill-[#96B0BD]'
          onClick={handleArchive}
        />
      </div>
    </div>
  );
};

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
      <div className='flex w-full items-start gap-4'>
        <div className='relative w-20 md:h-12 md:w-12'>
          {userImage ? (
            <img className='aspect-square h-full w-full rounded-full' src={userImage} />
          ) : (
            <div className='relative flex aspect-square h-full w-full items-center justify-center rounded-full bg-[#28373E]'>
              <CiBellOn className='h-6 w-6 fill-[#96B0BD]' />
            </div>
          )}
          {isOnline && (
            <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500' />
          )}
        </div>
        <div className='flex w-full flex-col gap-2'>
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
      <div className='flex flex-col gap-2'>
        <p className={`text-sm ${type === 'general' ? 'font-bold text-white' : 'text-[#96B0BD]'}`}>
          <strong className='text-white'>{userName}</strong> {message}
        </p>
        <p className='text-xs text-[#96B0BD]'>{time}</p>
      </div>
      {icon && !highlighted && (
        <GoInbox className='my-auto ml-auto h-5 w-5 cursor-pointer fill-[#96B0BD]' />
      )}
      {highlighted && <div className='my-auto ml-auto h-3 w-3 rounded-full bg-[#DC4F13]' />}
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

const Notifications = ({ className }) => {
  const auth = useCustomContext();
  const [generalNum, setGeneralNum] = useState(0);
  const [inboxNum, setInboxNum] = useState(0);
  const [archiveNum, setArchiveNum] = useState(0);

  useEffect(() => {
    setGeneralNum(
      auth?.currentRole === USER_ROLE.FREELANCER
        ? auth?.unreadClientOrders?.length || 0
        : auth?.unreadFreelancerOrders?.length || 0
    );
  }, [auth?.currentRole, auth?.unreadClientOrders, auth?.unreadFreelancerOrders]);

  const { data: archivedMessages, refetch: refetchArchivedMessages } = useGetArchivedMessages(
    auth?.currentProfile?._id
  );
  const { data: archivedProposals, refetch: refetchArchivedProposals } = useGetArchivedProposals(
    auth?.currentProfile?._id
  );

  useEffect(() => {
    setInboxNum(auth?.unreadMessages?.length || 0);
  }, [auth?.unreadMessages]);

  useEffect(() => {
    let msgNum = 0;
    let orderNum = 0;

    if (archivedMessages) {
      msgNum = archivedMessages.length;
    }

    if (archivedProposals) {
      orderNum = archivedProposals.length;
    }

    setArchiveNum(msgNum + orderNum);
  }, [archivedMessages, archivedProposals]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <div className='relative cursor-pointer rounded-xl bg-[#10191D] p-3'>
          <CiBellOn className='h-7 w-7 fill-[#96B0BD]' />
          {inboxNum + generalNum > 0 && (
            <div className='absolute right-0 top-0 h-3 w-3 rounded-full bg-[#dc4f14]' />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='mt-2 flex w-[520px] flex-col gap-0 rounded-xl border-2 border-[#28373E] bg-[#10191D] p-6 mobile:ml-[2.5vw] mobile:h-[80vh] mobile:w-[95vw] mobile:overflow-y-scroll'
        sideOffset={10}
      >
        <div className='flex items-center justify-between'>
          <span className='text-xl font-bold'>
            Notifications {inboxNum + generalNum > 0 && <span>({inboxNum + generalNum})</span>}
          </span>
          <span className='cursor-pointer text-base text-[#96B0BD]'>Mark all as read</span>
        </div>
        <Tabs className='mt-4' defaultValue='Inbox'>
          <TabsList className='h-auto w-full bg-transparent p-0'>
            <TabsTrigger
              className='h-12 w-full border-b-2 border-[#516170] bg-transparent text-base data-[state=active]:border-[#dc4f14] data-[state=active]:bg-transparent'
              value='Inbox'
            >
              Inbox
              {inboxNum > 0 && (
                <span className='ml-2 rounded-xl border border-[#3E525B] px-[8px] text-[10px]'>
                  {inboxNum}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              className='data-[state=active]:bg-transparent] flex h-12 w-full items-center gap-2 border-b-2 border-[#516170] bg-transparent text-base data-[state=active]:border-[#dc4f14]'
              value='General'
            >
              General
              {generalNum > 0 && (
                <span className='ml-2 rounded-xl border border-[#3E525B] px-[8px] text-[10px]'>
                  {generalNum}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              className='h-12 w-full border-b-2 border-[#516170] bg-transparent text-base data-[state=active]:border-[#dc4f14] data-[state=active]:bg-transparent'
              value='Archived'
            >
              Archived
              {archiveNum > 0 && (
                <span className='ml-2 rounded-xl border border-[#3E525B] px-[8px] text-[10px]'>
                  {archiveNum}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          <TabsContent className='flex flex-col gap-5' value='Inbox'>
            <div className='mt-6 flex flex-col gap-5'>
              {auth?.unreadMessages.length > 0 &&
                auth.unreadMessages.map((msg, index) => {
                  return (
                    <NotificationMessageItem
                      key={index}
                      msg={msg}
                      refetchArchivedMessages={refetchArchivedMessages}
                    />
                  );
                })}

              {/* <NotificationItem
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
              /> */}
              <div className='border-t border-[#28373E]' />
              <div className='flex justify-between'>
                <Link className='text-lg text-[#96B0BD]' href='/dashboard/client/inbox'>
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
              {/* <NotificationItem
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
              /> */}
              {auth?.unreadClientOrders.length > 0 &&
                auth.unreadClientOrders.map((order, index) => {
                  return (
                    <NotificationClientOrderItem
                      key={index}
                      order={order}
                      refetchArchivedProposals={refetchArchivedProposals}
                    />
                  );
                })}
              {auth?.unreadFreelancerOrders.length > 0 &&
                auth.unreadFreelancerOrders.map((order, index) => {
                  return (
                    <NotificationFreelancerOrderItem
                      key={index}
                      order={order}
                      refetchArchivedProposals={refetchArchivedProposals}
                    />
                  );
                })}
            </div>
            <div className='border-t border-[#28373E]' />
            <div className='flex justify-between'>
              <Link className='text-lg text-[#96B0BD]' href='/dashboard/client/inbox'>
                See all
              </Link>
              <div className='flex gap-2'>
                <AiOutlineSound className='cursor-pointer fill-[#96B0BD]' />
                <IoSettingsOutline className='cursor-pointer stroke-[#96B0BD]' />
              </div>
            </div>
          </TabsContent>
          <TabsContent className='flex flex-col gap-5' value='Archived'>
            {archivedMessages &&
              archivedMessages.length > 0 &&
              archivedMessages.map((message, index) => {
                return (
                  <NotificationMessageItem
                    key={index}
                    msg={message}
                    refetchArchivedMessages={refetchArchivedMessages}
                  />
                );
              })}
            {archivedProposals &&
              archivedProposals.length > 0 &&
              archivedProposals.map((proposal, index) => {
                return (
                  <div key={index}>
                    {proposal.clientGig ? (
                      <NotificationFreelancerOrderItem
                        order={proposal}
                        refetchArchivedProposals={refetchArchivedProposals}
                      />
                    ) : (
                      <NotificationClientOrderItem
                        order={proposal}
                        refetchArchivedProposals={refetchArchivedProposals}
                      />
                    )}
                  </div>
                );
              })}
            {/* <NotificationItem
              actions
              icon
              isOnline
              message='sent you an offer UI/UX Design'
              time='20 min ago'
              type='offer'
              userImage='/assets/images/users/user-5.png'
              userName='Emily Rose'
            /> */}
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
