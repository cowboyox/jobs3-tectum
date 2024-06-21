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
        value={text}
        onChange={onChange}
        name=''
        id=''
        cols='30'
        rows='7'
        className='w-full rounded-xl border border-medGray bg-deepGreen p-4'
        placeholder='Type here...'
      ></textarea>
    </div>
  );
};
export default Coverletter;
