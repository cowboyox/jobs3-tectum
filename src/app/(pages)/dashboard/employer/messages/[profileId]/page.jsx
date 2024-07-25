'use client';
import { useParams } from 'next/navigation';
import React from 'react';

import ChatPage from '@/components/dashboard/inbox/ChatPage';

const FreelancerChatPage = () => {
  const { profileId } = useParams();

  return <ChatPage profileId={profileId} />;
};

export default FreelancerChatPage;
