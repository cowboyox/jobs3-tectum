import Image from 'next/image';
import React from 'react';

const Companies = () => {
  return (
    <div className='sl_companies container'>
      <h2>
        Team up with the most forward <span>thinking companies</span>
      </h2>
      <div className='companies_logos'>
        <Image alt='' height={100} src={'/assets/images/logos_teamup/shopify.svg'} width={190} />
        <Image alt='' height={100} src={'/assets/images/logos_teamup/opentable.svg'} width={250} />
        <Image alt='' height={100} src={'/assets/images/logos_teamup/amazon.svg'} width={250} />
        <Image alt='' height={100} src={'/assets/images/logos_teamup/slack.svg'} width={190} />
      </div>
    </div>
  );
};

export default Companies;
