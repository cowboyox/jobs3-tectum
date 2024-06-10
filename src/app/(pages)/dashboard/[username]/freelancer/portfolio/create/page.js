import React from 'react';
import { StepProvider, StepNumber, NextStep, PrevStep } from './StepContext';

/*
 * Selmani: i abandoned this page in it's beggining of the progress lol
 * That's cause i have now to finish the gig page first, but if somehow  
   you need to create it, feel free to use this code
 
 * NextStep: is the button for when the user navigating through the gig steps
 * PrevStep: same thing as next, but for previous
 * StepNumbe: i was planning to use it to toggle the active class for 
   the top navof the form

 * Don't use "use client", if you don't know how, please just text me and 
   i will give more details
*/

const CreatePortfolio = () => {
    return (
        <StepProvider>
            <div className='flex'>
                <PrevStep />
                <StepNumber />
                <NextStep />
            </div>
        </StepProvider>
    );
};

export default CreatePortfolio;