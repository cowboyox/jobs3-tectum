'use client';
import React from 'react';

import InboxPage from '@/components/dashboard/inbox/layout';

const ClientInboxPage = ({ children }) => {
  return <InboxPage> {children} </InboxPage>;
};

export default ClientInboxPage;
