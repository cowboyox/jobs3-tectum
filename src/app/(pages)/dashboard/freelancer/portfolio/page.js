'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/use-custom';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
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
  const [page, setPage] = useState(1);
  const [portfolioAllList, setPortfolioAllList] = useState([]);
  const [portfolioList, setPortfolioList] = useState([]);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const itemsPerPage = 6;
  const auth = useCustomContext();
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };
  useEffect(() => {
    if (auth.user) {
      api
        .get(`/api/v1/freelancer_portfolio/find_all_portfolios_by_email/${auth.user.email}?page=${page}&limit=${itemsPerPage}`)
        .then((data) => {
          if (data.data.data) {
            setPortfolioAllList(data.data.data);
          }
        })
        .catch((err) => {
          console.error('Error corrupted while getting all gigs: ', err);
        });
    }
  }, [auth, page]);
  useEffect(() => {
    if (portfolioAllList?.length > 0) {
      setCanLoadMore(true);
      if (page === 1) {
        setPortfolioList(portfolioAllList);
      } else {
        setPortfolioList((prev) => {
          let result = [...prev];
          const ids = prev.map((item) => item._id);

          portfolioAllList.map((fl) => {
            if (!ids.includes(fl._id)) {
              result = [...result, fl];
            }
          });
          return result;
        });
      }
    } else {
      if (page === 1) {
        setPortfolioList([]);
      }
      setCanLoadMore(false);
    }
  }, [portfolioAllList, page]);
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
        {portfolioList.map((portfolio_item, key) => (
          <div className='rounded-xl bg-[#10191d] p-4' key={key}>
            <div className='relative flex h-64 w-full'>
              <img
                alt={portfolio_item.portfolioTitle}
                className='absolute left-0 top-0 h-full w-full rounded-xl object-cover'
                src={`${portfolio_item.gallery?.images.length?portfolio_item.gallery?.images[0]:'/assets/images/portfolio_works/portfolio.jpeg'}`}
              />
            </div>
            <div className='flex flex-col gap-3 py-6'>
              <div className='text-3xl text-[#F5F5F5]'>{portfolio_item.portfolioTitle}</div>
              <div className='text-base text-[#96B0BD]'>{portfolio_item.portfolioDescription}</div>
            </div>
          </div>
        ))}
      </div>
      {canLoadMore && (
        <div
          className='mx-auto mt-4 max-w-full cursor-pointer rounded-xl border border-[#aaaaaaaa] px-10 py-5 text-center transition hover:bg-white hover:text-black md:w-1/3 md:text-xl mobile:w-full mobile:px-5'
          onClick={handleLoadMore}
        >
          Load more +
        </div>
      )}
    </div>
  );
};

export default FreelancerPortfolio;
