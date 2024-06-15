import Link from 'next/link';
import React from 'react';

const portfolio = [
  {
    badges: ['Tag', 'Category'],
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
    id: 0,
    image: '/assets/images/portfolio_works/portfolio.jpeg',
    name: 'Title of the item',
  },
  {
    badges: ['Tag', 'Category'],
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
    id: 1,
    image: '/assets/images/portfolio_works/portfolio.jpeg',
    name: 'Title of the item',
  },
  {
    badges: ['Tag', 'Category'],
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
    id: 2,
    image: '/assets/images/portfolio_works/portfolio.jpeg',
    name: 'Title of the item',
  },
  {
    badges: ['Tag', 'Category'],
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
    id: 3,
    image: '/assets/images/portfolio_works/portfolio.jpeg',
    name: 'Title of the item',
  },
  {
    badges: ['Tag', 'Category'],
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
    id: 4,
    image: '/assets/images/portfolio_works/portfolio.jpeg',
    name: 'Title of the item',
  },
  {
    badges: ['Tag', 'Category'],
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
    id: 5,
    image: '/assets/images/portfolio_works/portfolio.jpeg',
    name: 'Title of the item',
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
            className='cursor-pointer rounded-xl bg-[#DC4F13] px-12 py-3 text-lg transition hover:bg-white hover:text-black mobile:w-full mobile:text-center'
            href='./portfolio/create'
          >
            Create
          </Link>
        </div>
      </div>
      <div className='my-5 grid w-full grid-cols-3 gap-5 mobile:grid-cols-1'>
        {portfolio.map((portfolio_item) => (
          <div className='rounded-xl bg-[#10191d] p-4' key={portfolio_item.id}>
            <div className='relative flex h-64 w-full'>
              <img
                alt={portfolio_item.name}
                className='absolute left-0 top-0 h-full w-full rounded-xl object-cover'
                src='/assets/images/portfolio_works/portfolio.jpeg'
              />
              <div className='mt-auto flex flex-wrap gap-3 p-3'>
                {portfolio_item.badges.map((portfolio_badge, pb_id) => (
                  <div
                    className='relative cursor-pointer rounded-xl border border-white bg-[#10191d] px-3 py-1 text-sm'
                    key={pb_id}
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
