'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { IoCameraOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';

import CollapsibleText from '@/components/elements/collapsible_text';
import StarRating from '@/components/elements/starRating';
import MyGigs from '@/components/pages/dashboard/freelancer/MyGigs';
import Portfolio from '@/components/pages/dashboard/freelancer/Portfolio';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/ContextProvider';
import api from '@/utils/api';
import { languages, skillSets, TimeZone, USER_ROLE } from '@/utils/constants';

import 'swiper/css';
// import './remove_horizontal_padding.css';
import '/src/app/css/remove_horizontal_padding.css';

const ProfileTimeZone = ({ value, setProfileData, editable }) => {
  const handleChange = (value) => {
    setProfileData((prev) => ({
      ...prev,
      timeZone: value,
    }));
  };

  return (
    <div className='flex w-full justify-between'>
      <div className='flex w-1/2 items-center gap-2'>
        <img
          className='h-5 w-5 object-contain object-center'
          src={'/assets/images/icons/watch.svg'}
        />
        <span className='text-sm'>Time Zone</span>
      </div>
      {editable ? (
        <Select defaultValue={value} onValueChange={handleChange}>
          <SelectTrigger className='flex w-auto min-w-20 gap-1 rounded-xl bg-[#10191D] py-5 mobile:hidden mobile:p-2'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent align='end' className='rounded-xl bg-[#10191D] p-1'>
            <SelectGroup className='flex flex-col gap-2'>
              {Object.values(TimeZone).map((value, index) => {
                return (
                  <SelectItem
                    className='cursor-pointer rounded bg-[#1B272C]'
                    key={index}
                    value={value}
                  >
                    {value}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <span className='text-sm text-[#96B0BD]'>{value}</span>
      )}
    </div>
  );
};

const ProfileInfoItem = ({ iconSrc, label, value, setProfileData, editable }) => {
  const handleValue = (value) => {
    if (label === 'created') {
      const month = new Date(value).toLocaleString('en-EN', { month: 'short' });
      const year = new Date(value).getFullYear();
      return month + ' ' + year;
    }
    if (label === 'hourlyRate' || label === 'monthlyRate') {
      if (Number(value) < 0) return '0';
      else return value;
    }

    if (label === 'avgResponseTime') {
      const millisInHour = 1000 * 60 * 60;
      const millisInMinute = 1000 * 60;

      const hours = Math.floor(parseInt(value) / millisInHour);
      const minutes = Math.floor((parseInt(value) % millisInHour) / millisInMinute);

      return hours ? `${hours}hr ${minutes}min` : `${minutes}min`;
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

  console.log('label', label, ' editable ', editable);

  return (
    <div className='flex w-full justify-between'>
      <div className='flex w-1/2 items-center gap-2'>
        <img className='h-5 w-5 object-contain object-center' src={iconSrc} />
        <span className='text-sm'>{handleLabel()}</span>
      </div>
      {editable && label !== 'created' && label !== 'avgResponseTime' ? (
        <span className='flex gap-0'>
          <input
            className={`border-b bg-transparent text-right text-sm text-[#96B0BD] outline-none ${(label === 'hourlyRate' || label === 'monthlyRate') && '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'} `}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                [label]: e.target.value,
              }))
            }
            type={label === 'hourlyRate' || label === 'monthlyRate' ? 'number' : 'text'}
            value={handleValue(value)}
          />
          {(label === 'hourlyRate' || label === 'monthlyRate') && (
            <span className='text-sm text-[#96B0BD]'>&nbsp;$</span>
          )}
        </span>
      ) : (
        <span className='text-sm text-[#96B0BD]'>
          {label === 'hourlyRate' || label === 'monthlyRate'
            ? handleValue(value) + ' $'
            : handleValue(value)}
        </span>
      )}
    </div>
  );
};

const reviews = [];

const FreelancerProfile = () => {
  const [uploadedImagePath, setUploadedImagePath] = useState([]);
  const [uploadedGigPath, setUploadedGigPath] = useState([]);
  const [viewMode, setViewMode] = useState('preview');
  const maxFreelancerTitle = 50;
  const { toast } = useToast();
  const [isEditBio, setStatusBio] = useState(true);
  const [isEditTitle, setIsEditTitle] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [fetchBanner, setFetchBanner] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [fetchAvatar, setFetchAvatar] = useState('');
  const [isEditProfileInfo, setEditProfileInfo] = useState(false);
  const [isEditSkills, setEditSkills] = useState(false);
  const [isEditLang, setEditLang] = useState(false);
  const [isEditPrice, setEditPrice] = useState(false);
  const [bio, setBio] = useState('Please input your bio here.');
  const [previewBio, setPreviewBio] = useState('');
  const [expandedBio, setExpandedBio] = useState('');
  const { profileId } = useParams();
  const auth = useCustomContext();
  const [profileData, setProfileData] = useState({
    avatar: null,
    avgResponseTime: '',
    clientBanner: null,
    created: '',
    email: '',
    freelancerBio: '',
    freelancerTitle: '',
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
  const [portfolioShowNumber, setPortfolioShowNumber] = useState(3);
  const [gigShowNumber, setGigShowNumber] = useState(3);

  const router = useRouter();
  const min = (a, b) => {
    return a < b ? a : b;
  };

  useEffect(() => {
    setPortfolioShowNumber(3);
    setGigShowNumber(3);
  }, [viewMode]);

  useEffect(() => {
    if (auth?.currentProfile?._id === profileId) {
      setIsAuth(true);
      // setViewMode('edit');
    } else {
      setIsAuth(false);
      // setViewMode('preview');
    }
  }, [auth, profileId]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const data = await api.get(`/api/v1/profile/get_profile_by_id/${profileId}`);
        setProfileData(data.data.profile);
        const data1 = await api.get(
          `/api/v1/freelancer_gig/find_all_gigs_by_email/${data.data.profile.email}`
        );
        setProfileData((prev) => ({
          ...prev,
          myGigs: data1.data.data,
        }));
        const data2 = await api.get(
          `/api/v1/freelancer_portfolio/find_all_portfolios_by_email/${data.data.profile.email}`
        );
        setProfileData((prev) => ({
          ...prev,
          portfolio: data2.data.data,
        }));

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
          setBio(data.data.profile.freelancerBio);
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
  }, [router, toast, profileId]);

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

  useEffect(() => {
    if (viewMode === 'preview') {
      setEditPrice(false);
      setEditProfileInfo(false);
    }
  }, [viewMode]);

  console.log('isEditPrice', isEditPrice);

  const handleEditBio = () => {
    if (isEditBio) {
      api
        .put(`/api/v1/profile/update-freelancer-bio/${profileData.email}`, {
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
  const handleEditTitle = () => {
    if (isEditTitle) {
      api
        .put(`/api/v1/profile/update-freelancer-title/${profileData.email}`, {
          freelancerTitle: profileData.freelancerTitle,
        })
        .then(() => {
          toast({
            className:
              'bg-green-500 border-none rounded-xl absolute top-[-94vh] xl:w-[15vw] md:w-[30vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
            description: <h3>Successfully updated Freelancer Title</h3>,
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
    setIsEditTitle(!isEditTitle);
  };

  const handleSetSkills = (skill) => {
    setProfileData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const saveToDB = (tmp) => {
    api
      .put(`/api/v1/profile/update-profileinfo/${profileData.email}/${USER_ROLE.FREELANCER}`, tmp)
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

  const handleBannerUpload = useCallback(
    async (event) => {
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
    },
    [profileData._id, toast]
  );

  const onDropHandleBannerUpload = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const image = acceptedFiles[0];
        handleBannerUpload(image);
      }
    },
    [handleBannerUpload]
  );

  const handleAvatarUpload = useCallback(
    async (event) => {
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
            `/api/v1/profile/upload-client-avatar/${profileData._id}`,
            formData,
            config
          );

          if (res.status === 200) {
            // setUploadedImagePath(URL.createObjectURL(image));
            // setFetchAvatar(URL.createObjectURL(image));
            // let tmp = `/images/uploads/${user.email}/clientProfile/${imageName}`;
            setProfileData((prev) => ({
              ...prev,
              avatarURL: res.data.data,
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
    },
    [profileData._id, toast]
  );

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
  console.log('profileData', profileData);

  const handleChangeFreelancerTitle = (value) => {
    console.log('value ', value, ' value.length', value.length);
    if (value.length <= maxFreelancerTitle) {
      setProfileData({ ...profileData, freelancerTitle: value });
    } else {
      return toast({
        className:
          'bg-yellow-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Title can not exceeds 50 characters.</h3>,
        title: <h1 className='text-center'>Warning</h1>,
        variant: 'default',
      });
    }
  };

  return !isLoading ? (
    <div className='w-full p-0'>
      <div
        className={`group relative w-full ${isAuth && 'cursor-pointer'}`}
        {...getBannerRootProps()}
      >
        <label
          className={`w-full ${isAuth && 'hover:cursor-pointer'}`}
          htmlFor='dropzone-banner'
          onClick={(e) => e.stopPropagation()}
        >
          <img
            alt='banner'
            className='h-64 w-full rounded-b-2xl object-cover transition group-hover:opacity-75'
            src={
              profileData?.clientBannerURL
                ? profileData.clientBannerURL
                : '/assets/images/freelancer-image.jpeg'
            }
          />
          {isAuth && (
            <div className='absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a272c] opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
              <IoCameraOutline className='h-6 w-6' />
            </div>
          )}
        </label>
        {isAuth && (
          <Input
            {...getBannerInputProps()}
            accept='image/png, image/jpeg'
            className='hidden'
            id='dropzone-banner'
            onChange={(e) => handleBannerUpload(e)}
            type='file'
          />
        )}
      </div>
      <div className='mx-auto flex w-full max-w-7xl -translate-y-8 flex-col gap-3 px-0 md:px-8'>
        <Tabs defaultValue='preview'>
          <div className='flex flex-col gap-4 rounded-xl bg-[#10191D] px-3 py-4 md:flex-row md:gap-0 md:p-8'>
            <div className='flex w-full items-center gap-4 md:w-3/4 md:gap-7'>
              <div className='relative w-16 md:h-24 md:w-24'>
                <div
                  className='group relative aspect-square h-full w-full cursor-pointer rounded-full'
                  {...getAvatarRootProps()}
                >
                  <label
                    className={`w-full ${isAuth && 'hover:cursor-pointer'}`}
                    htmlFor='dropzone-avatar'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      alt='banner'
                      className='aspect-square h-full w-full rounded-full group-hover:opacity-75'
                      src={
                        profileData?.avatarURL
                          ? profileData.avatarURL
                          : '/assets/images/users/user-5.png'
                      }
                    />
                    {isAuth && (
                      <div className='absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a272c] opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
                        <IoCameraOutline className='h-6 w-6' />
                      </div>
                    )}
                  </label>
                  {isAuth && (
                    <Input
                      {...getAvatarInputProps()}
                      accept='image/png, image/jpeg'
                      className='hidden'
                      id='dropzone-avatar'
                      onChange={(e) => handleAvatarUpload(e)}
                      type='file'
                    />
                  )}
                </div>
                {/* Change background color depending on user online status */}
                <div
                  className={`absolute bottom-1 right-1 h-4 w-4 rounded-full ${
                    auth?.currentProfile?.status === 'online'
                      ? 'bg-green-500'
                      : auth?.currentProfile?.status === 'idle'
                        ? 'bg-yellow-500'
                        : 'bg-gray-500'
                  } `}
                />
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
                      src='/assets/images/icons/blue-top-rated.svg'
                    />
                    <p className='text-lg text-white'>Top Rated</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <img
                      className='h-6 w-6 object-contain object-center'
                      src='/assets/images/icons/green-job-success.svg'
                    />
                    <p className='text-lg text-white'>{profileData.jobSuccessScore}% Job Success</p>
                  </div>
                </div>
              </div>
            </div>
            {isAuth && (
              <div className='flex w-full items-center justify-end md:w-1/4'>
                <TabsList className='h-[60px] w-full rounded-xl md:w-auto'>
                  <TabsTrigger
                    className='h-[50px] w-full rounded-xl px-6 data-[state=active]:bg-[#dc4f14]'
                    onClick={() => setViewMode('preview')}
                    value='preview'
                  >
                    Preview
                  </TabsTrigger>
                  <TabsTrigger
                    className='h-[50px] w-full rounded-xl px-6 data-[state=active]:bg-[#dc4f14]'
                    onClick={() => setViewMode('edit')}
                    value='edit-profile'
                  >
                    Edit profile
                  </TabsTrigger>
                </TabsList>
              </div>
            )}
            {/* {isAuth && (
            <div className='flex w-full rounded-xl bg-[#28373E] px-1 py-1 text-base md:w-1/4 md:flex-col md:py-2 lg:flex-row lg:py-1'>
              <button
                className={`w-1/2 cursor-pointer text-center md:w-full lg:w-1/2 ${viewMode === 'preview' && 'roudned-xl border bg-[#DC4F13] py-[10px]'}`}
                onClick={() => {
                  setViewMode('preview');
                }}
              >
                Preview
              </button>
              <button
                className={`w-1/2 cursor-pointer text-center md:w-full lg:w-1/2 ${viewMode === 'edit' && 'roudned-xl border bg-[#DC4F13] py-[10px]'}`}
                onClick={() => setViewMode('edit')}
              >
                Edit
              </button>
            </div>
            )} */}
          </div>
          <div className='mt-5 flex w-full flex-col md:flex-row'>
            {/* Sidebar */}
            <div className='w-full md:w-1/4'>
              <div className='flex w-full flex-col overflow-hidden rounded-xl'>
                <div className='flex flex-col gap-3 border-b border-[#28373e] bg-[#10191d] p-6'>
                  <div className='flex flex-row justify-between'>
                    <div className='text-lg text-[#96B0BD]'>Profile info</div>
                    {isAuth && viewMode === 'edit' && (
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
                  <ProfileTimeZone
                    editable={isEditProfileInfo}
                    setProfileData={setProfileData}
                    value={profileData.timeZone}
                  />
                </div>
                <div className='flex flex-col gap-3 border-b border-[#28373e] bg-[#10191d] p-6'>
                  <div className='flex flex-row justify-between'>
                    <p className='text-lg text-[#96B0BD]'>Price</p>
                    {isAuth && viewMode === 'edit' && (
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
                    {isAuth && viewMode === 'edit' && (
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
                    {isAuth && viewMode === 'edit' && (
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
                  {isAuth && isEditLang && (
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
                      <div className='text-xl text-[#96B0BD]'>Title</div>
                    </div>
                    <div className='text-base'>{profileData.freelancerTitle}</div>
                  </div>
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
                      {viewMode === 'edit' && (
                        <div className='ml-auto flex items-center gap-3 md:gap-4'>
                          <p className='cursor-pointer text-sm text-white underline'>Active</p>
                          <p className='cursor-pointer text-sm text-slate-400 hover:text-white'>
                            Drafts
                          </p>
                        </div>
                      )}
                    </div>
                    <div className='hidden grid-cols-1 gap-4 md:grid lg:grid-cols-2 xl:grid-cols-3'>
                      {profileData.portfolio.length > 0 &&
                        profileData.portfolio
                          .slice(0, min(portfolioShowNumber, profileData.portfolio.length))
                          .map((index, key) => (
                            <Portfolio
                              email={profileData.email}
                              imagePath={
                                index.gallery?.images[0]
                                  ? index.gallery?.images[0]
                                  : '/assets/images/portfolio_works/portfolio.jpeg'
                              }
                              key={key}
                              portfolioId={index._id}
                              profileId={profileData._id}
                              setProfileData={setProfileData}
                              setUploadedImagePath={setUploadedImagePath}
                              title={index.portfolioTitle}
                              viewMode={viewMode}
                            />
                          ))}
                    </div>
                    {profileData.portfolio.length === 0 && (
                      <div className='mb-20 mt-10 text-center text-3xl font-bold'>
                        Nothing Here yet
                      </div>
                    )}
                    <div className='md:hidden'>
                      <Swiper slidesPerView={1.2} spaceBetween={20}>
                        {profileData.portfolio.length > 0 &&
                          profileData.portfolio
                            .slice(0, min(portfolioShowNumber, profileData.portfolio.length))
                            .map((index, key) => (
                              <SwiperSlide key={key}>
                                {' '}
                                <Portfolio
                                  email={profileData.email}
                                  imagePath={
                                    index.gallery?.images[0]
                                      ? index.gallery?.images[0]
                                      : '/assets/images/portfolio_works/portfolio.jpeg'
                                  }
                                  portfolioId={index._id}
                                  profileId={profileData._id}
                                  setProfileData={setProfileData}
                                  setUploadedImagePath={setUploadedImagePath}
                                  title={index.portfolioTitle}
                                  viewMode={viewMode}
                                />{' '}
                              </SwiperSlide>
                            ))}
                      </Swiper>
                    </div>
                    {profileData.portfolio.length > 3 && (
                      <span
                        className='mx-auto hidden cursor-pointer items-center gap-2 shadow-inner md:flex'
                        onClick={() => {
                          if (portfolioShowNumber < profileData.portfolio.length)
                            setPortfolioShowNumber(portfolioShowNumber + 3);
                          else setPortfolioShowNumber(3);
                        }}
                      >
                        {portfolioShowNumber >= profileData.portfolio.length
                          ? 'Show Less'
                          : 'Show More'}
                        {portfolioShowNumber >= profileData.portfolio.length ? (
                          <GoChevronUp />
                        ) : (
                          <GoChevronDown />
                        )}
                      </span>
                    )}
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
                      {viewMode === 'edit' && (
                        <div className='ml-auto flex items-center gap-3 md:gap-4'>
                          <p className='cursor-pointer text-sm text-white underline'>Active</p>
                          <p className='cursor-pointer text-sm text-slate-400 hover:text-white'>
                            Drafts
                          </p>
                        </div>
                      )}
                    </div>
                    <div className='hidden grid-cols-1 justify-center gap-4 md:grid lg:grid-cols-2 xl:grid-cols-3'>
                      {profileData.myGigs?.length > 0 &&
                        profileData.myGigs
                          .slice(0, min(gigShowNumber, profileData.myGigs.length))
                          .map((myGig, key) => (
                            <MyGigs
                              email={profileData.email}
                              gigId={myGig._id}
                              imagePath={
                                myGig.gallery?.images[0]
                                  ? myGig.gallery?.images[0]
                                  : '/assets/images/portfolio_works/portfolio.jpeg'
                              }
                              key={key}
                              setProfileData={setProfileData}
                              setUploadedGigPath={setUploadedGigPath}
                              title={myGig.gigTitle}
                              viewMode={'preview'}
                            />
                          ))}
                    </div>
                    {profileData.myGigs.length === 0 && (
                      <div className='mb-20 mt-10 text-center text-3xl font-bold'>
                        Nothing Here yet
                      </div>
                    )}
                    <div className='md:hidden'>
                      <Swiper slidesPerView={1.2} spaceBetween={20}>
                        {profileData.myGigs?.length > 0 &&
                          profileData.myGigs
                            .slice(0, min(gigShowNumber, profileData.myGigs.length))
                            .map((myGig, key) => (
                              <SwiperSlide key={key}>
                                {' '}
                                <MyGigs
                                  email={profileData.email}
                                  gigId={myGig._id}
                                  imagePath={
                                    myGig.gallery?.images[0]
                                      ? myGig.gallery?.images[0]
                                      : '/assets/images/portfolio_works/portfolio.jpeg'
                                  }
                                  setProfileData={setProfileData}
                                  setUploadedGigPath={setUploadedGigPath}
                                  title={myGig.gigTitle}
                                  viewMode={'preview'}
                                />{' '}
                              </SwiperSlide>
                            ))}
                      </Swiper>
                    </div>
                    {profileData.myGigs.length > 3 && (
                      <span
                        className='mx-auto hidden cursor-pointer items-center gap-2 shadow-inner md:flex'
                        onClick={() => {
                          if (gigShowNumber < profileData.myGigs.length)
                            setGigShowNumber(gigShowNumber + 3);
                          else setGigShowNumber(3);
                        }}
                      >
                        {gigShowNumber >= profileData.myGigs.length ? 'Show Less' : 'Show More'}
                        {gigShowNumber >= profileData.myGigs.length ? (
                          <GoChevronUp />
                        ) : (
                          <GoChevronDown />
                        )}
                      </span>
                    )}
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
                      {reviews.length === 0 && (
                        <div className='mb-20 mt-10 text-center text-3xl font-bold'>
                          Nothing Here yet
                        </div>
                      )}
                      {reviews.length > 1 && (
                        <span className='mx-auto flex cursor-pointer items-center gap-2 shadow-inner'>
                          Show more <GoChevronDown />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='edit-profile'>
                <div className='flex flex-col gap-5'>
                  <div className='flex w-full flex-col gap-2 rounded-xl bg-[#10191d] p-5 pb-12'>
                    <div className='flex flex-row justify-between'>
                      <div className='text-xl text-[#96B0BD]'>Title</div>
                      {isAuth && (
                        <div className='text-xl text-[#96B0BD]'>
                          {isEditTitle ? (
                            <img
                              className='cursor-pointer'
                              height={25}
                              onClick={() => handleEditTitle()}
                              src='/assets/images/icons/save.png'
                              width={25}
                            />
                          ) : (
                            <img
                              className='cursor-pointer'
                              onClick={() => handleEditTitle()}
                              src='/assets/images/icons/edit-pen.svg'
                            />
                          )}
                        </div>
                      )}
                    </div>
                    <div className='w-full'>
                      {isEditTitle ? (
                        <input
                          className={`w-full border-b bg-transparent text-sm text-white outline-none`}
                          onChange={(e) => handleChangeFreelancerTitle(e.target.value)}
                          value={profileData.freelancerTitle}
                        />
                      ) : (
                        <div>{profileData.freelancerTitle}</div>
                      )}
                    </div>
                  </div>
                  <div className='flex w-full flex-col gap-2 rounded-xl bg-[#10191d] p-5 pb-12'>
                    <div className='flex flex-row justify-between'>
                      <div className='text-xl text-[#96B0BD]'>About</div>
                      {isAuth && (
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
                      )}
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
                      {isAuth && viewMode === 'edit' && (
                        <div className='ml-auto flex items-center gap-3 md:gap-4'>
                          <p className='cursor-pointer text-sm text-white underline'>Active</p>
                          <p className='cursor-pointer text-sm text-slate-400 hover:text-white'>
                            Drafts
                          </p>
                          <img className='cursor-pointer' src='/assets/images/icons/edit-pen.svg' />
                        </div>
                      )}
                    </div>
                    <div className='hidden grid-cols-1 gap-4 md:grid lg:grid-cols-2 xl:grid-cols-3'>
                      {profileData.portfolio.length > 0 &&
                        profileData.portfolio
                          .slice(0, min(portfolioShowNumber, profileData.portfolio.length))
                          .map((index, key) => (
                            <Portfolio
                              email={profileData.email}
                              imagePath={
                                index.gallery?.images[0]
                                  ? index.gallery?.images[0]
                                  : '/assets/images/portfolio_works/portfolio.jpeg'
                              }
                              key={key}
                              portfolioId={index._id}
                              profileId={profileData._id}
                              setProfileData={setProfileData}
                              setUploadedImagePath={setUploadedImagePath}
                              title={index.portfolioTitle}
                              viewMode={viewMode}
                            />
                          ))}
                      <Portfolio
                        email={profileData.email}
                        imagePath=''
                        key={`extra-${uploadedImagePath.length}`}
                        setProfileData={setProfileData}
                        setUploadedImagePath={setUploadedImagePath}
                        viewMode={viewMode}
                      />
                    </div>
                    <div className='md:hidden'>
                      <div className='md:hidden'>
                        <Swiper slidesPerView={1.2} spaceBetween={20}>
                          {profileData.portfolio.length > 0 &&
                            profileData.portfolio
                              .slice(0, min(portfolioShowNumber, profileData.portfolio.length))
                              .map((index, key) => (
                                <SwiperSlide key={key}>
                                  {' '}
                                  <Portfolio
                                    email={profileData.email}
                                    imagePath={
                                      index.gallery?.images[0]
                                        ? index.gallery?.images[0]
                                        : '/assets/images/portfolio_works/portfolio.jpeg'
                                    }
                                    portfolioId={index._id}
                                    profileId={profileData._id}
                                    setProfileData={setProfileData}
                                    setUploadedImagePath={setUploadedImagePath}
                                    title={index.portfolioTitle}
                                    viewMode={viewMode}
                                  />{' '}
                                </SwiperSlide>
                              ))}
                          <SwiperSlide>
                            {' '}
                            <Portfolio
                              email={profileData.email}
                              imagePath=''
                              key={`extra-${uploadedImagePath.length}`}
                              setProfileData={setProfileData}
                              setUploadedImagePath={setUploadedImagePath}
                              viewMode={viewMode}
                            />{' '}
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>
                    {profileData.portfolio.length > 3 && (
                      <span
                        className='mx-auto hidden cursor-pointer items-center gap-2 shadow-inner md:flex'
                        onClick={() => {
                          if (portfolioShowNumber < profileData.portfolio.length)
                            setPortfolioShowNumber(portfolioShowNumber + 3);
                          else setPortfolioShowNumber(3);
                        }}
                      >
                        {portfolioShowNumber >= profileData.portfolio.length
                          ? 'Show Less'
                          : 'Show More'}
                        {portfolioShowNumber >= profileData.portfolio.length ? (
                          <GoChevronUp />
                        ) : (
                          <GoChevronDown />
                        )}
                      </span>
                    )}
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
                      {isAuth && (
                        <div className='ml-auto flex items-center gap-3 md:gap-4'>
                          <p className='cursor-pointer text-sm text-white underline'>Active</p>
                          <p className='cursor-pointer text-sm text-slate-400 hover:text-white'>
                            Drafts
                          </p>
                          <img className='cursor-pointer' src='/assets/images/icons/edit-pen.svg' />
                        </div>
                      )}
                    </div>
                    <div className='hidden grid-cols-1 gap-4 md:grid lg:grid-cols-2 xl:grid-cols-3'>
                      {profileData.myGigs?.length > 0 &&
                        profileData.myGigs
                          .slice(0, min(gigShowNumber, profileData.myGigs.length))
                          .map((myGig, index) => (
                            <MyGigs
                              email={profileData.email}
                              gigId={myGig._id}
                              imagePath={
                                myGig.gallery?.images[0]
                                  ? myGig.gallery?.images[0]
                                  : '/assets/images/portfolio_works/portfolio.jpeg'
                              }
                              key={index}
                              setProfileData={setProfileData}
                              setUploadedGigPath={setUploadedGigPath}
                              title={myGig.gigTitle}
                              viewMode={viewMode}
                            />
                          ))}
                      <MyGigs
                        email={profileData.email}
                        imagePath=''
                        key={`extra-${uploadedGigPath.length}`}
                        setProfileData={setProfileData}
                        setUploadedGigPath={setUploadedGigPath}
                        title={''}
                        viewMode={viewMode}
                      />
                    </div>
                    <div className='md:hidden'>
                      <Swiper slidesPerView={1.2} spaceBetween={20}>
                        {profileData.myGigs?.length > 0 &&
                          profileData.myGigs
                            .slice(0, min(gigShowNumber, profileData.myGigs.length))
                            .map((myGig, key) => (
                              <SwiperSlide key={key}>
                                {' '}
                                <MyGigs
                                  email={profileData.email}
                                  gigId={myGig._id}
                                  imagePath={
                                    myGig.gallery?.images[0]
                                      ? myGig.gallery?.images[0]
                                      : '/assets/images/portfolio_works/portfolio.jpeg'
                                  }
                                  setProfileData={setProfileData}
                                  setUploadedGigPath={setUploadedGigPath}
                                  title={myGig.gigTitle}
                                  viewMode={'preview'}
                                />{' '}
                              </SwiperSlide>
                            ))}
                        <SwiperSlide>
                          {''}
                          <MyGigs
                            email={profileData.email}
                            imagePath=''
                            key={`extra-${uploadedGigPath.length}`}
                            setProfileData={setProfileData}
                            setUploadedGigPath={setUploadedGigPath}
                            title={''}
                            viewMode={viewMode}
                          />
                          {''}
                        </SwiperSlide>
                      </Swiper>
                    </div>
                    {profileData.myGigs.length > 3 && (
                      <span
                        className='mx-auto hidden cursor-pointer items-center gap-2 shadow-inner md:flex'
                        onClick={() => {
                          if (gigShowNumber < profileData.myGigs.length)
                            setGigShowNumber(gigShowNumber + 3);
                          else setGigShowNumber(3);
                        }}
                      >
                        {gigShowNumber >= profileData.myGigs.length ? 'Show Less' : 'Show More'}
                        {gigShowNumber >= profileData.myGigs.length ? (
                          <GoChevronUp />
                        ) : (
                          <GoChevronDown />
                        )}
                      </span>
                    )}
                  </div>
                  <div className='flex w-full flex-col gap-2 rounded-xl bg-[#10191d] p-5 pb-12'>
                    <p className='text-2xl text-[#96B0BD]'>Reviews</p>
                    <div className='mt-4 flex flex-col gap-6'>
                      {reviews.length > 0 ? (
                        <>
                          {reviews.map((review) => (
                            <div className='flex w-full gap-6' key={review.id}>
                              <div className='flex w-full flex-col gap-2 border-b border-[#28373e] pb-6'>
                                <div className='flex flex-wrap items-center gap-4 md:flex-nowrap'>
                                  <Image
                                    alt='user'
                                    className='aspect-square h-10 w-10 rounded-full object-cover'
                                    src={review.imgSrc}
                                  />
                                  <div className='flex w-auto items-center gap-2'>
                                    <p className='text-xl'>{review.name}</p>
                                    <Image
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
                          <span className='mx-auto hidden cursor-pointer items-center gap-2 shadow-inner md:flex'>
                            Show more <GoChevronDown />
                          </span>
                        </>
                      ) : (
                        <div className='flex h-full flex-col items-center justify-center gap-3'>
                          <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
                          <p className='text-[18px] text-slate-600'>
                            Reviews will appear here soon
                          </p>
                        </div>
                      )}
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
