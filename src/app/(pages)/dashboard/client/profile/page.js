'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import '/src/app/css/remove_horizontal_padding.css';
import { useDropzone } from 'react-dropzone';
import { IoCameraOutline } from 'react-icons/io5';

import InfoPanel from './infoPanel';

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import api from '@/utils/api';
import { USER_ROLE } from '@/utils/constants';

const ClientDashboard = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    name: '',
    role: [0],
    verified: false,
  });
  const [lastLogin, setLastLogin] = useState('');
  const [profileData, setProfileData] = useState({
    avatar: null,
    avgResponseTime: '',
    clientBanner: null,
    companyDetails: [
      {
        cityState: '',
        country: '',
        postalCode: '',
        timeZone: '',
        vatID: '',
      },
    ],
    created: '',
    email: '',
    firstName: '',
    freelancerBio: '',
    fullName: '',
    hourlyRate: '',
    languages: [],
    lastName: '',
    location: '',
    monthlyRate: '',
    myGigs: [],
    phoneNumber: 442071234567,
    portfolio: [],
    profileType: 0,
    skills: [],
    timeZone: '',
    userId: '',
    zkpId: '',
  });
  // const [previewBanner, setPreviewBanner] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [fetchBanner, setFetchBanner] = useState('');
  const [fetchAvatar, setFetchAvatar] = useState('');
  useEffect(() => {
    let tmp = localStorage.getItem('jobs_2024_token');
    if (tmp === null) {
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Please Login First</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
      alert('Please Login First');
      router.push('/');
    } else {
      (async () => {
        try {
          setLoading(true);

          let email = JSON.parse(tmp).data.user.email;
          setUser(JSON.parse(tmp).data.user);

          const data = await api.get(`/api/v1/profile/get-profile/${email}/${USER_ROLE.CLIENT}`);
          setProfileData(data.data.profile);
          if (data.data.profile.firstName === undefined) {
            setProfileData((prev) => ({
              ...prev,
              firstName: data.data.profile.fullName.split(' ')[0],
              lastName: data.data.profile.fullName.split(' ')[1],
            }));
          }
          // let fetchBannerUrl = backend_url + '/' + data.data.profile.clientBanner;
          if (data.data.profile.clientBanner) {
            // Convert the data to a Blob
            const binaryData = new Uint8Array(data.data.profile.clientBanner.data);
            const blob = new Blob([binaryData], { type: 'image/png' });

            // Create a URL for the Blob
            const fetchBannerUrl = URL.createObjectURL(blob);

            setFetchBanner(fetchBannerUrl);
          }

          if (data.data.profile?.avatar) {
            // Convert the data to a Blob
            const binaryData = new Uint8Array(data.data.profile?.avatar?.data);
            const blob = new Blob([binaryData], { type: 'image/png' });

            // Create a URL for the Blob
            const fetchAvatarUrl = URL.createObjectURL(blob);

            setFetchAvatar(fetchAvatarUrl);
          }

          const loginData = await api.get(`/api/v1/user/get-last-login/${email}`);

          setLastLogin(loginData.data.data);
        } catch (error) {
          console.error('Error while fetching user profile data:', error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [router, toast]);

  const handleBannerUpload = async (event) => {
    if (event.target.files?.length) {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('file', image);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      try {
        const res = await api.post(
          `/api/v1/profile/upload-client-banner/${profileData._id}`,
          formData,
          config
        );

        if (res.status === 200) {
          setProfileData((prev) => ({
            ...prev,
            clientBannerURL: res.data.data,
          }));
          toast({
            className:
              'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
            description: <h3>Successfully updated Client Profile</h3>,
            title: <h1 className='text-center'>Success</h1>,
            variant: 'default',
          });
        }
      } catch (error) {
        setLoading(false);
        console.error('Error uploading image:', error);
        toast({
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Internal Server Error</h3>,
          title: <h1 className='text-center'>Error</h1>,
          variant: 'destructive',
        });
      }
    }
  };

  const onDropHandleBannerUpload = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const image = acceptedFiles[0];
        handleBannerUpload(image);
      }
    },
    [handleBannerUpload]
  );

  const handleAvatarUpload = async (event) => {
    if (event.target.files?.length) {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('file', image);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      try {
        const res = await api.post(
          `/api/v1/profile/upload-client-avatar/${profileData._id}`,
          formData,
          config
        );

        if (res.status === 200) {
          setProfileData((prev) => ({
            ...prev,
            avatarURL: res.data.data,
          }));
          toast({
            className:
              'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
            description: <h3>Successfully updated Client Profile</h3>,
            title: <h1 className='text-center'>Success</h1>,
            variant: 'default',
          });
        }
      } catch (error) {
        setLoading(false);
        console.error('Error uploading image:', error);
        toast({
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Internal Server Error</h3>,
          title: <h1 className='text-center'>Error</h1>,
          variant: 'destructive',
        });
      }
    }
  };

  const onDropHandleAvatarUpload = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const image = acceptedFiles[0];
        handleAvatarUpload(image);
      }
    },
    [handleAvatarUpload]
  );

  const { getRootProps: getBannerRootProps, getInputProps: getBannerInputProps } = useDropzone({
    onDrop: onDropHandleBannerUpload,
  });

  const { getRootProps: getAvatarRootProps, getInputProps: getAvatarInputProps } = useDropzone({
    onDrop: onDropHandleAvatarUpload,
  });

  return !isLoading ? (
    <div className='p-0'>
      <div className='group relative cursor-pointer' {...getBannerRootProps()}>
        <label
          className='w-full hover:cursor-pointer'
          htmlFor='dropzone-banner'
          onClick={(e) => e.stopPropagation()}
        >
          <img
            alt='banner'
            className='h-64 w-full rounded-b-2xl object-cover transition group-hover:opacity-75'
            src={profileData?.clientBannerURL ? profileData.clientBannerURL : '/assets/images/placeholder.jpeg'}
          />
          <div className='absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a272c] opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
            <IoCameraOutline className='h-6 w-6' />
          </div>
        </label>
        <Input
          {...getBannerInputProps()}
          accept='image/png, image/jpeg'
          className='hidden'
          id='dropzone-banner'
          onChange={(e) => handleBannerUpload(e)}
          type='file'
        />
      </div>
      <div className='mx-auto flex max-w-7xl -translate-y-8 flex-col gap-3 px-0 md:px-8'>
        <div className='flex items-start gap-4 rounded-t-xl bg-[#10191D] px-3 py-4 md:items-center md:gap-7 md:rounded-xl md:p-8'>
          <div className='relative w-20 md:h-24 md:w-24'>
            <div
              className='group relative aspect-square h-full w-full cursor-pointer rounded-full'
              {...getAvatarRootProps()}
            >
              <label
                className='w-full hover:cursor-pointer'
                htmlFor='dropzone-avatar'
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  alt='banner'
                  className='aspect-square h-full w-full rounded-full group-hover:opacity-75'
                  src={profileData?.avatarURL ? profileData.avatarURL : '/assets/images/users/user-5.png'}
                />
                <div className='absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a272c] opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
                  <IoCameraOutline className='h-6 w-6' />
                </div>
              </label>
              <Input
                {...getAvatarInputProps()}
                accept='image/png, image/jpeg'
                className='hidden'
                id='dropzone-avatar'
                onChange={(e) => handleAvatarUpload(e)}
                type='file'
              />
            </div>
            {/* Change background color depending on user online status */}
            <div className='absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500' />
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <h2 className='text-2xl md:text-3xl'>{profileData.fullName}</h2>
              <img className='h-5 w-5' src='/assets/images/icons/checkmark.svg' />
            </div>
            <div className='flex flex-col gap-2 md:flex-row md:gap-4'>
              <div className='flex items-center gap-2'>
                <img
                  className='h-6 w-6 object-contain object-center'
                  src='/assets/images/icons/location.svg'
                />
                <p className='text-lg text-white'>{profileData.location}</p>
              </div>
              <div className='flex items-center gap-2'>
                <img
                  className='h-6 w-6 object-contain object-center'
                  src='/assets/images/icons/clocks.svg'
                />
                <p className='text-lg text-white'>
                  {lastLogin &&
                    new Intl.DateTimeFormat('en-US', {
                      day: 'numeric',
                      hour: 'numeric',
                      hour12: true, // Use 12-hour clock
                      minute: 'numeric',
                      month: 'short',
                      timeZoneName: 'short', // Include the timezone name
                      year: 'numeric',
                    }).format(new Date(lastLogin))}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 md:flex-row md:gap-0'>
          <div className='w-full md:w-1/3'>
            <div className='grid grid-cols-3 gap-4 bg-[#10191D] px-5 py-4 md:rounded-xl md:p-8'>
              {/* Sidebar */}
              <div className='flex flex-col gap-1'>
                <p className='text-base text-[#96B0BD] md:text-center'>Total Spent</p>
                <p className='text-2xl text-white md:text-center'>$9K+</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-base text-[#96B0BD] md:text-center'>Total jobs</p>
                <p className='text-2xl text-white md:text-center'>44</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-base text-[#96B0BD] md:text-center'>Total hours</p>
                <p className='text-2xl text-white md:text-center'>240</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-base text-[#96B0BD] md:text-center'>Hire rate</p>
                <p className='text-2xl text-white md:text-center'>81%</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-base text-[#96B0BD] md:text-center'>Hires</p>
                <p className='text-2xl text-white md:text-center'>44</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-base text-[#96B0BD] md:text-center'>H / rate paid</p>
                <p className='text-2xl text-white md:text-center'>~$22</p>
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col gap-4 md:w-2/3 md:pl-4'>
            {/* All this should be dynamic data for sure */}
            <InfoPanel
              editAction='editPersonalInfo'
              email={user.email}
              index={-1}
              information_data={[
                {
                  id: 0,
                  idName: 'firstName',
                  label: 'First Name',
                  value: `${profileData.firstName === undefined ? profileData.fullName.split(' ')[0] : profileData.firstName}`,
                },
                { id: 1, idName: 'email', label: 'Email Address', value: `${profileData.email}` },
                {
                  id: 2,
                  idName: 'lastName',
                  label: 'Last Name',
                  value: `${profileData.lastName === undefined ? profileData.fullName.split(' ')[1] : profileData.lastName}`,
                },
                {
                  id: 3,
                  idName: 'phoneNumber',
                  label: 'Phone',
                  value: `${profileData.phoneNumber}`,
                },
              ]}
              profileData={profileData}
              setProfileData={setProfileData}
              title='Personal Information'
            />
            {profileData.companyDetails.map((company, index) => {
              return (
                <InfoPanel
                  editAction='companyDetails'
                  email={user.email}
                  index={index}
                  information_data={[
                    { id: 0, idName: 'country', label: 'Country', value: `${company.country}` },
                    {
                      id: 1,
                      idName: 'postalCode',
                      label: 'Postal Code',
                      value: `${company.postalCode}`,
                    },
                    {
                      id: 2,
                      idName: 'cityState',
                      label: 'City/State ',
                      value: `${company.cityState}`,
                    },
                    { id: 3, idName: 'timeZone', label: 'Time Zone', value: `${company.timeZone}` },
                    { id: 4, idName: 'vatID', label: 'VAT ID', value: `${company.vatID}` },
                  ]}
                  key={index}
                  profileData={profileData}
                  setProfileData={setProfileData}
                  title='Company Details'
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className='flex h-full items-center justify-center'>
        <h1 className='mt-20'>Loading...</h1>
      </div>
    </>
  );
};

export default ClientDashboard;
