'use client';
import React, { useState, useEffect, useCallback } from 'react';
import '/src/app/css/remove_horizontal_padding.css';
import { IoCameraOutline } from 'react-icons/io5';
import { useDropzone } from 'react-dropzone';

import api from '@/utils/api';
import { Input } from '@/components/ui/input';
import { backend_url } from '@/utils/variables';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

import InfoPanel from './infoPanel';

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
  const [uploadedBanner, setUploadedBanner] = useState('');
  const [profileData, setProfileData] = useState({
    avgResponseTime: '',
    email: '',
    created: '',
    freelancerBio: '',
    fullName: '',
    hourlyRate: '',
    languages: [],
    location: '',
    monthlyRate: '',
    myGigs: [],
    portfolio: [],
    profileType: 0,
    skills: [],
    timeZone: '',
    userId: '',
    zkpId: '',
    phoneNumber: '',
    companyDetails: [
      {
        country: '',
        postalCode: '',
        cityState: '',
        timeZone: '',
        vatID: '',
      },
    ],
    firstName: '',
    lastName: '',
    clientBanner: '/images/clientBanner.jpeg',
  });
  const [previewBanner, setPreviewBanner] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [fetchBanner, setFetchBanner] = useState('');
  useEffect(() => {
    let tmp = localStorage.getItem('jobs_2024_token');
    if (tmp === null) {
      toast({
        variant: 'destructive',
        title: <h1 className='text-center'>Error</h1>,
        description: <h3>Please Login First</h3>,
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
      });
      alert('Please Login First');
      router.push('/');
    } else {
      let email = JSON.parse(tmp).data.user.email;
      setUser(JSON.parse(tmp).data.user);
      api.get(`/api/v1/profile/get-profile/${email}`).then((data) => {
        console.log('------getprofile: ', data.data.profile, JSON.parse(tmp).data.user);
        setProfileData(data.data.profile);
        let fetchBannerUrl = backend_url + '/' + data.data.profile.clientBanner;
        setFetchBanner(fetchBannerUrl);
        setPreviewBanner(false);
        setLoading(false);
      });
      api.get(`/api/v1/user/get-last-login/${email}`).then((data) => {
        setLastLogin(data.data.data);
      });
    }
  }, []);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const image = acceptedFiles[0];
      // setSelectedImage(image);
      handleBannerUpload(image);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleBannerUpload = async (event) => {
    console.log('fileupload: ', event.target.files);
    if (event.target.files?.length) {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('file', image);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      let imageName = 'clientBanner' + image.type.split('/')[1];

      try {
        // const res = await uploadImageToCloudinary(formData, onUploadProgress);
        const res = await api.post(
          `/api/v1/profile/upload-client-banner/${user.email}`,
          formData,
          config
        );

        if (res.status === 200) {
          // setUploadedImagePath(URL.createObjectURL(image));
          setUploadedBanner(URL.createObjectURL(image));
          setPreviewBanner(true);
          let tmp = `/images/uploads/${user.email}/clientProfile/${imageName}`;
          console.log('tmp: ', tmp);
          setProfileData((prev) => ({
            ...prev,
            clientBanner: tmp,
          }));
          toast({
            variant: 'default',
            title: <h1 className='text-center'>Success</h1>,
            description: <h3>Successfully updated Client Profile</h3>,
            className:
              'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          });
        }
      } catch (error) {
        setLoading(false);
        console.error('Error uploading image:', error);
        toast({
          variant: 'destructive',
          title: <h1 className='text-center'>Error</h1>,
          description: <h3>Internal Server Error</h3>,
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        });
      }
    }
  };
  return !isLoading ? (
    <div className='p-0'>
      <div className='group relative cursor-pointer' {...getRootProps()}>
        <label
          className='w-full hover:cursor-pointer'
          htmlFor='dropzone-banner'
          onClick={(e) => e.stopPropagation()}
        >
          <img
            alt='banner'
            className='h-64 w-full rounded-b-2xl object-cover transition group-hover:opacity-75'
            src={`${previewBanner ? uploadedBanner : fetchBanner}`}
          />
          <div className='absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a272c] opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
            <IoCameraOutline className='h-6 w-6' />
          </div>
        </label>
        <Input
          {...getInputProps()}
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
            <img
              className='aspect-square h-full w-full rounded-full'
              src='/assets/images/users/user-5.png'
            />
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
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      timeZoneName: 'short', // Include the timezone name
                      hour12: true, // Use 12-hour clock
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
                  label: 'First Name',
                  value: `${profileData.firstName === undefined ? profileData.fullName.split(' ')[0] : ''}`,
                  idName: 'firstName',
                },
                { id: 1, label: 'Email Address', value: `${profileData.email}`, idName: 'email' },
                {
                  id: 2,
                  label: 'Last Name',
                  value: `${profileData.lastName === undefined ? profileData.fullName.split(' ')[1] : ''}`,
                  idName: 'lastName',
                },
                {
                  id: 3,
                  label: 'Phone',
                  value: `${profileData.phoneNumber}`,
                  idName: 'phoneNumber',
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
                    { id: 0, label: 'Country', value: `${company.country}`, idName: 'country' },
                    {
                      id: 1,
                      label: 'Postal Code',
                      value: `${company.postalCode}`,
                      idName: 'postalCode',
                    },
                    {
                      id: 2,
                      label: 'City/State ',
                      value: `${company.cityState}`,
                      idName: 'cityState',
                    },
                    { id: 3, label: 'Time Zone', value: `${company.timeZone}`, idName: 'timeZone' },
                    { id: 4, label: 'VAT ID', value: `${company.vatID}`, idName: 'vatID' },
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
    <></>
  );
};

export default ClientDashboard;
