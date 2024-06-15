import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ByCategories = () => {
  return (
    <div className='categories_explore container'>
      <h2>
        explore by <span>categories</span>
      </h2>
      <p>Nulla eget aliquet tincidunt ut turpis varius.</p>
      <div className='categories_container'>
        <div className='popular_categories'>
          <h3>Popular Categories</h3>
          <div className='category_row'>
            <span>System analyst</span> <small>6</small>
          </div>
          <div className='category_row'>
            <span>Frontend developer</span> <small>12</small>
          </div>
          <div className='category_row'>
            <span>Backend developer</span> <small>14</small>
          </div>
          <div className='category_row'>
            <span>Full Stack developer</span> <small>8</small>
          </div>
        </div>
        <div className='category_panels'>
          <div className='ct_panels_container'>
            <div className='sl_category_panel'>
              <Image alt='' height={50} src={'/assets/images/icons/gallery.svg'} width={50} />
              <span>
                Social Media & <br /> Content{' '}
              </span>
            </div>
            <div className='sl_category_panel'>
              <Image
                alt=''
                height={50}
                src={'/assets/images/icons/human_resources.svg'}
                width={50}
              />
              <span>
                Human <br /> Resources
              </span>
            </div>
            <div className='sl_category_panel'>
              <Image
                alt=''
                height={50}
                src={'/assets/images/icons/portfolio_bag_time.svg'}
                width={50}
              />
              <span>
                Partnerships & <br /> Sales{' '}
              </span>
            </div>
            <div className='sl_category_panel'>
              <Image alt='' height={50} src={'/assets/images/icons/user.svg'} width={50} />
              <span>
                Financial <br /> Accounting
              </span>
            </div>
          </div>
          <Link className='cta_button' href={'#'}>
            get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ByCategories;
