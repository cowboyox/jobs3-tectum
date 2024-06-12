import React from 'react'
import { StepProvider, StepNumber, NextStep, PrevStep } from '@/components/elements/formSteps/StepContext';

const FormNavigation = () => {
  return (
    <div className='flex justify-end items-center gap-7'>
      <PrevStep className="cursor-pointer text-base text-slate-500 hover:text-white transition" />
      <NextStep 
        className="cursor-pointer bg-[#DC4F13] py-2 px-12 rounded-xl transition hover:bg-white hover:text-black" 
        max={6} 
      />
    </div>
  )
}

export default FormNavigation