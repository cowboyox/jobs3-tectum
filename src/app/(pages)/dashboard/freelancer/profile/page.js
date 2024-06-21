'use client';
import React, { useEffect, useState, useCallback } from 'react';
// import './remove_horizontal_padding.css';
import '/src/app/css/remove_horizontal_padding.css';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { IoInformationCircleOutline, IoCameraOutline } from 'react-icons/io5';
import { GoPlus } from 'react-icons/go';
import { GoChevronDown } from 'react-icons/go';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import CollapsibleText from '@/components/elements/collapsible_text';
import { useToast } from '@/components/ui/use-toast';
import StarRating from '@/components/elements/starRating';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Portfolio from '@/components/pages/dashboard/freelancer/Portfolio';
import MyGigs from '@/components/pages/dashboard/freelancer/MyGigs';
import api from '@/utils/api';
import RadialProgress from '@/components/ui/progress';
import { skillSets, languages } from '@/utils/constants';

const ProfileInfoItem = ({ iconSrc, label, value, setProfileData, editable }) => {
  const handleValue = (value) => {
    if (label === 'created') {
      const month = new Date(value).toLocaleString('en-EN', { month: 'short' });
      const year = new Date(value).getFullYear();
      return month + ' ' + year;
    }
    return value;
  };
  const handleLabel = () => {
    if (label === 'zkpId') {
      return 'ZKP ID';
    } else if (label === 'location') {
      return 'Location';
    } else if (label === 'created') {
      return 'Member since';
    } else if (label === 'avgResponseTime') {
      return 'Avg.resp.time';
    } else if (label === 'timeZone') {
      return 'Time Zone';
    } else if (label === 'hourlyRate') {
      return 'Per hour';
    } else if (label === 'monthlyRate') {
      return 'Monthly';
    }
  };

  return (
    <div className='flex w-full justify-between'>
      <div className='flex w-1/2 items-center gap-2'>
        <img src={iconSrc} className='h-5 w-5 object-contain object-center' />
        <span className='text-sm'>{handleLabel()}</span>
      </div>
      {editable && label !== 'created' ? (
        <span>
          <input
            className='border-b bg-transparent text-right text-sm text-[#96B0BD] outline-none focus:border-white'
            value={handleValue(value)}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                [label]: e.target.value,
              }))
            }
          ></input>
        </span>
      ) : (
        <span className='text-sm text-[#96B0BD]'>{handleValue(value)}</span>
      )}
    </div>
  );
};

const reviews = [
  {
    id: 1,
    name: 'Hannibal Smith',
    imgSrc: '/assets/images/users/user-1.png',
    flagSrc: '/assets/images/flag.png',
    timeAgo: '1 month ago',
    rating: 5,
    reviewText:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.',
  },
  {
    id: 2,
    name: 'John Doe',
    imgSrc: '/assets/images/users/user-2.png',
    flagSrc: '/assets/images/flag.png',
    timeAgo: '2 weeks ago',
    rating: 4,
    reviewText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
  },
  {
    id: 3,
    name: 'Jane Doe',
    imgSrc: '/assets/images/users/user-3.png',
    flagSrc: '/assets/images/flag.png',
    timeAgo: '3 days ago',
    rating: 5,
    reviewText:
      'Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.',
  },
];

