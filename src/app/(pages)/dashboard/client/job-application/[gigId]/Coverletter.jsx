'use client';

import React, { useState } from 'react';

const Coverletter = ({ handleChange }) => {
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
    handleChange(e.target.value);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='hidden whitespace-nowrap text-xl font-semibold text-white md:block'>
        Cover letter
      </h3>
      <textarea
        className='w-full rounded-xl border border-medGray bg-deepGreen p-4'
        cols='30'
        id=''
        name=''
        onChange={onChange}
        placeholder='Type here...'
        rows='7'
        value={text}
      />
    </div>
  );
};
export default Coverletter;
