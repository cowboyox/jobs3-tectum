'use client';
import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import api from '@/utils/api';

const InfoPanel = (props) => {
  const { toast } = useToast();

  const saveToDB = (data) => {
    api
      .put(`/api/v1/profile/update-profileinfo/${props.email}`, data)
      .then(() => {
        return toast({
          className:
            'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Successfully updated Client Profile</h3>,
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
  const saveProfile = (title) => {
    if (title === 'Personal Information') {
      const tmp = {
        email: props.profileData.email,
        firstName: props.profileData.firstName,
        fullName: props.profileData.firstName + ' ' + props.profileData.lastName,
        lastName: props.profileData.lastName,
        phoneNumber: props.profileData.phoneNumber,
      };

      saveToDB(tmp);
    } else if (title === 'Company Details') {
      const tmp = {
        companyDetails: props.profileData.companyDetails,
      };
      saveToDB(tmp);
    }
  };
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if(props.viewMode == 'preview'){
      setEditMode(false);
    }
  }, [props.viewMode])
  return (
    <div
      className='flex flex-col gap-4 bg-[#10191D] px-3 py-4 md:rounded-xl md:p-8'
      key={props.index}
    >
      {/* Content */}

      <div className='flex w-full justify-between'>
        <p className='text-[18px] font-medium text-[#96B0BD]'>{props.title}</p>
        {props.viewMode === 'edit' && (
          <img
            className='w-5 cursor-pointer'
            onClick={() => {
              setEditMode(true);
            }}
            src='/assets/images/icons/edit-pen.svg'
          />
        )}
      </div>

      <form>
        {' '}
        {/* After the form is submitted the user data should be saved in the backend */}
        <div className='grid grid-cols-2 gap-3'>
          {props.information_data.map((singleInfo, cntNum) => {
            return (
              <div className='flex flex-col gap-1' key={cntNum}>
                <p className='text-base text-[#96B0BD]'>{singleInfo.label}</p>
                {editMode ? (
                  <input
                    className='border-b bg-transparent pb-2 text-sm font-medium text-white outline-none [appearance:textfield] focus:border-white md:text-[18px] md:font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                    onChange={(e) => {
                      props.index !== -1
                        ? props.setProfileData((prev) => ({
                            ...prev,
                            companyDetails: prev.companyDetails.map((item, index) =>
                              index === props.index
                                ? { ...item, [singleInfo.idName]: e.target.value }
                                : item
                            ),
                          }))
                        : props.setProfileData((prev) => ({
                            ...prev,
                            [singleInfo.idName]: e.target.value,
                          }));
                    }}
                    type={singleInfo.idName === 'phoneNumber' ? 'number' : 'text'}
                    value={singleInfo.value}
                  />
                ) : (
                  <p className='text-sm font-medium text-white md:text-[18px] md:font-medium'>
                    {singleInfo.value}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        {editMode && (
          <Button
            className='mt-9 w-1/4 rounded-xl'
            onClick={() => {
              setEditMode(false);
              saveProfile(props.title);
            }}
          >
            Save
          </Button>
        )}
      </form>
    </div>
  );
};

export default InfoPanel;
