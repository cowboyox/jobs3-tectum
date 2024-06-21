'use client';

import React, { useState } from 'react';

const Coverletter = ({ handleChange }) => {
  const [text, setText] = useState('');

  const onChange = e => {
    setText(e.target.value);
    handleChange(e.target.value);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-white hidden md:block text-xl font-semibold whitespace-nowrap'>
        Cover letter
      </h3>
      <textarea
        value={text}
        onChange={onChange}
        name=''
        id=''
        cols='30'
        rows='7'
        className='border border-medGray bg-deepGreen w-full rounded-xl p-4'
        placeholder='Type here...'
      ></textarea>
    </div>
  );
};
export default Coverletter;
