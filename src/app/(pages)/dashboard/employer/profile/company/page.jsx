'use client';
import React, { useState } from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import FileUpload from '@/components/pages/dashboard/freelancer/FileUpload';
import { Input } from '@/components/ui/input';
import { RiCloseLine, RiEyeLine } from 'react-icons/ri';
import { Switch } from '@/components/ui/switch';

const CompanyProfile = () => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [modal, setModal] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  return (
    //   <div className='group relative cursor-pointer' {...getBannerRootProps()}>
    <div className='relative'>
      <div className='group relative cursor-pointer'>
        <label
          className='w-full hover:cursor-pointer'
          htmlFor='dropzone-banner'
          //   onClick={(e) => e.stopPropagation()}
        >
          <img
            alt='banner'
            className='h-64 w-full rounded-b-2xl object-cover transition group-hover:opacity-75'
            src={
              //   profileData?.clientBannerURL
              //     ? profileData?.clientBannerURL
              // : '/assets/images/placeholder.jpeg'
              '/assets/images/placeholder.jpeg'
            }
          />
          <div className='absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a272c] opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
            <IoCameraOutline className='h-6 w-6' />
          </div>
        </label>
        <Input
          //   {...getBannerInputProps()}
          accept='image/png, image/jpeg'
          className='hidden'
          id='dropzone-banner'
          //   onChange={(e) => handleBannerUpload(e)}
          type='file'
        />
      </div>
      <div className='mx-auto flex max-w-7xl -translate-y-8 flex-col gap-3 px-0 md:px-8'>
        <div className='flex w-full flex-col rounded-t-xl bg-[#10191D] px-3 py-4 md:justify-between md:gap-7 md:rounded-xl md:p-8'>
          <div className='flex items-start gap-4'>
            <img src='/assets/icons/ActiveOrder.png' className='h-[100px] w-[100px]' />
            <div className='flex w-full flex-row justify-between gap-2'>
              <div className='flex flex-col gap-2'>
                <div className='flex gap-1'>
                  <p className='text-[32px]'>Ventures Compass</p>
                  <img src='/assets/images/icons/checkmark.svg' />
                </div>
                <div className='flex gap-1'>
                  <p className='text-base text-[#526872]'>jobs3.io/venturescompass</p>
                  <img src='/assets/icons/export.svg' />
                </div>
              </div>
              <div>
                <button className='border border-white bg-transparent px-10 py-3 text-base'>
                  View Profile
                </button>
              </div>
            </div>
          </div>
          <hr className='w-full' />
          <div className='flex font-bold'>
            <button
              className={`px-[30px] py-3 ${currentProgress === 0 ? 'bg-orange text-white' : 'bg-transparent text-[#516170]'}`}
              onClick={() => setCurrentProgress(0)}
            >
              Company Profile
            </button>
            <button
              className={`px-[30px] py-3 ${currentProgress === 1 ? 'bg-orange text-white' : 'bg-transparent text-[#516170]'}`}
              onClick={() => setCurrentProgress(1)}
            >
              Billing & Payments
            </button>
            <button
              className={`px-[30px] py-3 ${currentProgress === 2 ? 'bg-orange text-white' : 'bg-transparent text-[#516170]'}`}
              onClick={() => setCurrentProgress(2)}
            >
              My Teams
            </button>
            <button
              className={`px-[30px] py-3 ${currentProgress === 3 ? 'bg-orange text-white' : 'bg-transparent text-[#516170]'}`}
              onClick={() => setCurrentProgress(3)}
            >
              Password & Security
            </button>
            <button
              className={`px-[30px] py-3 ${currentProgress === 4 ? 'bg-orange text-white' : 'bg-transparent text-[#516170]'}`}
              onClick={() => setCurrentProgress(4)}
            >
              Notification Settings
            </button>
          </div>
        </div>
        {currentProgress === 0 && (
          <div className='flex flex-col gap-4'>
            <div className='flex w-full flex-col rounded-t-xl bg-[#10191D] px-3 py-4 md:justify-between md:gap-7 md:rounded-xl md:p-8'>
              <div className='flex pr-[90px]'>
                <div className='flex w-2/5 flex-col gap-1'>
                  <p className='text-[18px] text-[#f5f5f5]'>Public profile</p>
                  <p className='text-base text-[#96b0bd]'>
                    Update your company photo and details here.
                  </p>
                </div>
                <div className='flex w-3/5 flex-col gap-5'>
                  <Input
                    className='h-16 rounded-2xl border border-[#516170] bg-transparent px-5 py-3 text-[18px] placeholder:border-[#516170]'
                    placeholder='Ventures Compass'
                  />
                  <div className='flex h-16 items-center rounded-2xl border border-[#516170] bg-transparent py-3 pr-5 text-[18px] placeholder:border-[#516170]'>
                    <div className='flex h-16 items-center rounded-l-2xl border border-r-2 border-[#516170] bg-[#28373e] py-3 pl-5 pr-3'>
                      jobs3.io
                    </div>
                    <Input
                      className='h-16 border border-x-0 border-[#516170] bg-transparent font-bold'
                      placeholder='Ventures Compass'
                    />
                    <img src='/assets/images/icons/checkmark.svg' />
                  </div>
                </div>
              </div>
              <hr className='w-full' />
              <div className='flex pr-[90px]'>
                <div className='flex w-2/5 flex-col gap-1'>
                  <p className='text-[18px] text-[#f5f5f5]'>Company logo</p>
                  <p className='text-base text-[#96b0bd]'>
                    Update your company photo and details here.
                  </p>
                </div>
                <div className='flex h-[150px] w-3/5 gap-6'>
                  <img src='/assets/icons/ActiveOrder.png' className='h-[100px] w-[100px]' />
                  <div className='w-full'>
                    <FileUpload
                      className='h-[150px]'
                      //   email={profileData.email}
                      imagePath=''
                      //   key={`extra-${uploadedImagePath.length}`}
                      //   setProfileData={setProfileData}
                      //   setUploadedImagePath={setUploadedImagePath}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-full flex-col rounded-t-xl bg-[#10191D] px-3 py-4 md:justify-between md:gap-7 md:rounded-xl md:p-8'>
              <div className='flex pr-[90px]'>
                <div className='flex w-2/5 flex-col gap-1'>
                  <p className='text-[18px] text-[#f5f5f5]'>Contact Info</p>
                  <p className='text-base text-[#96b0bd]'>
                    Update your company photo and details here.
                  </p>
                </div>
                <div className='flex w-3/5 flex-col gap-5'>
                  <Input
                    className='h-16 rounded-2xl border border-[#516170] bg-transparent px-5 py-3 text-[18px] placeholder:border-[#516170]'
                    placeholder='User ID'
                  />
                  <Input
                    className='h-16 rounded-2xl border border-[#516170] bg-transparent px-5 py-3 text-[18px] placeholder:border-[#516170]'
                    placeholder='name'
                  />
                  <Input
                    className='h-16 rounded-2xl border border-[#516170] bg-transparent px-5 py-3 text-[18px] placeholder:border-[#516170]'
                    placeholder='Email'
                  />
                  <button className='self-start px-5 py-1 font-bold text-[#ff3737]'>
                    Close My account
                  </button>
                </div>
              </div>
              <hr className='w-full' />
              <div className='flex pr-[90px]'>
                <div className='flex w-2/5 flex-col gap-1'>
                  <p className='text-[18px] text-[#f5f5f5]'>Location</p>
                  <p className='text-base text-[#96b0bd]'>
                    Update your company photo and details here.
                  </p>
                </div>
                <div className='flex w-3/5 flex-col gap-5'>
                  <Input
                    className='h-16 rounded-2xl border border-[#516170] bg-transparent px-5 py-3 text-[18px] placeholder:border-[#516170]'
                    placeholder='Time Zone'
                  />
                  <Input
                    className='h-16 rounded-2xl border border-[#516170] bg-transparent px-5 py-3 text-[18px] placeholder:border-[#516170]'
                    placeholder=' Address'
                  />
                  <Input
                    className='h-16 rounded-2xl border border-[#516170] bg-transparent px-5 py-3 text-[18px] placeholder:border-[#516170]'
                    placeholder='Phone'
                  />
                  <div className='flex justify-end gap-3'>
                    <button className='border border-[#516170] px-10 py-4 text-[#f5f5f5]'>
                      Cancel
                    </button>
                    <button className='bg-orange px-10 py-4 text-[#f5f5f5]'>Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentProgress === 1 && (
          <div>
            <div className='flex w-full flex-col rounded-t-xl bg-[#10191D] px-3 py-4 md:justify-between md:gap-7 md:rounded-xl md:p-8'>
              <div className='flex justify-between'>
                <div className='flex flex-col gap-2'>
                  <p className='text-[24px] text-[#f5f5f5]'>Add your first wallet for payments</p>
                  <p className='text-base text-[#96b0bd]'>
                    This credit card will be used by default by billing.
                  </p>
                </div>
                <div>
                  <button className='bg-orange px-10 py-4 text-[#f5f5f5]'>
                    Connect your Wallet
                  </button>
                </div>
              </div>
              <div className='flex gap-3'>
                <img src='/assets/images/icons/metamask.svg' />
                <img src='/assets/images/icons/wallet-connect.svg' />
                <img src='/assets/images/icons/phantom.svg' />
              </div>
            </div>
          </div>
        )}
        {currentProgress === 2 && (
          <div>
            <div className='flex w-full flex-col rounded-t-xl bg-[#10191D] px-3 py-4 md:justify-between md:gap-7 md:rounded-xl md:p-8'>
              <div className='flex justify-between'>
                <div className='flex flex-col gap-2'>
                  <p className='text-[18px] text-[#f5f5f5]'>My Teams</p>
                  <p className='text-base text-[#96b0bd]'>
                    Teams are used to group contract by department or manager
                  </p>
                </div>
                <div>
                  <button className='bg-orange px-10 py-4 text-[#f5f5f5]'>Add Colleague</button>
                </div>
              </div>
              <hr className='w-full' />
              <div className='flex justify-between pr-20'>
                <p className='text-[#96b0bd]'>Team name</p>
                <p className='text-[#96b0bd]'>Role</p>
              </div>
              <hr className='w-full' />
              <div className='flex justify-center'>
                <p className='text-[#96b0bd]'>No member yet</p>
              </div>
            </div>
          </div>
        )}
        {currentProgress === 3 && (
          <div className='flex flex-col gap-3'>
            <div className='flex w-full flex-col rounded-t-xl bg-[#10191D] px-3 py-4 md:justify-between md:gap-7 md:rounded-xl md:p-8'>
              <div className='flex'>
                <div className='flex w-2/5 flex-col gap-1'>
                  <p className='text-[18px] text-[#f5f5f5]'>Authentication Options</p>
                  <p className='text-base text-[#96b0bd]'>
                    Update your company photo and details here.
                  </p>
                </div>
                <div className='flex w-3/5 items-start gap-5'>
                  <img src='/assets/images/icons/check-orange.svg' />
                  <div className='flex w-full flex-col gap-2'>
                    <p className='text-[18px] text-[#f5f5f5]'>Password has been set</p>
                    <p className='text-base text-[#96b0bd]'>
                      Choose a strong unique password that&apos;s at least 8 characters long.
                    </p>
                  </div>
                  <img
                    src='/assets/images/icons/edit-orange.svg'
                    className='cursor-pointer'
                    onClick={() => setModal(true)}
                  />
                </div>
              </div>
              <hr className='w-full' />
            </div>
            <div className='flex w-full flex-col rounded-t-xl bg-[#10191D] px-3 py-4 md:justify-between md:gap-7 md:rounded-xl md:p-8'>
              <div className='flex'>
                <div className='flex w-2/5 flex-col gap-2 pr-10'>
                  <p className='text-[18px] text-[#f5f5f5]'>Two-step verification options</p>
                  <p className='text-base text-[#96b0bd]'>
                    Add an extra layer of security to block unauthorized access and protect your
                    account.
                  </p>
                </div>
                <div className='flex w-3/5 flex-col gap-5'>
                  <div className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                      <p className='text-[18px] text-[#f5f5f5]'>Authenticator app code</p>
                      <p className='text-base text-[#96b0bd]'>
                        Enter a code generated by your authenticator app to confirm it’s you.
                      </p>
                    </div>
                    <div>
                      <Switch />
                    </div>
                  </div>
                  <hr className='my-4 w-full' />
                  <div className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                      <p className='text-[18px] text-[#f5f5f5]'>Mobile app prompt</p>
                      <p className='text-base text-[#96b0bd]'>
                        Receive a prompt from your mobile to confirm it&apos;s you
                      </p>
                    </div>
                    <div>
                      <Switch />
                    </div>
                  </div>
                  <hr className='my-4 w-full' />
                  <div className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                      <p className='text-[18px] text-[#f5f5f5]'>Text message</p>
                      <p className='text-base text-[#96b0bd]'>
                        Receive a six digit code by text message to confirm it&apos;s you
                      </p>
                    </div>
                    <div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {modal && currentProgress === 3 && (
          <div className='absolute -top-24 mx-auto flex w-2/3 flex-col gap-7 self-center rounded-t-xl border bg-[#10191D] px-3 py-4 md:justify-between md:rounded-xl md:p-8'>
            <div className='flex justify-between'>
              <p className='text-3xl'>Change Password</p>
              <div className='flex h-10 w-10 items-center justify-center rounded-[10px] border border-transparent bg-[#1b272c]'>
                <RiCloseLine className='h-8 w-8' onClick={() => setModal(false)} />
              </div>
            </div>
            <hr className='w-full' />
            <div className='flex flex-col gap-2'>
              <p className='text-base text-[#96b0bd]'>Old Password</p>
              <Input className='h-16 rounded-2xl border border-[#516170] bg-transparent px-5 py-3 text-[18px] placeholder:border-[#516170]' />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-base text-[#96b0bd]'>New Password</p>
              <Input
                type='password'
                className='h-16 rounded-2xl border border-[#516170] bg-transparent px-5 py-3 text-[18px] placeholder:border-[#516170]'
              />
            </div>
            <div className='relative flex flex-col gap-2'>
              <p className='text-base text-[#96b0bd]'>Confirm New Password</p>
              <Input
                type={visiblePassword ? 'text' : 'password'}
                className='h-16 rounded-2xl border border-[#516170] bg-transparent px-5 py-3 text-[18px] placeholder:border-[#516170]'
              />
              <div className='absolute h-6 w-9 flex justify-center rounded-full bg-[#28373e] translate-y-[52px] right-5'>
                {visiblePassword ? (
                  <RiEyeLine
                    onClick={() => setVisiblePassword((prevState) => !prevState)}
                    className='w-6 h-6 text-[#96b0bd]'
                  />
                ) : (
                  <img
                    src='/assets/images/icons/eye-slash.svg'
                    onClick={() => setVisiblePassword((prevState) => !prevState)}
                  />
                )}
              </div>
            </div>
            <div className='flex justify-center gap-3'>
              <button
                className='border border-[#516170] px-10 py-4 text-[#f5f5f5]'
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button
                className='bg-orange px-10 py-4 text-[#f5f5f5]'
                onClick={() => setModal(false)}
              >
                Save
              </button>
            </div>
          </div>
        )}
        {currentProgress === 4 && (
          <div className='flex w-full rounded-t-xl bg-[#10191D] px-3 py-4 md:justify-between md:gap-7 md:rounded-xl md:p-8'>
            <div className='flex w-1/3 flex-col gap-2'>
              <p className='text-[18px] text-[#f5f5f5]'>Notifications</p>
              <p className='text-base text-[#96b0bd]'>
                For important updates regarding your JOBS3 activity, certain notifications cannot be
                disabled
              </p>
            </div>
            <div className='flex w-2/3 px-16 justify-between gap-2'>
              <div className='flex flex-col gap-4'>
                <p className='text-[18px] text-[#f5f5f5]'>Type</p>
                <p className='text-base text-[#96b0bd]'>Inbox Messages</p>
                <p className='text-base text-[#96b0bd]'>Order Messages</p>
                <p className='text-base text-[#96b0bd]'>Order Updates</p>
                <p className='text-base text-[#96b0bd]'>Rating Reminders</p>
                <p className='text-base text-[#96b0bd]'>My gigs</p>
                <p className='text-base text-[#96b0bd]'>My Account</p>
              </div>
              <div className='flex flex-col justify-between gap-4'>
                <p className='text-[18px] text-[#f5f5f5]'>Email</p>
                <input type='checkbox' className='accent-orange' />
                <input type='checkbox' className='accent-orange' />
                <input type='checkbox' className='accent-orange' />
                <input type='checkbox' className='accent-orange' />
                <input type='checkbox' className='accent-orange' />
                <input type='checkbox' className='accent-orange' />
              </div>
              <div className='flex flex-col justify-between gap-4'>
                <p className='text-[18px] text-[#f5f5f5]'>Mobile</p>
                <input type='checkbox' className='accent-orange' />
                <input type='checkbox' className='accent-orange' />
                <input type='checkbox' className='accent-orange' />
                <input type='checkbox' className='accent-orange' />
                <input type='checkbox' className='accent-orange' />
                <input type='checkbox' className='accent-orange' />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
