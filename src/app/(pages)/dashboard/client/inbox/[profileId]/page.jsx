'use client';
import { useParams } from 'next/navigation';
import React from 'react';

import ChatPage from '@/components/dashboard/inbox/ChatPage';

const ClientSelectChatMessage = ({ children }) => {
  const { profileId } = useParams();

  return <ChatPage profileId={profileId}> {children} </ChatPage>;
};

export default ClientSelectChatMessage;
