'use client';
import React from 'react';
import { useStep } from '@/components/elements/formSteps/StepContext';
import { useStepNumber } from '@/components/elements/formSteps/StepContext';

const StepNavItem = (props)=> {  
  const { setStepNumber } = useStep();
  const stepNumber = useStepNumber();
  return (
    <div className={`
      ${stepNumber == props.num
        ? 'border-[#DC4F13]' 
        : 'border-[#516270]'
      }
      ${ stepNumber < props.num 
        && 'opacity-30 pointer-events-none'  
      }
      flex items-center justify-center py-7 px-3 gap-3 w-full cursor-pointer border-b-4 
    `}
    onClick={()=> { setStepNumber(props.num) }}>
      <span className={`
        ${stepNumber == props.num
          ? 'bg-[#DC4F13]' 
          : 'bg-[#516170]'
        }
        aspect-square rounded-full w-6 h-6 text-center text-base`}>
        {props.num}
      </span>
      <span className="text-[#F5F5F5] text-base">
        {props.name}
      </span>
    </div>
  )
}

export default StepNavItem;