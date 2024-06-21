'use client';
import React from 'react';

import { useStep, useStepNumber } from '@/components/elements/formSteps/StepContext';

const StepNavItem = (props) => {
  const { setStepNumber } = useStep();
  const stepNumber = useStepNumber();
  return (
    <div
      className={` ${stepNumber == props.num ? 'border-[#DC4F13]' : 'border-[#516270]'} ${
        stepNumber < props.num && 'pointer-events-none opacity-30'
      } flex w-full cursor-pointer items-center justify-center gap-3 border-b-4 px-3 py-7`}
      onClick={() => {
        setStepNumber(props.num);
      }}
    >
      <span
        className={` ${
          stepNumber == props.num ? 'bg-[#DC4F13]' : 'bg-[#516170]'
        } aspect-square h-6 w-6 rounded-full text-center text-base`}
      >
        {props.num}
      </span>
      <span className='text-base text-[#F5F5F5]'>{props.name}</span>
    </div>
  );
};

export default StepNavItem;
