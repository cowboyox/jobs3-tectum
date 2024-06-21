'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import api from '@/utils/api';
import { useToast } from "@/components/ui/use-toast";

const InfoPanel = (props) => {
  const { toast } = useToast();

  const saveToDB = (data) => {
    console.log("-----> ", data)
    api.put(`/api/v1/profile/update-profileinfo/${props.email}`, data).then(data => {
      return toast({
        variant: "default",
        title: <h1 className='text-center'>Success</h1>,
        description: <h3>Successfully updated Client Profile</h3>,
        className: "bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center"
      });
    }).catch(err => {
      toast({
        variant: "destructive",
        title: <h1 className='text-center'>Error</h1>,
        description: <h3>Internal Server Error</h3>,
        className: "bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center"
      });
    })
  }
  const saveProfile = (title) => {
    if (title === "Personal Information") {
      const tmp = {
        fullName: props.profileData.firstName + " " + props.profileData.lastName,
        firstName: props.profileData.firstName,
        lastName: props.profileData.lastName,
        email: props.profileData.email,
        phoneNumber: props.profileData.phoneNumber,
      }

      saveToDB(tmp);
    } else if (title === "Company Details") {
      const tmp = {
        companyDetails: props.profileData.companyDetails
      }
      saveToDB(tmp);
    }
  }
  const [editMode, setEditMode] = useState(false);
  return (
    <div className='bg-[#10191D] md:p-8 px-3 py-4 md:rounded-xl flex flex-col gap-4' key={props.index}>
      {/* Content */}
      <div className="flex w-full justify-between">
        <p className="text-[#96B0BD] text-[18px] font-medium">{props.title}</p>
        <img
          src="/assets/images/icons/edit-pen.svg"
          className='w-5 cursor-pointer'
          onClick={() => { setEditMode(true) }}
        />
      </div>
      <form> {/* After the form is submitted the user data should be saved in the backend */}
        <div className="grid grid-cols-2 gap-3">
          {props.information_data.map((singleInfo, cntNum) => {
            return <div className="flex flex-col gap-1" key={cntNum}>
              <p className="text-base text-[#96B0BD]">{singleInfo.label}</p>
              {editMode ? (
                <input
                  className="text-white text-sm md:text-[18px] md:font-medium outline-none font-medium bg-transparent pb-2 border-b focus:border-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={singleInfo.value}
                  type={singleInfo.idName === "phoneNumber" ? "number" : "text"}
                  onChange={e => {
                    props.index !== -1 ?
                      props.setProfileData((prev) => ({
                        ...prev,
                        companyDetails: prev.companyDetails.map((item, index) => (
                          index === props.index ?
                            { ...item, [singleInfo.idName]: e.target.value } :
                            item
                        ))
                      })) :
                      props.setProfileData((prev) => ({
                        ...prev,
                        [singleInfo.idName]: e.target.value
                      }));
                  }}
                />
              ) : (
                <p className="text-white text-sm md:text-[18px] md:font-medium font-medium">{singleInfo.value}</p>
              )}
            </div>
          })}
        </div>
        {editMode && (
          <Button className='w-1/4 rounded-xl mt-9' onClick={() => { setEditMode(false); saveProfile(props.title) }}>Save</Button>
        )}
      </form>
    </div>
  )
}


export default InfoPanel