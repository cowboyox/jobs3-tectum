'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const InfoItem = (props)=> {
  const [inputValue, setInputValue] = useState(props.value);
  return (
    <div className="flex flex-col gap-1">
      <p className="text-base text-[#96B0BD]">{props.label}</p> 
      {props.edit_mode ? (
        <input 
          className="text-white text-sm md:text-[18px] outline-none font-medium bg-transparent pb-2 border-b focus:border-white" 
          value={inputValue} 
          onChange={(evnt)=> (setInputValue(evnt.target.value))} 
        />
      ) : (
        <p className="text-white text-sm md:text-[18px] font-medium">{props.value}</p> 
      )} 
    </div>
  )
}
const InfoPanel = (props)=> {
  const [editMode, setEditMode] = useState(false); 
  return (
    <div className='bg-[#10191D] md:p-8 px-3 py-4 md:rounded-xl flex flex-col gap-4'>
      {/* Content */}
      <div className="flex w-full justify-between">
        <p className="text-[#96B0BD] text-xl font-medium">{props.title}</p> 
        <img 
          src="/assets/images/icons/edit-pen.svg" 
          className='w-5 cursor-pointer' 
          onClick={()=> { setEditMode(true) }} 
        />
      </div>
      <form> {/* After the form is submitted the user data should be saved in the backend */}
        <div className="grid grid-cols-2 gap-3">
          {props.information_data.map((singleInfo)=> ( 
            <InfoItem 
              key={singleInfo.id} 
              label={singleInfo.label} 
              value={singleInfo.value} 
              edit_mode={editMode} 
            /> 
          ))}
        </div>
        {editMode && (
          <Button className='w-1/4 rounded-xl mt-9'>Save</Button>
        )}
      </form>
    </div> 
  )
}


export default InfoPanel
