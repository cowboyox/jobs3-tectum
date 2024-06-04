import React from 'react';
import '/src/app/css/remove_horizontal_padding.css';
import { IoCameraOutline } from "react-icons/io5";

import InfoPanel from './infoPanel';

const ClientDashboard = () => {
  return (
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
              <h2 className='text-2xl md:text-3xl'>Devon Miles</h2> 
              <img src='/assets/images/icons/checkmark.svg' className='w-5 h-5' /> 
            </div>
            <div className="flex md:flex-row flex-col gap-2 md:gap-4">
              <div className="flex gap-2 items-center">
                <img src="/assets/images/icons/location.svg" className="w-6 h-6 object-contain object-center" />
                <p className='text-white text-lg'>Yogyakarta, Indonesia</p>
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
                <p className='text-[#96B0BD] text-base md:text-lg md:text-center'>Total Spent</p>
                <p className="text-white text-3xl md:text-center">$9K+</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#96B0BD] text-base md:text-lg md:text-center'>Total jobs</p>
                <p className="text-white text-3xl md:text-center">44</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#96B0BD] text-base md:text-lg md:text-center'>Total hours</p>
                <p className="text-white text-3xl md:text-center">240</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#96B0BD] text-base md:text-lg md:text-center'>Hire rate</p>
                <p className="text-white text-3xl md:text-center">81%</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#96B0BD] text-base md:text-lg md:text-center'>Hires</p>
                <p className="text-white text-3xl md:text-center">44</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#96B0BD] text-base md:text-lg md:text-center'>H / rate paid</p>
                <p className="text-white text-3xl md:text-center">~$22</p>
              </div>
            </div> 
          </div>
          <div className='w-full md:w-2/3 md:pl-4 flex flex-col gap-4'> 
            {/* All this should be dynamic data for sure */}
            <InfoPanel
                title="Personal Information"
                editAction='editPersonalInfo'
                information_data={[ 
                  { id: 0, label: 'First Name', value: 'Devon '},
                  { id: 1, label: 'Email Address', value: 'Devonm@gmail.com '},
                  { id: 2, label: 'Last Name', value: 'Miles '},
                  { id: 3, label: 'Phone', value: '+44 54 487 56 5788 '},
                ]}
            />
            <InfoPanel
                title="Company Details"
                editAction='companyDetails'
                information_data={[ 
                  { id: 0, label: 'Country', value: 'United Kingdom'},
                  { id: 1, label: 'Postal Code', value: '2324 5667'},
                  { id: 2, label: 'City/State ', value: 'London'},
                  { id: 3, label: 'Time Zone', value: '+3 (GMT)'},
                  { id: 4, label: 'VAT ID', value: '5235799'}, 
                ]}
            />
            <InfoPanel
                title="Company Details"
                editAction='companyDetails'
                information_data={[ 
                  { id: 0, label: 'Country', value: 'United Kingdom'},
                  { id: 1, label: 'Postal Code', value: '2324 5667'},
                  { id: 2, label: 'City/State ', value: 'London'},
                  { id: 3, label: 'Time Zone', value: '+3 (GMT)'},
                  { id: 4, label: 'VAT ID', value: '5235799'}, 
                ]}
            />
          </div>
        </div> 
      </div>
    </div>
  )
}

export default ClientDashboard
