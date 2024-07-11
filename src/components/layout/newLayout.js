'use client';
import React from 'react';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

// Components
import NewHeader from '@/components/layout/newHeader';
import NewFooter from '@/components/layout/newFooter';

const NewLayout = ({ children, pageClass }) => {
  return (
    <div className='flex flex-col w-full'>
      <ProgressBar color='#dc4f14' height='4px' options={{ showSpinner: false }} shallowRouting />
      <div className={pageClass + ' max-w-7xl'}>
        <NewHeader />
        {children}
        <NewFooter />
      </div>
    </div>
  );
};

export default NewLayout;