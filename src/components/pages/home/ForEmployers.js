import Image from 'next/image';
import React from 'react';

const ForEmployers = () => {
  return (
    <div className='rich_text_2 container'>
      <div className='text_side'>
        <h2>
          Perfect for <br /> <span>Employers</span>
        </h2>
        <p>The hiring solution made to grow your business</p>
      </div>
      <Image alt='' height={500} src={'/assets/images/logos_teamup/marketplace.svg'} width={500} />
    </div>
  );
};

export default ForEmployers;
