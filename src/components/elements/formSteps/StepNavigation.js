import React from 'react';

import { NextStep, PrevStep } from '@/components/elements/formSteps/StepContext';

const FormNavigation = () => {
  return (
    <div className='flex items-center justify-end gap-7'>
      <PrevStep className='cursor-pointer text-base text-slate-500 transition hover:text-white' />
      <NextStep
        className='cursor-pointer rounded-xl bg-[#DC4F13] px-12 py-2 transition hover:bg-white hover:text-black'
        max={6}
      />
    </div>
  );
};

export default FormNavigation;
