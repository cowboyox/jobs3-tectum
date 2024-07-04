import React from 'react';

import { NextStep, PrevStep } from '@/components/elements/formSteps/StepContext';

const FormNavigation = () => {
  return (
    <div className='w-full flex items-center justify-end gap-7'>
      <div className="flex w-full gap-3 p-2 rounded-2xl bg-[#1B272C]">
        <PrevStep className='w-full py-5 text-center text-white transition cursor-pointer rounded-2xl mobile:py-3 hover:bg-white hover:text-black' />
        <NextStep
          className='w-full rounded-2xl bg-[#DC4F13] text-white py-5 mobile:py-3 text-center cursor-pointer'
          max={6}
        />
      </div>
    </div>
  );
};

export default FormNavigation;
