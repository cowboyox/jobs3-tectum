'use client';
import React, { createContext, useContext, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
const StepContext = createContext();
export const useStep = () => useContext(StepContext);

export const StepProvider = ({ children }) => {
  const [stepNumber, setStepNumber] = useState(1);

  return (
    <StepContext.Provider value={{ setStepNumber, stepNumber }}>{children}</StepContext.Provider>
  );
};

export const useStepNumber = () => {
  const { stepNumber } = useStep();
  return stepNumber;
};
export const StepNumber = () => {
  const { stepNumber } = useStep();
  return stepNumber;
};

export const NextStep = ({ max, className, isAuth, isWaiting, setStepNumbers, finalButtonName, setIsResumePreview }) => {
  const { stepNumber, setStepNumber } = useStep();

  console.log('useContext',stepNumber)

  return (
    <>
      {stepNumber < max && (
        <div className={className} onClick={() => {setStepNumber((prev) => prev + 1); setStepNumbers?.((prev) => prev + 1)}}>
          {
            isAuth === false ?
            'Continue'
            :
            'Save and continue'
          }
        </div>
      )}
      {stepNumber == max && (
        <button
          className={className}
          onClick={() => setIsResumePreview?.(true)}
          type='submit'
        >
          {isWaiting && <Spinner/>}
          {
            isAuth === false ?
            'End'
            :
            finalButtonName ? finalButtonName : 'Publish'     
          }
        </button>
      )}
    </>
  );
};
export const PrevStep = ({ className, setStepNumbers }) => {
  const { stepNumber, setStepNumber } = useStep();

  return (
    <div
      className={className}
      onClick={() => {
        if (stepNumber > 1) {
          setStepNumber((prev) => prev - 1);
          setStepNumbers?.((prev) => prev - 1);
        }
      }}
    >
      Back
    </div>
  );
};