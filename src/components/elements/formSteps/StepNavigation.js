import React from 'react';

import { NextStep, PrevStep } from '@/components/elements/formSteps/StepContext';

const FormNavigation = (props) => {
  return (
    <div className='flex w-full items-center justify-end gap-7'>
      <div className='flex w-full gap-3 rounded-2xl bg-[#1B272C] p-2'>
        <PrevStep className='mobile:py-3 w-full cursor-pointer rounded-2xl py-5 text-center text-white transition hover:bg-white hover:text-black' />
        <NextStep
          className='mobile:py-3 w-full cursor-pointer rounded-2xl bg-[#DC4F13] py-5 text-center text-white'
          max={props.max ? props.max : 6}
          isAuth={props.isAuth}
        />
      </div>
    </div>
  );
};

export default FormNavigation;
