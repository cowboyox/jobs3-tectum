'use client';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import api from '@/utils/api';

const InfoPanel = (props) => {
  const { toast } = useToast();

  const saveProfile = () => {
    api
      .put(`/api/v1/profile/update-profileinfo/${props.email}`, props.profileData)
      .then((data) => {
        return toast({
          className:
            'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Successfully updated Client Profile</h3>,
          title: <h1 className='text-center'>Success</h1>,
          variant: 'default',
        });
      })
      .catch((err) => {
        toast({
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Internal Server Error</h3>,
          title: <h1 className='text-center'>Error</h1>,
          variant: 'destructive',
        });
      });
  };
  const [editMode, setEditMode] = useState(false);
  return (
    <div
      className='flex flex-col gap-4 bg-[#10191D] px-3 py-4 md:rounded-xl md:p-8'
      key={props.index}
    >
      {/* Content */}
      <div className='flex w-full justify-between'>
        <p className='text-[18px] font-medium text-[#96B0BD]'>{props.title}</p>
        <img
          className='w-5 cursor-pointer'
          onClick={() => {
            setEditMode(true);
          }}
          src='/assets/images/icons/edit-pen.svg'
        />
      </div>
      <form>
        {' '}
        {/* After the form is submitted the user data should be saved in the backend */}
        <div className='grid grid-cols-2 gap-3'>
          {props.information_data.map((singleInfo, cntNum) => (
            <div className='flex flex-col gap-1' key={cntNum}>
              <p className='text-base text-[#96B0BD]'>{singleInfo.label}</p>
              {editMode ? (
                <input
                  className='border-b bg-transparent pb-2 text-sm font-medium text-white outline-none focus:border-white md:text-[18px] md:font-medium'
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
                  value={singleInfo.value}
                />
              ) : (
                <p className='text-sm font-medium text-white md:text-[18px] md:font-medium'>
                  {singleInfo.value}
                </p>
              )}
            </div>
          ))}
        </div>
        {editMode && (
          <Button
            className='mt-9 w-1/4 rounded-xl'
            onClick={() => {
              setEditMode(false);
              saveProfile();
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
