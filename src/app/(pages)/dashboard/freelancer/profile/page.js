'use client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { GoChevronDown } from 'react-icons/go';
import { IoCameraOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';

import CollapsibleText from '@/components/elements/collapsible_text';
import StarRating from '@/components/elements/starRating';
import MyGigs from '@/components/pages/dashboard/freelancer/MyGigs';
import Portfolio from '@/components/pages/dashboard/freelancer/Portfolio';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import api from '@/utils/api';
import { languages, skillSets } from '@/utils/constants';

import 'swiper/css';
// import './remove_horizontal_padding.css';
import '/src/app/css/remove_horizontal_padding.css';

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
        <img className='h-5 w-5 object-contain object-center' src={iconSrc} />
        <span className='text-sm'>{handleLabel()}</span>
      </div>
      {editable && label !== 'created' ? (
        <span>
          <input
            className='border-b bg-transparent text-right text-sm text-[#96B0BD] outline-none focus:border-white'
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                [label]: e.target.value,
              }))
            }
            value={handleValue(value)}
          />
        </span>
      ) : (
        <span className='text-sm text-[#96B0BD]'>{handleValue(value)}</span>
      )}
    </div>
  );
};

const reviews = [
  {
    flagSrc: '/assets/images/flag.png',
    id: 1,
    imgSrc: '/assets/images/users/user-1.png',
    name: 'Hannibal Smith',
    rating: 5,
    reviewText:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.',
    timeAgo: '1 month ago',
  },
  {
    flagSrc: '/assets/images/flag.png',
    id: 2,
    imgSrc: '/assets/images/users/user-2.png',
    name: 'John Doe',
    rating: 4,
    reviewText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
    timeAgo: '2 weeks ago',
  },
  {
    flagSrc: '/assets/images/flag.png',
    id: 3,
    imgSrc: '/assets/images/users/user-3.png',
    name: 'Jane Doe',
    rating: 5,
    reviewText:
      'Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.',
    timeAgo: '3 days ago',
  },
];

