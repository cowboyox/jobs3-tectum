import React from 'react';

import { Button } from '@/components/ui/button';

const AccountView = () => {
  return (
    <div className='mx-auto flex max-w-[700px] flex-col gap-4'>
      <div className='rounded-[12px] bg-[#10191D] p-8'>
        <div className='flex flex-col gap-6 rounded-[12px] bg-[#1B272C] p-6'>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-[500] text-primary' htmlFor='zkpId'>
              ZKP ID
            </label>
            <input
              className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4'
              id=''
              name=''
              placeholder='13ec8d51'
              type='text'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-[500] text-primary' htmlFor='name'>
              Name
            </label>
            <input
              className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4'
              id=''
              name=''
              placeholder='Devin Miles'
              type='text'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-[500] text-primary' htmlFor='email'>
              Email
            </label>
            <input
              className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4'
              id=''
              name=''
              placeholder='devin@***.com'
              type='text'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-[500] text-primary' htmlFor='status'>
              Online Status
            </label>
            <p className='text-[#96B0BD]'>
              When you&apos;re online your Gigs are visible under the Online search filters
            </p>
            <select className='mt-2 rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4 pr-4 text-[#96B0BD]'>
              <option className='text-[#96B0BD]' value='Go Offile for ...'>
                Go Offile for ...
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className='rounded-[12px] bg-[#10191D] p-8'>
        <label className='text-lg font-[500] text-primary' htmlFor='accounts'>
          Additional Accounts
        </label>
        <p className='text-md text-[#96B0BD]'>
          Creating a new account allows you to use JOBS3 in different ways, while still having just
          one login.
        </p>
        <div className='mt-4 flex justify-end'>
          <Button
            className={`mt-6 rounded-xl bg-[#DC4F13] px-10 py-8 text-white hover:bg-[#DC4F13]`}
          >
            Add New Account
          </Button>
        </div>
      </div>
      <div className='rounded-[12px] bg-[#10191D] p-8'>
        <div className='flex flex-col gap-6 rounded-[12px] bg-[#1B272C] p-6'>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-[500] text-primary' htmlFor='zkpId'>
              Time Zone
            </label>
            <input
              className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4'
              id=''
              name=''
              placeholder='UTC+03:00 Baghdad, Kuwait, Nairobi, Riyadh'
              type='text'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-[500] text-primary' htmlFor='name'>
              Address
            </label>
            <input
              className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4'
              id=''
              name=''
              placeholder='United Kindom'
              type='text'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-[500] text-primary' htmlFor='email'>
              Phone
            </label>
            <input
              className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4'
              id=''
              name=''
              placeholder='+ 45 7883 443-34-56'
              type='text'
            />
          </div>
        </div>
      </div>
      <div className='mt-4 flex justify-end'>
        <Button className={`rounded-xl bg-[#FF3737] px-10 py-8 text-white hover:bg-[#FF3737]`}>
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default AccountView;
