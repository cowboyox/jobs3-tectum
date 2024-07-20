import React from 'react';

const EmptyCard = ({ text }) => {
  return (
    <div className='text-center w-full h-32 rounded-xl flex items-center justify-center font-bold text-xl mobile:text-lg bg-[#1a272c]'>
        {text}
    </div>
  )
}

export default EmptyCard
