import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const portfolio = [
  {
    id: 0,
    name: 'Title of the item',
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
    image: '/assets/images/portfolio_works/portfolio.jpeg',
    badges: ['Tag', 'Category'],
  },
  {
    id: 1,
    name: 'Title of the item',
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
    image: '/assets/images/portfolio_works/portfolio.jpeg',
    badges: ['Tag', 'Category'],
  },
  {
    id: 2,
    name: 'Title of the item',
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
    image: '/assets/images/portfolio_works/portfolio.jpeg',
    badges: ['Tag', 'Category'],
  },
  {
    id: 3,
    name: 'Title of the item',
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
    image: '/assets/images/portfolio_works/portfolio.jpeg',
    badges: ['Tag', 'Category'],
  },
  {
    id: 4,
    name: 'Title of the item',
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
    image: '/assets/images/portfolio_works/portfolio.jpeg',
    badges: ['Tag', 'Category'],
  },
  {
    id: 5,
    name: 'Title of the item',
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
    image: '/assets/images/portfolio_works/portfolio.jpeg',
    badges: ['Tag', 'Category'],
  },
];

const FreelancerPortfolio = () => {
  return (
    <div className='freelancer-portfolio flex flex-col py-6 md:px-4'>
      <div className='flex gap-3 rounded-2xl bg-[#10191d] p-7 mobile:flex-wrap mobile:gap-x-0 mobile:gap-y-5 mobile:p-4'>
        <div className='flex w-full flex-col gap-3 mobile:w-1/3'>
          <p className='text-xl text-[#96B0BD] mobile:text-center mobile:text-sm'>Total earnings</p>
          <p className='text-4xl font-bold text-white mobile:text-center mobile:text-3xl'>$9K+</p>
        </div>
        <div className='flex w-full flex-col gap-3 mobile:w-1/3'>
          <p className='text-xl text-[#96B0BD] mobile:text-center mobile:text-sm'>Total jobs</p>
          <p className='text-4xl font-bold text-white mobile:text-center mobile:text-3xl'>44</p>
        </div>
        <div className='flex w-full flex-col gap-3 mobile:w-1/3'>
          <p className='text-xl text-[#96B0BD] mobile:text-center mobile:text-sm'>Total hours</p>
          <p className='text-4xl font-bold text-white mobile:text-center mobile:text-3xl'>240</p>
        </div>
        <div className='flex w-fit items-center justify-center gap-3 mobile:w-full'>
          <Link
            href='./portfolio/create'
            className='cursor-pointer rounded-xl bg-[#DC4F13] px-12 py-3 text-lg transition hover:bg-white hover:text-black mobile:w-full mobile:text-center'
          >
            Create
          </Link>
        </div>
      </div>
      <div className='my-5 grid w-full grid-cols-3 gap-5 mobile:grid-cols-1'>
        {portfolio.map((portfolio_item) => (
          <div key={portfolio_item.id} className='rounded-xl bg-[#10191d] p-4'>
            <div className='relative flex h-64 w-full'>
              <img
                src='/assets/images/portfolio_works/portfolio.jpeg'
                alt={portfolio_item.name}
                className='absolute left-0 top-0 h-full w-full rounded-xl object-cover'
              />
              <div className='mt-auto flex flex-wrap gap-3 p-3'>
                {portfolio_item.badges.map((portfolio_badge, pb_id) => (
                  <div
                    key={pb_id}
                    className='relative cursor-pointer rounded-xl border border-white bg-[#10191d] px-3 py-1 text-sm'
                  >
                    {portfolio_badge}
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-3 py-6'>
              <div className='text-3xl text-[#F5F5F5]'>{portfolio_item.name}</div>
              <div className='text-base text-[#96B0BD]'>{portfolio_item.description}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='mx-auto mt-4 max-w-full cursor-pointer rounded-xl border border-[#aaaaaaaa] px-10 py-5 text-center transition hover:bg-white hover:text-black md:w-1/3 md:text-xl mobile:w-full mobile:px-5'>
        Load more +
      </div>
    </div>
  );
};

export default FreelancerPortfolio;
