'use client'; 
import React, { createContext, useContext, useState } from 'react';
const StepContext = createContext();
export const useStep = () => useContext(StepContext);

export const StepProvider = ({ children }) => {
    const [stepNumber, setStepNumber] = useState(1);

    return (
        <StepContext.Provider value={{ stepNumber, setStepNumber }}>
            {children}
        </StepContext.Provider>
    );
};

export const StepNumber = () => {
    const { stepNumber } = useStep();
    return stepNumber;
};

export const NextStep = () => {
    const { setStepNumber } = useStep();
    return (
        <button onClick={() => setStepNumber(prev => prev + 1)}>
            Next
        </button>
    );
};
export const PrevStep = () => {
    const { setStepNumber } = useStep();
    return (
        <button onClick={() => setStepNumber(prev => prev - 1)}>
            Prev
        </button>
    );
};