const FreelancerProfile = () => {
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
    avatar: null,
    avgResponseTime: '',
    clientBanner: null,
    created: '',
    email: '',
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
  });

  const router = useRouter();

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

          const data = await api.get(`/api/v1/profile/get-profile/${email}`);
          setProfileData(data.data.profile);

          if (data.data.profile.freelancerBio) {
            const lines = data.data.profile.freelancerBio.split(/\r\n|\r|\n/).length;
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
        } catch (error) {
          console.error('Error while fetching user profile data:', error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [router, toast]);

  useEffect(() => {
    const lines = bio.split(/\r\n|\r|\n/).length;
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
    if (isEditBio) {
      api
        .put(`/api/v1/profile/update-freelancer-bio/${user.email}`, {
          freelancerBio: bio,
        })
        .then(() => {
          toast({
            className:
              'bg-green-500 border-none rounded-xl absolute top-[-94vh] xl:w-[15vw] md:w-[30vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
            description: <h3>Successfully updated Freelancer Bio</h3>,
            title: <h1 className='text-center'>Success</h1>,
            variant: 'default',
          });
        })
        .catch(() => {
          toast({
            className:
              'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
            description: <h3>Internal Server Error</h3>,
            title: <h1 className='text-center'>Error</h1>,
            variant: 'destructive',
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
      .then(() => {
        return toast({
          className:
            'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Successfully updated Freelancer Profile</h3>,
          title: <h1 className='text-center'>Success</h1>,
          variant: 'default',
        });
      })
      .catch(() => {
        toast({
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Internal Server Error</h3>,
          title: <h1 className='text-center'>Error</h1>,
          variant: 'destructive',
        });
      });
  };

  const saveProfile = (type) => {
    if (type === 'profileInfo') {
      const tmp = {
        location: profileData.location,
        timeZone: profileData.timeZone,
        zkpId: profileData.zkpId,
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

  const onDropHandleBannerUpload = useCallback(
    async (acceptedFiles) => {
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
              setProfileData((prev) => ({
                ...prev,
                clientBanner: tmp,
              }));
              toast({
                className:
                  'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
                description: <h3>Successfully updated Freelancer Profile</h3>,
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

      if (acceptedFiles.length > 0) {
        const image = acceptedFiles[0];
        handleBannerUpload(image);
      }
    },
    [toast, user.email]
  );

  const onDropHandleAvatarUpload = useCallback(
    async (acceptedFiles) => {
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
              setProfileData((prev) => ({
                ...prev,
                avatar: tmp,
              }));
              toast({
                className:
                  'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
                description: <h3>Successfully updated Freelancer Profile</h3>,
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

      if (acceptedFiles.length > 0) {
        const image = acceptedFiles[0];
        handleAvatarUpload(image);
      }
    },
    [toast, user.email]
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
            src={`${fetchBanner ? fetchBanner : '/assets/images/freelancer-image.jpeg'}`}
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
        <Tabs defaultValue='edit-profile'>
          <div className='flex flex-col gap-4 rounded-xl bg-[#10191D] px-3 py-4 md:flex-row md:gap-0 md:p-8'>
            <div className='flex w-full items-center gap-4 md:w-3/4 md:gap-7'>
              <div className='relative w-16 md:h-24 md:w-24'>
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
                      src={`${fetchAvatar ? fetchAvatar : '/assets/images/users/user-5.png'}`}
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
                  <h2 className='text-2xl md:text-3xl'>{user.name}</h2>
                  <img className='h-5 w-5' src='/assets/images/icons/checkmark.svg' />
                </div>
                <div className='flex flex-col gap-2 md:flex-row md:gap-4'>
                  <div className='flex items-center gap-2'>
                    <img
                      className='h-6 w-6 object-contain object-center'
                      src='/assets/images/icons/blue-top-rated.svg'
                    />
                    <p className='text-lg text-white'>Top Rated</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <img
                      className='h-6 w-6 object-contain object-center'
                      src='/assets/images/icons/green-job-success.svg'
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
                  onClick={() => setViewMode('preview')}
                  value='preview'
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  className='w-full rounded-xl px-6 data-[state=active]:bg-[#dc4f14]'
                  onClick={() => setViewMode('edit')}
                  value='edit-profile'
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
                            className='cursor-pointer'
                            height={25}
                            onClick={() => {
                              saveProfile('profileInfo');
                              setEditProfileInfo(false);
                            }}
                            src='/assets/images/icons/save.png'
                            width={25}
                          />
                        ) : (
                          <img
                            className='cursor-pointer'
                            onClick={() => setEditProfileInfo(true)}
                            src='/assets/images/icons/edit-pen.svg'
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <ProfileInfoItem
                    editable={isEditProfileInfo}
                    iconSrc='/assets/images/icons/personalcard.svg'
                    label={'zkpId'}
                    setProfileData={setProfileData}
                    value={profileData.zkpId}
                  />
                  <ProfileInfoItem
                    editable={isEditProfileInfo}
                    iconSrc='/assets/images/icons/buildings.svg'
                    label={'location'}
                    setProfileData={setProfileData}
                    value={profileData.location}
                  />
                  <ProfileInfoItem
                    editable={isEditProfileInfo}
                    iconSrc='/assets/images/icons/user-portal.svg'
                    label='created'
                    setProfileData={setProfileData}
                    value={profileData.created}
                  />
                  <ProfileInfoItem
                    editable={isEditProfileInfo}
                    iconSrc='/assets/images/icons/clocks.svg'
                    label='avgResponseTime'
                    setProfileData={setProfileData}
                    value={profileData.avgResponseTime}
                  />
                  <ProfileInfoItem
                    editable={isEditProfileInfo}
                    iconSrc='/assets/images/icons/watch.svg'
                    label={'timeZone'}
                    setProfileData={setProfileData}
                    value={profileData.timeZone}
                  />
                </div>
                <div className='flex flex-col gap-3 border-b border-[#28373e] bg-[#10191d] p-6'>
                  <div className='flex flex-row justify-between'>
                    <p className='text-lg text-[#96B0BD]'>Price</p>
                    {viewMode === 'edit' && (
                      <div className='text-xl text-[#96B0BD]'>
                        {isEditPrice ? (
                          <img
                            className='cursor-pointer'
                            height={25}
                            onClick={() => {
                              saveProfile('priceInfo');
                              setEditPrice(false);
                            }}
                            src='/assets/images/icons/save.png'
                            width={25}
                          />
                        ) : (
                          <img
                            className='cursor-pointer'
                            onClick={() => setEditPrice(true)}
                            src='/assets/images/icons/edit-pen.svg'
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <ProfileInfoItem
                    editable={isEditPrice}
                    iconSrc='/assets/images/icons/receipt-item.svg'
                    label={'hourlyRate'}
                    setProfileData={setProfileData}
                    value={profileData.hourlyRate}
                  />
                  <ProfileInfoItem
                    editable={isEditPrice}
                    iconSrc='/assets/images/icons/calendar-2.svg'
                    label={'monthlyRate'}
                    setProfileData={setProfileData}
                    value={profileData.monthlyRate}
                  />
                </div>
                <div className='flex flex-col gap-3 border-b bg-[#10191d] p-6'>
                  <div className='flex flex-row justify-between'>
                    <p className='text-lg text-[#96B0BD]'>Skills</p>
                    {viewMode === 'edit' && (
                      <div className='text-xl text-[#96B0BD]'>
                        {isEditSkills ? (
                          <img
                            className='cursor-pointer'
                            height={25}
                            onClick={() => {
                              saveProfile('skillsInfo');
                              setEditSkills(false);
                            }}
                            src='/assets/images/icons/save.png'
                            width={25}
                          />
                        ) : (
                          <img
                            className='cursor-pointer'
                            onClick={() => setEditSkills(true)}
                            src='/assets/images/icons/edit-pen.svg'
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
                              let tmp = profileData.skills.filter((Iskill) => {
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
                            className='cursor-pointer'
                            height={25}
                            onClick={() => {
                              saveProfile('languagesInfo');
                              setEditLang(false);
                            }}
                            src='/assets/images/icons/save.png'
                            width={25}
                          />
                        ) : (
                          <img
                            className='cursor-pointer'
                            onClick={() => setEditLang(true)}
                            src='/assets/images/icons/edit-pen.svg'
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
                              let tmp = profileData.languages.filter((Ilang) => {
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
                      bio={bio}
                      expandedText={expandedBio}
                      isEditBio={false}
                      previewText={previewBio}
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
                            email={user.email}
                            imagePath={imagePath}
                            key={index}
                            setProfileData={setProfileData}
                            setUploadedImagePath={setUploadedImagePath}
                            viewMode={'preview'}
                          />
                        ))}
                    </div>
                    <div className='md:hidden'>
                      <Swiper slidesPerView={1.2} spaceBetween={20}>
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
                            email={user.email}
                            imagePath={imagePath}
                            key={index}
                            setProfileData={setProfileData}
                            setUploadedGigPath={setUploadedGigPath}
                            viewMode={'preview'}
                          />
                        ))}
                    </div>
                    <div className='md:hidden'>
                      <Swiper slidesPerView={1.2} spaceBetween={20}>
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
                        <div className='flex w-full gap-6' key={review.id}>
                          <div className='flex w-full flex-col gap-2 border-b border-[#28373e] pb-6'>
                            <div className='flex flex-wrap items-center gap-4 md:flex-nowrap'>
                              <img
                                alt='user'
                                className='aspect-square h-10 w-10 rounded-full object-cover'
                                src={review.imgSrc}
                              />
                              <div className='flex w-auto items-center gap-2'>
                                <p className='text-xl'>{review.name}</p>
                                <img
                                  alt='flag'
                                  className='h-fit w-6 bg-white'
                                  src={review.flagSrc}
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
                            className='cursor-pointer'
                            height={25}
                            onClick={() => handleEditBio()}
                            src='/assets/images/icons/save.png'
                            width={25}
                          />
                        ) : (
                          <img
                            className='cursor-pointer'
                            onClick={() => handleEditBio()}
                            src='/assets/images/icons/edit-pen.svg'
                          />
                        )}
                      </div>
                    </div>
                    <CollapsibleText
                      bio={bio}
                      expandedText={expandedBio}
                      isEditBio={isEditBio}
                      previewText={previewBio}
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
                        <img className='cursor-pointer' src='/assets/images/icons/edit-pen.svg' />
                      </div>
                    </div>
                    <div className='hidden grid-cols-3 gap-4 md:grid'>
                      {profileData.portfolio.length > 0 &&
                        profileData.portfolio.map((imagePath, index) => (
                          <Portfolio
                            email={user.email}
                            imagePath={imagePath}
                            key={index}
                            setProfileData={setProfileData}
                            setUploadedImagePath={setUploadedImagePath}
                            viewMode={'edit'}
                          />
                        ))}
                      <Portfolio
                        email={user.email}
                        imagePath=''
                        key={`extra-${uploadedImagePath.length}`}
                        setProfileData={setProfileData}
                        setUploadedImagePath={setUploadedImagePath}
                        viewMode={'edit'}
                      />
                    </div>
                    <div className='md:hidden'>
                      <Swiper slidesPerView={1.2} spaceBetween={20}>
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
                        <img className='cursor-pointer' src='/assets/images/icons/edit-pen.svg' />
                      </div>
                    </div>
                    <div className='hidden grid-cols-3 gap-4 md:grid'>
                      {profileData.myGigs.length > 0 &&
                        profileData.myGigs.map((imagePath, index) => (
                          <MyGigs
                            email={user.email}
                            imagePath={imagePath}
                            key={index}
                            setProfileData={setProfileData}
                            setUploadedGigPath={setUploadedGigPath}
                            viewMode={'edit'}
                          />
                        ))}
                      <MyGigs
                        email={user.email}
                        imagePath=''
                        key={`extra-${uploadedGigPath.length}`}
                        setProfileData={setProfileData}
                        setUploadedGigPath={setUploadedGigPath}
                        viewMode={'edit'}
                      />
                    </div>
                    <div className='md:hidden'>
                      <Swiper slidesPerView={1.2} spaceBetween={20}>
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
                        <div className='flex w-full gap-6' key={review.id}>
                          <div className='flex w-full flex-col gap-2 border-b border-[#28373e] pb-6'>
                            <div className='flex flex-wrap items-center gap-4 md:flex-nowrap'>
                              <img
                                alt='user'
                                className='aspect-square h-10 w-10 rounded-full object-cover'
                                src={review.imgSrc}
                              />
                              <div className='flex w-auto items-center gap-2'>
                                <p className='text-xl'>{review.name}</p>
                                <img
                                  alt='flag'
                                  className='h-fit w-6 bg-white'
                                  src={review.flagSrc}
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
