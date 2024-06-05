'use client'
import React, { useState, useEffect } from 'react';
import '/src/app/css/remove_horizontal_padding.css';
import { IoCameraOutline } from "react-icons/io5";

import api from '@/utils/api';

import InfoPanel from './infoPanel';

const ClientDashboard = () => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    role: "",
    verified: false
  });
  const [profileData, setProfileData] = useState({
    avgResponseTime: "",
    email: "",
    created: "",
    freelancerBio: "",
    fullName: "",
    hourlyRate: "",
    languages: [],
    location: "",
    monthlyRate: "",
    myGigs: [],
    portfolio: [],
    profileType: 0,
    skills: [],
    timeZone: "",
    userId: "",
    zkpId: "",
    phoneNumber: "",
    companyDetails: [{
      country: "",
      postalCode: "",
      cityState: "",
      timeZone: "",
      vatID: ""
    }],
    firstName: "",
    lastName: ""
  });
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    let tmp = localStorage.getItem('jobs_2024_token');
    let email = JSON.parse(tmp).data.user.email;
    setUser(JSON.parse(tmp).data.user);
    api.get(`/api/v1/profile/get-profile/${email}`).then((data) => {
      console.log('------getprofile: ', data.data.profile, JSON.parse(tmp).data.user)
      setProfileData(data.data.profile);
      setLoading(false);
    })
  }, []);

  return (
    !isLoading ?
    <div className='p-0'>
      <div className='group relative cursor-pointer'>
        <img src="/assets/images/freelancer-image.jpeg" className='rounded-b-2xl h-64 w-full object-cover transition group-hover:opacity-75' />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full flex items-center justify-center bg-[#1a272c] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <IoCameraOutline className='w-6 h-6' />
        </div>
      </div>
      <div className=" max-w-7xl mx-auto flex flex-col gap-3 px-0 md:px-8 -translate-y-8">
        <div className="bg-[#10191D] md:p-8 px-3 py-4 md:rounded-xl rounded-t-xl flex md:gap-7 gap-4 md:items-center items-start">
          <div className="w-20 md:w-24 md:h-24 relative">
            <img src='/assets/images/users/user-5.png' className='rounded-full w-full h-full aspect-square' />
            {/* Change background color depending on user online status */}
            <div className="rounded-full h-4 w-4 absolute right-1 bottom-1 bg-green-500"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className='flex items-center gap-4'>
              <h2 className='text-2xl md:text-3xl'>{profileData.fullName}</h2>
              <img src='/assets/images/icons/checkmark.svg' className='w-5 h-5' />
            </div>
            <div className="flex md:flex-row flex-col gap-2 md:gap-4">
              <div className="flex gap-2 items-center">
                <img src="/assets/images/icons/location.svg" className="w-6 h-6 object-contain object-center" />
                <p className='text-white text-lg'>{profileData.location}</p>
              </div>
              <div className="flex gap-2 items-center">
                <img src="/assets/images/icons/clocks.svg" className="w-6 h-6 object-contain object-center" />
                <p className='text-white text-lg'>10:19 am, Local Time</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex md:flex-row flex-col md:gap-0 gap-4 '>
          <div className='w-full md:w-1/3'>
            <div className='bg-[#10191D] md:p-8 px-5 py-4 md:rounded-xl grid grid-cols-3 gap-4'>
              {/* Sidebar */}
              <div className='flex flex-col gap-1'>
                <p className='text-[#96B0BD] text-base md:text-center'>Total Spent</p>
                <p className="text-white text-2xl md:text-center">$9K+</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#96B0BD] text-base md:text-center'>Total jobs</p>
                <p className="text-white text-2xl md:text-center">44</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#96B0BD] text-base md:text-center'>Total hours</p>
                <p className="text-white text-2xl md:text-center">240</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#96B0BD] text-base md:text-center'>Hire rate</p>
                <p className="text-white text-2xl md:text-center">81%</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#96B0BD] text-base md:text-center'>Hires</p>
                <p className="text-white text-2xl md:text-center">44</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#96B0BD] text-base md:text-center'>H / rate paid</p>
                <p className="text-white text-2xl md:text-center">~$22</p>
              </div>
            </div>
          </div>
          <div className='w-full md:w-2/3 md:pl-4 flex flex-col gap-4'>
            {/* All this should be dynamic data for sure */}
            <InfoPanel
              title="Personal Information"
              editAction='editPersonalInfo'
              information_data={[
                { id: 0, label: 'First Name', value: `${profileData.firstName}`, idName: 'firstName' },
                { id: 1, label: 'Email Address', value: `${profileData.email}`, idName: 'email' },
                { id: 2, label: 'Last Name', value: `${profileData.lastName}`, idName: 'lastName' },
                { id: 3, label: 'Phone', value: `${profileData.phoneNumber}`, idName: 'phoneNumber' },
              ]}
              setProfileData={setProfileData}
              profileData={profileData}
              index={-1}
              email={user.email}
            />
            {
              profileData.companyDetails.map((company, index) => {
                return <InfoPanel
                  title="Company Details"
                  editAction='companyDetails'
                  information_data={[
                    { id: 0, label: 'Country', value: `${company.country}`, idName: 'country' },
                    { id: 1, label: 'Postal Code', value: `${company.postalCode}`, idName: 'postalCode' },
                    { id: 2, label: 'City/State ', value: `${company.cityState}`, idName: 'cityState' },
                    { id: 3, label: 'Time Zone', value: `${company.timeZone}`, idName: 'timeZone' },
                    { id: 4, label: 'VAT ID', value: `${company.vatID}`, idName: 'vatID' },
                  ]}
                  setProfileData={setProfileData}
                  index={index}
                  profileData={profileData}
                  email={user.email}
                />
              })
            }
          </div>
        </div>
      </div>
    </div> :
    <></>
  )
}

export default ClientDashboard