const FreelancerProfile = () => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [uploadedImagePath, setUploadedImagePath] = useState([]);
  const [uploadedGigPath, setUploadedGigPath] = useState([]);
  const [viewMode, setViewMode] = useState('edit');

  const { toast } = useToast();
  const [user, setUser] = useState({
    email: '',
    name: '',
    role: [0],
    verified: false,
  });
  const [isEditBio, setStatusBio] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [previewBanner, setPreviewBanner] = useState(false);
  const [fetchBanner, setFetchBanner] = useState('');
  const [fetchAvatar, setFetchAvatar] = useState('');
  const [isEditProfileInfo, setEditProfileInfo] = useState(false);
  const [isEditSkills, setEditSkills] = useState(false);
  const [isEditLang, setEditLang] = useState(false);
  const [isEditPrice, setEditPrice] = useState(false);
  const [bio, setBio] = useState('Please input your bio here.');
  const [previewBio, setPreviewBio] = useState('');
  const [expandedBio, setExpandedBio] = useState('');
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
    clientBanner: null,
    avatar: null,
  });

  const router = useRouter();

  let tmp = localStorage.getItem('jobs_2024_token');

  useEffect(() => {
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
      (async () => {
        try {
          setLoading(true);
          let parsedToken = JSON.parse(tmp);
          let email = JSON.parse(tmp).data.user.email;
          setUser(JSON.parse(tmp).data.user);

          api
            .get(`/api/v1/profile/get-client-banner/${email}.client-banner.png`, {
              responseType: 'arraybuffer',
              headers: {
                Authorization: `Bearer ${parsedToken.data.token}`,
              },
            })
            .then((res) => {
              console.log('🚀 ~ api.get ~ res:', res);
              const binaryData = new Uint8Array(res.data);
              const blob = new Blob([binaryData], { type: 'image/png' });
              console.log('🚀 ~ api.get ~ blob:', blob);

              const fetchBannerUrl = URL.createObjectURL(blob);
              console.log('🚀 ~ api.get ~ fetchBannerUrl:', fetchBannerUrl);

              setFetchBanner(fetchBannerUrl);
            })
            .catch((err) => {
              console.log('🚀 ~ api.get ~ err:', err);
            });

          const data = await api.get(`/api/v1/profile/get-profile/${email}`);
          console.log('------getprofile: ', data.data.profile);
          setProfileData(data.data.profile);

          if (data.data.profile.freelancerBio) {
            const lines = data.data.profile.freelancerBio.split(/\r\n|\r|\n/).length;
            const letterCnt = data.data.profile.freelancerBio.length;
            console.log(lines, letterCnt);
            if (lines > 4) {
              let tmp = data.data.profile.freelancerBio.split(/\r\n|\r|\n/);
              let previewText = '';
              let expandedText = '';

              tmp.forEach((item, index) => {
                if (index <= 4) {
                  previewText += item + '\n'; // Add a line break for each item
                } else {
                  expandedText += item + '\n'; // Add a line break for each item
                }
              });

              setPreviewBio(previewText); // Update previewBio with the formatted text
              setExpandedBio(expandedText); // Update expandedBio with the formatted text
            } else {
              setPreviewBio(data.data.profile.freelancerBio); // If the text is less than or equal to 4 lines, set previewBio to the original text
            }
          }

          if (data.data.profile?.avatar) {
            // Convert the data to a Blob
            const binaryData = new Uint8Array(data.data.profile?.avatar?.data);
            const blob = new Blob([binaryData], { type: 'image/png' });

            // Create a URL for the Blob
            const fetchAvatarUrl = URL.createObjectURL(blob);

            setFetchAvatar(fetchAvatarUrl);
          }
        } catch (error) {
          console.log('Error while fetching user profile data:', error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  useEffect(() => {
    const lines = bio.split(/\r\n|\r|\n/).length;
    const letterCnt = bio.length;
    console.log(lines, letterCnt);
    if (lines > 4) {
      let tmp = bio.split(/\r\n|\r|\n/);
      let previewText = '';
      let expandedText = '';

      tmp.forEach((item, index) => {
        if (index <= 4) {
          previewText += item + '\n'; // Add a line break for each item
        } else {
          expandedText += item + '\n'; // Add a line break for each item
        }
      });

      setPreviewBio(previewText); // Update previewBio with the formatted text
      setExpandedBio(expandedText); // Update expandedBio with the formatted text
    } else {
      setPreviewBio(bio); // If the text is less than or equal to 4 lines, set previewBio to the original text
    }
  }, [bio]);

  const handleEditBio = () => {
    console.log('EditBio: ', isEditBio);
    if (isEditBio) {
      api
        .put(`/api/v1/profile/update-freelancer-bio/${user.email}`, {
          freelancerBio: bio,
        })
        .then((data) => {
          toast({
            variant: 'default',
            title: <h1 className='text-center'>Success</h1>,
            description: <h3>Successfully updated Freelancer Bio</h3>,
            className:
              'bg-green-500 border-none rounded-xl absolute top-[-94vh] xl:w-[15vw] md:w-[30vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          });
        })
        .catch((err) => {
          toast({
            variant: 'destructive',
            title: <h1 className='text-center'>Error</h1>,
            description: <h3>Internal Server Error</h3>,
            className:
              'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          });
        });
    }
    setStatusBio(!isEditBio);
  };

  const handleSetSkills = (skill) => {
    setProfileData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const saveToDB = (tmp) => {
    api
      .put(`/api/v1/profile/update-profileinfo/${user.email}`, tmp)
      .then((data) => {
        return toast({
          variant: 'default',
          title: <h1 className='text-center'>Success</h1>,
          description: <h3>Successfully updated Freelancer Profile</h3>,
          className:
            'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        });
      })
      .catch((err) => {
        toast({
          variant: 'destructive',
          title: <h1 className='text-center'>Error</h1>,
          description: <h3>Internal Server Error</h3>,
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        });
      });
  };

  const saveProfile = (type) => {
    if (type === 'profileInfo') {
      const tmp = {
        zkpId: profileData.zkpId,
        location: profileData.location,
        timeZone: profileData.timeZone,
      };
      saveToDB(tmp);
    } else if (type === 'priceInfo') {
      const tmp = {
        hourlyRate: profileData.hourlyRate,
        monthlyRate: profileData.monthlyRate,
      };
      saveToDB(tmp);
    } else if (type === 'skillsInfo') {
      const tmp = {
        skills: profileData.skills,
      };
      saveToDB(tmp);
    } else if (type === 'languagesInfo') {
      const tmp = {
        languages: profileData.languages,
      };
      saveToDB(tmp);
    }
  };

  const onDropHandleBannerUpload = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const image = acceptedFiles[0];
      handleBannerUpload(image);
    }
  }, []);

  const onDropHandleAvatarUpload = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const image = acceptedFiles[0];
      handleAvatarUpload(image);
    }
  }, []);

  const { getRootProps: getBannerRootProps, getInputProps: getBannerInputProps } = useDropzone({
    onDrop: onDropHandleBannerUpload,
  });

  const { getRootProps: getAvatarRootProps, getInputProps: getAvatarInputProps } = useDropzone({
    onDrop: onDropHandleAvatarUpload,
  });

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
          setFetchBanner(URL.createObjectURL(image));
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
            description: <h3>Successfully updated Freelancer Profile</h3>,
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

  const handleAvatarUpload = async (event) => {
    console.log('fileupload for avatar: ', event.target.files);
    if (event.target.files?.length) {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('file', image);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      let imageName = 'clientAvatar' + image.type.split('/')[1];

      try {
        // const res = await uploadImageToCloudinary(formData, onUploadProgress);
        const res = await api.post(
          `/api/v1/profile/upload-client-avatar/${user.email}`,
          formData,
          config
        );

        if (res.status === 200) {
          // setUploadedImagePath(URL.createObjectURL(image));
          setFetchAvatar(URL.createObjectURL(image));
          let tmp = `/images/uploads/${user.email}/clientProfile/${imageName}`;
          console.log('tmp: ', tmp);
          setProfileData((prev) => ({
            ...prev,
            avatar: tmp,
          }));
          toast({
            variant: 'default',
            title: <h1 className='text-center'>Success</h1>,
            description: <h3>Successfully updated Freelancer Profile</h3>,
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
      <div className='group relative cursor-pointer' {...getBannerRootProps()}>
        <label
          htmlFor='dropzone-banner'
          onClick={(e) => e.stopPropagation()}
          className='w-full hover:cursor-pointer'
        >
          <img
            src={`${fetchBanner ? fetchBanner : '/assets/images/freelancer-image.jpeg'}`}
            className='h-64 w-full rounded-b-2xl object-cover transition group-hover:opacity-75'
            alt='banner'
          />
          <div className='absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a272c] opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
            <IoCameraOutline className='h-6 w-6' />
          </div>
        </label>
        <Input
          {...getBannerInputProps()}
          id='dropzone-banner'
          accept='image/png, image/jpeg'
          type='file'
          className='hidden'
          onChange={(e) => handleBannerUpload(e)}
        />
      </div>
      <div className='mx-auto flex max-w-7xl -translate-y-8 flex-col gap-3 px-0 md:px-8'>
        <Tabs defaultValue='edit-profile'>
          <div className='flex flex-col gap-4 rounded-xl bg-[#10191D] px-3 py-4 md:flex-row md:gap-0 md:p-8'>
            <div className='flex w-full items-center gap-4 md:w-3/4 md:gap-7'>
              <div className='relative w-16 md:h-24 md:w-24'>
                <div
                  className='group relative aspect-square h-full w-full cursor-pointer rounded-full'
                  {...getAvatarRootProps()}
                >
                  <label
                    htmlFor='dropzone-avatar'
                    onClick={(e) => e.stopPropagation()}
                    className='w-full hover:cursor-pointer'
                  >
                    <img
                      src={`${fetchAvatar ? fetchAvatar : '/assets/images/users/user-5.png'}`}
                      className='aspect-square h-full w-full rounded-full group-hover:opacity-75'
                      alt='banner'
                    />
                    <div className='absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a272c] opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
                      <IoCameraOutline className='h-6 w-6' />
                    </div>
                  </label>
                  <Input
                    {...getAvatarInputProps()}
                    id='dropzone-avatar'
                    accept='image/png, image/jpeg'
                    type='file'
                    className='hidden'
                    onChange={(e) => handleAvatarUpload(e)}
                  />
                </div>
                {/* Change background color depending on user online status */}
                <div className='absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500'></div>
              </div>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                  <h2 className='text-2xl md:text-3xl'>{user.name}</h2>
                  <img src='/assets/images/icons/checkmark.svg' className='h-5 w-5' />
                </div>
                <div className='flex flex-col gap-2 md:flex-row md:gap-4'>
                  <div className='flex items-center gap-2'>
                    <img
                      src='/assets/images/icons/blue-top-rated.svg'
                      className='h-6 w-6 object-contain object-center'
                    />
                    <p className='text-lg text-white'>Top Rated</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <img
                      src='/assets/images/icons/green-job-success.svg'
                      className='h-6 w-6 object-contain object-center'
                    />
                    <p className='text-lg text-white'>96% Job Success</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-full items-center justify-end md:w-1/4'>
              <TabsList className='w-full rounded-xl md:w-auto'>
                <TabsTrigger
                  className='w-full rounded-xl px-6 data-[state=active]:bg-[#dc4f14]'
                  value='preview'
                  onClick={() => setViewMode('preview')}
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  className='w-full rounded-xl px-6 data-[state=active]:bg-[#dc4f14]'
                  value='edit-profile'
                  onClick={() => setViewMode('edit')}
                >
                  Edit profile
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          <div className='mt-5 flex flex-col md:flex-row'>
            {/* Sidebar */}
            <div className='w-full md:w-1/4'>
              <div className='flex w-full flex-col overflow-hidden rounded-xl'>
                <div className='flex flex-col gap-3 border-b border-[#28373e] bg-[#10191d] p-6'>
                  <div className='flex flex-row justify-between'>
                    <div className='text-lg text-[#96B0BD]'>Profile info</div>
                    {viewMode === 'edit' && (
                      <div className='text-xl text-[#96B0BD]'>
                        {isEditProfileInfo ? (
                          <img
                            src='/assets/images/icons/save.png'
                            width={25}
                            height={25}
                            className='cursor-pointer'
                            onClick={() => {
                              saveProfile('profileInfo');
                              setEditProfileInfo(false);
                            }}
                          />
                        ) : (
                          <img
                            src='/assets/images/icons/edit-pen.svg'
                            className='cursor-pointer'
                            onClick={() => setEditProfileInfo(true)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <ProfileInfoItem
                    iconSrc='/assets/images/icons/personalcard.svg'
                    label={'zkpId'}
                    value={profileData.zkpId}
                    setProfileData={setProfileData}
                    editable={isEditProfileInfo}
                  />
                  <ProfileInfoItem
                    iconSrc='/assets/images/icons/buildings.svg'
                    label={'location'}
                    value={profileData.location}
                    setProfileData={setProfileData}
                    editable={isEditProfileInfo}
                  />
                  <ProfileInfoItem
                    iconSrc='/assets/images/icons/user-portal.svg'
                    label='created'
                    value={profileData.created}
                    setProfileData={setProfileData}
                    editable={isEditProfileInfo}
                  />
                  <ProfileInfoItem
                    iconSrc='/assets/images/icons/clocks.svg'
                    label='avgResponseTime'
                    value={profileData.avgResponseTime}
                    setProfileData={setProfileData}
                    editable={isEditProfileInfo}
                  />
                  <ProfileInfoItem
                    iconSrc='/assets/images/icons/watch.svg'
                    label={'timeZone'}
                    value={profileData.timeZone}
                    setProfileData={setProfileData}
                    editable={isEditProfileInfo}
                  />
                </div>
                <div className='flex flex-col gap-3 border-b border-[#28373e] bg-[#10191d] p-6'>
                  <div className='flex flex-row justify-between'>
                    <p className='text-lg text-[#96B0BD]'>Price</p>
                    {viewMode === 'edit' && (
                      <div className='text-xl text-[#96B0BD]'>
                        {isEditPrice ? (
                          <img
                            src='/assets/images/icons/save.png'
                            width={25}
                            height={25}
                            className='cursor-pointer'
                            onClick={() => {
                              saveProfile('priceInfo');
                              setEditPrice(false);
                            }}
                          />
                        ) : (
                          <img
                            src='/assets/images/icons/edit-pen.svg'
                            className='cursor-pointer'
                            onClick={() => setEditPrice(true)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <ProfileInfoItem
                    iconSrc='/assets/images/icons/receipt-item.svg'
                    label={'hourlyRate'}
                    value={profileData.hourlyRate}
                    setProfileData={setProfileData}
                    editable={isEditPrice}
                  />
                  <ProfileInfoItem
                    iconSrc='/assets/images/icons/calendar-2.svg'
                    label={'monthlyRate'}
                    value={profileData.monthlyRate}
                    setProfileData={setProfileData}
                    editable={isEditPrice}
                  />
                </div>
                <div className='flex flex-col gap-3 border-b bg-[#10191d] p-6'>
                  <div className='flex flex-row justify-between'>
                    <p className='text-lg text-[#96B0BD]'>Skills</p>
                    {viewMode === 'edit' && (
                      <div className='text-xl text-[#96B0BD]'>
                        {isEditSkills ? (
                          <img
                            src='/assets/images/icons/save.png'
                            width={25}
                            height={25}
                            className='cursor-pointer'
                            onClick={() => {
                              saveProfile('skillsInfo');
                              setEditSkills(false);
                            }}
                          />
                        ) : (
                          <img
                            src='/assets/images/icons/edit-pen.svg'
                            className='cursor-pointer'
                            onClick={() => setEditSkills(true)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div
                    className={`flex flex-wrap gap-2 ${profileData.skills.length !== skillSets.length && isEditSkills ? 'border-b pb-3' : ''}`}
                  >
                    {profileData.skills.map((skill, index) => {
                      return (
                        <div
                          className={`${isEditSkills ? 'cursor-pointer' : ''} rounded-full border border-[#3e525b] bg-[#28373e] p-2 text-sm`}
                          key={index}
                          onClick={() => {
                            if (isEditSkills) {
                              let tmp = profileData.skills.filter((Iskill, num) => {
                                return Iskill !== skill;
                              });
                              return setProfileData((prev) => ({
                                ...prev,
                                skills: tmp,
                              }));
                            }
                          }}
                        >
                          {skill}
                        </div>
                      );
                    })}
                  </div>
                  {isEditSkills && (
                    <div className='flex flex-wrap gap-2'>
                      {skillSets.map((skill, index) => {
                        return (
                          !profileData.skills.includes(skill) && (
                            <div
                              className={`cursor-pointer rounded-full border border-[#3e525b] bg-[#28373e] p-2 text-sm`}
                              key={index}
                              onClick={() => handleSetSkills(skill)}
                            >
                              {skill}
                            </div>
                          )
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className='flex flex-col gap-3 border-b bg-[#10191d] p-6'>
                  <div className='flex flex-row justify-between'>
                    <p className='text-lg text-[#96B0BD]'>Languages</p>
                    {viewMode === 'edit' && (
                      <div className='text-xl text-[#96B0BD]'>
                        {isEditLang ? (
                          <img
                            src='/assets/images/icons/save.png'
                            width={25}
                            height={25}
                            className='cursor-pointer'
                            onClick={() => {
                              saveProfile('languagesInfo');
                              setEditLang(false);
                            }}
                          />
                        ) : (
                          <img
                            src='/assets/images/icons/edit-pen.svg'
                            className='cursor-pointer'
                            onClick={() => setEditLang(true)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div
                    className={`flex flex-wrap gap-2 ${profileData.languages.length !== languages.length && isEditLang ? 'border-b pb-3' : ''}`}
                  >
                    {profileData.languages.map((lang, index) => {
                      return (
                        <div
                          className={`${isEditLang ? 'cursor-pointer' : ''} rounded-full border border-[#3e525b] bg-[#28373e] p-2 text-sm`}
                          key={index}
                          onClick={() => {
                            if (isEditLang) {
                              let tmp = profileData.languages.filter((Ilang, num) => {
                                return Ilang !== lang;
                              });
                              return setProfileData((prev) => ({
                                ...prev,
                                languages: tmp,
                              }));
                            }
                          }}
                        >
                          {lang}
                        </div>
                      );
                    })}
                  </div>
                  {isEditLang && (
                    <div className='flex flex-wrap gap-2'>
                      {languages.map((lang, index) => {
                        return (
                          !profileData.languages.includes(lang) && (
                            <div
                              className={`cursor-pointer rounded-full border border-[#3e525b] bg-[#28373e] p-2 text-sm`}
                              key={index}
                              onClick={() =>
                                setProfileData((prev) => ({
                                  ...prev,
                                  languages: [...prev.languages, lang],
                                }))
                              }
                            >
                              {lang}
                            </div>
                          )
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Content */}
            <div className='w-full md:w-3/4 md:pl-6'>
              <TabsContent value='preview'>
                <div className='flex flex-col gap-5'>
                  <div className='flex w-full flex-col gap-2 rounded-xl bg-[#10191d] p-5 pb-12'>
                    <div className='flex flex-row justify-between'>
                      <div className='text-xl text-[#96B0BD]'>About</div>
                    </div>
                    <CollapsibleText
                      previewText={previewBio}
                      expandedText={expandedBio}
                      isEditBio={false}
                      bio={bio}
                      setBio={setBio}
                    />
                  </div>
                  <div className='flex w-full flex-col justify-between gap-5 rounded-xl bg-[#10191d] p-5'>
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-3 text-xl text-[#96B0BD] md:text-2xl'>
                        My Portfolio
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className='flex items-center'>
                              <IoInformationCircleOutline className='h-6 w-6' />
                            </TooltipTrigger>
                            <TooltipContent>Info</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className='ml-auto flex items-center gap-3 md:gap-4'>
                        <p className='cursor-pointer text-sm text-white underline'>Active</p>
                        <p className='cursor-pointer text-sm text-slate-400 hover:text-white'>
                          Drafts
                        </p>
                      </div>
                    </div>
                    <div className='hidden grid-cols-3 gap-4 md:grid'>
                      {profileData.portfolio.length > 0 &&
                        profileData.portfolio.map((imagePath, index) => (
                          <Portfolio
                            key={index}
                            imagePath={imagePath}
                            setUploadedImagePath={setUploadedImagePath}
                            email={user.email}
                            setProfileData={setProfileData}
                            viewMode={'preview'}
                          />
                        ))}
                    </div>
                    <div className='md:hidden'>
                      <Swiper spaceBetween={20} slidesPerView={1.2}>
                        <SwiperSlide>
                          {' '}
                          <Portfolio />{' '}
                        </SwiperSlide>
                        <SwiperSlide>
                          {' '}
                          <Portfolio />{' '}
                        </SwiperSlide>
                        <SwiperSlide>
                          {' '}
                          <Portfolio />{' '}
                        </SwiperSlide>
                      </Swiper>
                    </div>
                    <span className='mx-auto flex cursor-pointer items-center gap-2 shadow-inner'>
                      Show more <GoChevronDown />
                    </span>
                  </div>
                  <div className='flex w-full flex-col justify-between gap-5 rounded-xl bg-[#10191d] p-5'>
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-3 text-xl text-[#96B0BD] md:text-2xl'>
                        My Gigs
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className='flex items-center'>
                              <IoInformationCircleOutline className='h-6 w-6' />
                            </TooltipTrigger>
                            <TooltipContent>Info</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className='ml-auto flex items-center gap-3 md:gap-4'>
                        <p className='cursor-pointer text-sm text-white underline'>Active</p>
                        <p className='cursor-pointer text-sm text-slate-400 hover:text-white'>
                          Drafts
                        </p>
                      </div>
                    </div>
                    <div className='hidden grid-cols-3 gap-4 md:grid'>
                      {profileData.myGigs.length > 0 &&
                        profileData.myGigs.map((imagePath, index) => (
                          <MyGigs
                            key={index}
                            imagePath={imagePath}
                            setUploadedGigPath={setUploadedGigPath}
                            email={user.email}
                            setProfileData={setProfileData}
                            viewMode={'preview'}
                          />
                        ))}
                    </div>
                    <div className='md:hidden'>
                      <Swiper spaceBetween={20} slidesPerView={1.2}>
                        <SwiperSlide>
                          {' '}
                          <MyGigs />{' '}
                        </SwiperSlide>
                        <SwiperSlide>
                          {' '}
                          <MyGigs />{' '}
                        </SwiperSlide>
                        <SwiperSlide>
                          {' '}
                          <MyGigs />{' '}
                        </SwiperSlide>
                      </Swiper>
                    </div>
                    <span className='mx-auto flex cursor-pointer items-center gap-2 shadow-inner'>
                      Show more <GoChevronDown />
                    </span>
                  </div>
                  <div className='flex w-full flex-col gap-2 rounded-xl bg-[#10191d] p-5 pb-12'>
                    <p className='text-2xl text-[#96B0BD]'>Reviews</p>
                    <div className='mt-4 flex flex-col gap-6'>
                      {reviews.map((review) => (
                        <div key={review.id} className='flex w-full gap-6'>
                          <div className='flex w-full flex-col gap-2 border-b border-[#28373e] pb-6'>
                            <div className='flex flex-wrap items-center gap-4 md:flex-nowrap'>
                              <img
                                src={review.imgSrc}
                                className='aspect-square h-10 w-10 rounded-full object-cover'
                                alt='user'
                              />
                              <div className='flex w-auto items-center gap-2'>
                                <p className='text-xl'>{review.name}</p>
                                <img
                                  src={review.flagSrc}
                                  className='h-fit w-6 bg-white'
                                  alt='flag'
                                />
                              </div>
                              <div className='ml-auto flex w-full items-center justify-between gap-3 md:w-auto md:justify-normal'>
                                <p className='text-base text-[#526872]'>{review.timeAgo}</p>
                                <StarRating rating={review.rating} />
                              </div>
                            </div>
                            <div className='mt-2 md:mt-0 md:pl-14'>
                              <p className='text-base text-white'>{review.reviewText}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <span className='mx-auto flex cursor-pointer items-center gap-2 shadow-inner'>
                        Show more <GoChevronDown />
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='edit-profile'>
                <div className='flex flex-col gap-5'>
                  <div className='flex w-full flex-col gap-2 rounded-xl bg-[#10191d] p-5 pb-12'>
                    <div className='flex flex-row justify-between'>
                      <div className='text-xl text-[#96B0BD]'>About</div>
                      <div className='text-xl text-[#96B0BD]'>
                        {isEditBio ? (
                          <img
                            src='/assets/images/icons/save.png'
                            width={25}
                            height={25}
                            className='cursor-pointer'
                            onClick={() => handleEditBio()}
                          />
                        ) : (
                          <img
                            src='/assets/images/icons/edit-pen.svg'
                            className='cursor-pointer'
                            onClick={() => handleEditBio()}
                          />
                        )}
                      </div>
                    </div>
                    <CollapsibleText
                      previewText={previewBio}
                      expandedText={expandedBio}
                      isEditBio={isEditBio}
                      bio={bio}
                      setBio={setBio}
                    />
                  </div>
                  <div className='flex w-full flex-col justify-between gap-5 rounded-xl bg-[#10191d] p-5'>
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-3 text-xl text-[#96B0BD] md:text-2xl'>
                        My Portfolio
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className='flex items-center'>
                              <IoInformationCircleOutline className='h-6 w-6' />
                            </TooltipTrigger>
                            <TooltipContent>Info</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className='ml-auto flex items-center gap-3 md:gap-4'>
                        <p className='cursor-pointer text-sm text-white underline'>Active</p>
                        <p className='cursor-pointer text-sm text-slate-400 hover:text-white'>
                          Drafts
                        </p>
                        <img src='/assets/images/icons/edit-pen.svg' className='cursor-pointer' />
                      </div>
                    </div>
                    <div className='hidden grid-cols-3 gap-4 md:grid'>
                      {profileData.portfolio.length > 0 &&
                        profileData.portfolio.map((imagePath, index) => (
                          <Portfolio
                            key={index}
                            imagePath={imagePath}
                            setUploadedImagePath={setUploadedImagePath}
                            email={user.email}
                            setProfileData={setProfileData}
                            viewMode={'edit'}
                          />
                        ))}
                      <Portfolio
                        key={`extra-${uploadedImagePath.length}`}
                        imagePath=''
                        setUploadedImagePath={setUploadedImagePath}
                        email={user.email}
                        setProfileData={setProfileData}
                        viewMode={'edit'}
                      />
                    </div>
                    <div className='md:hidden'>
                      <Swiper spaceBetween={20} slidesPerView={1.2}>
                        <SwiperSlide>
                          {' '}
                          <Portfolio />{' '}
                        </SwiperSlide>
                        <SwiperSlide>
                          {' '}
                          <Portfolio />{' '}
                        </SwiperSlide>
                        <SwiperSlide>
                          {' '}
                          <Portfolio />{' '}
                        </SwiperSlide>
                      </Swiper>
                    </div>
                    <span className='mx-auto flex cursor-pointer items-center gap-2 shadow-inner'>
                      Show more <GoChevronDown />
                    </span>
                  </div>
                  <div className='flex w-full flex-col justify-between gap-5 rounded-xl bg-[#10191d] p-5'>
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-3 text-xl text-[#96B0BD] md:text-2xl'>
                        My Gigs
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className='flex items-center'>
                              <IoInformationCircleOutline className='h-6 w-6' />
                            </TooltipTrigger>
                            <TooltipContent>Info</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className='ml-auto flex items-center gap-3 md:gap-4'>
                        <p className='cursor-pointer text-sm text-white underline'>Active</p>
                        <p className='cursor-pointer text-sm text-slate-400 hover:text-white'>
                          Drafts
                        </p>
                        <img src='/assets/images/icons/edit-pen.svg' className='cursor-pointer' />
                      </div>
                    </div>
                    <div className='hidden grid-cols-3 gap-4 md:grid'>
                      {profileData.myGigs.length > 0 &&
                        profileData.myGigs.map((imagePath, index) => (
                          <MyGigs
                            key={index}
                            imagePath={imagePath}
                            setUploadedGigPath={setUploadedGigPath}
                            email={user.email}
                            setProfileData={setProfileData}
                            viewMode={'edit'}
                          />
                        ))}
                      <MyGigs
                        key={`extra-${uploadedGigPath.length}`}
                        imagePath=''
                        setUploadedGigPath={setUploadedGigPath}
                        email={user.email}
                        setProfileData={setProfileData}
                        viewMode={'edit'}
                      />
                    </div>
                    <div className='md:hidden'>
                      <Swiper spaceBetween={20} slidesPerView={1.2}>
                        <SwiperSlide>
                          {' '}
                          <MyGigs />{' '}
                        </SwiperSlide>
                        <SwiperSlide>
                          {' '}
                          <MyGigs />{' '}
                        </SwiperSlide>
                        <SwiperSlide>
                          {' '}
                          <MyGigs />{' '}
                        </SwiperSlide>
                      </Swiper>
                    </div>
                    <span className='mx-auto flex cursor-pointer items-center gap-2 shadow-inner'>
                      Show more <GoChevronDown />
                    </span>
                  </div>
                  <div className='flex w-full flex-col gap-2 rounded-xl bg-[#10191d] p-5 pb-12'>
                    <p className='text-2xl text-[#96B0BD]'>Reviews</p>
                    <div className='mt-4 flex flex-col gap-6'>
                      {reviews.map((review) => (
                        <div key={review.id} className='flex w-full gap-6'>
                          <div className='flex w-full flex-col gap-2 border-b border-[#28373e] pb-6'>
                            <div className='flex flex-wrap items-center gap-4 md:flex-nowrap'>
                              <img
                                src={review.imgSrc}
                                className='aspect-square h-10 w-10 rounded-full object-cover'
                                alt='user'
                              />
                              <div className='flex w-auto items-center gap-2'>
                                <p className='text-xl'>{review.name}</p>
                                <img
                                  src={review.flagSrc}
                                  className='h-fit w-6 bg-white'
                                  alt='flag'
                                />
                              </div>
                              <div className='ml-auto flex w-full items-center justify-between gap-3 md:w-auto md:justify-normal'>
                                <p className='text-base text-[#526872]'>{review.timeAgo}</p>
                                <StarRating rating={review.rating} />
                              </div>
                            </div>
                            <div className='mt-2 md:mt-0 md:pl-14'>
                              <p className='text-base text-white'>{review.reviewText}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <span className='mx-auto flex cursor-pointer items-center gap-2 shadow-inner'>
                        Show more <GoChevronDown />
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
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

export default FreelancerProfile;
