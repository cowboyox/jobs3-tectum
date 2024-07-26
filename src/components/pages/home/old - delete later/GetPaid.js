import Image from 'next/image';
import React from 'react';

const GetPaid = () => {
  return (
    <div className='rich_text container'>
      <Image alt='' height={500} src={'/assets/images/logos/parts.svg'} width={500} />
      <div className='text_side'>
        <h2>
          Get Paid In <span>Crypto</span>
        </h2>
        <p>Enjoy the benefits of borderless, secure, and instant payments</p>
        <a className='cta_button' href='#'>
          get started
        </a>
      </div>
    </div>
  );
};

export default GetPaid;
