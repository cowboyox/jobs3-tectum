import React from 'react';

import { Button } from '@/components/ui/button';

const NotificationView = () => {
  return (
    <div className='mx-auto flex max-w-[700px] flex-col gap-4'>
      <div className='rounded-[12px] bg-[#10191D] p-8'>
        <label className='text-lg font-[500] text-primary' htmlFor='billin'>
          Notifications
        </label>
        <p className='text-md text-[#96B0BD]'>
          For important updates regarding your JOBS3 activity, certain notifications cannot be
          disabled
        </p>

        <div className='mt-6 flex flex-col gap-6 rounded-[12px] bg-[#1B272C] p-6'>
          <div className='flex'>
            <div className='w-[31.5%]'>Type</div>
            <div className='flex w-[31.5%] items-center'>
              <label className='text-md font-[500] text-primary'>Email</label>
            </div>
            <div className='flex w-[31.5%] items-center'>
              <label className='text-md font-[500] text-primary'>Mobile</label>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            {[
              'Inbox Messages',
              'Order Messages',
              'Order Updates',
              'Rating Reminders',
              'My Gigs',
              'My Account',
            ].map((type, index) => (
              <div className='flex items-center' key={index}>
                <div className='w-[31.5%]'>
                  <label className='text-md text-[#96B0BD]'>{type}</label>
                </div>
                <div className='flex w-[31.5%] items-center justify-start'>
                  <input className='cursor-pointer accent-[#DC4F13]' type='checkbox' />
                </div>
                <div className='flex w-[31.5%] items-center justify-start'>
                  <input className='cursor-pointer accent-[#DC4F13]' type='checkbox' />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex justify-end'>
          <Button
            className={`mt-6 w-[200px] rounded-xl bg-[#DC4F13] px-10 py-8 text-white hover:bg-[#DC4F13]`}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationView;
