'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/use-custom';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';

const FreelancerPortfolio = ({ params }) => {
  const [page, setPage] = useState(1);
  const [portfolioAllList, setPortfolioAllList] = useState([]);
  const [portfolioList, setPortfolioList] = useState([]);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [totalEarn, setTotalEarn] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const itemsPerPage = 6;
  const auth = useCustomContext();
  const router = useRouter();
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };
  const [totalNumber, setTotalNumber] = useState(0);
  useEffect(() => {
    api
      .get(
        `/api/v1/freelancer_portfolio/find_all_portfolios_by_profileId/${params.id}?page=${page}&limit=${itemsPerPage}`
      )
      .then((data) => {
        if (data.data.data) {
          setPortfolioAllList(data.data.data);
        }
        setTotalNumber(data.data.countNumber);
      })
      .catch((err) => {
        console.error('Error corrupted while getting all gigs: ', err);
      });
  }, [page, params.id]);
  console.log('totalNumber', totalNumber);
  useEffect(() => {
    if (portfolioAllList?.length > 0) {
      setCanLoadMore(true);
      if (page === 1) {
        setPortfolioList(portfolioAllList);
        if (totalNumber > portfolioAllList.length) {
          setCanLoadMore(true);
        } else setCanLoadMore(false);
      } else {
        setPortfolioList((prev) => {
          let result = [...prev];
          const ids = prev.map((item) => item._id);

          portfolioAllList.map((fl) => {
            if (!ids.includes(fl._id)) {
              result = [...result, fl];
            }
          });
          if (result.length === totalNumber) setCanLoadMore(false);
          return result;
        });
      }
    } else {
      if (page === 1) {
        setPortfolioList([]);
      }
      setCanLoadMore(false);
    }
  }, [portfolioAllList, page, totalNumber]);
  useEffect(() => {
    if (auth.currentProfile) {
      let totalEarnAmount = 0;
      let totalJobsCount = 0;
      let totalHoursCount = 0;
      auth.currentProfile.flHistory?.forEach((item) => {
        totalJobsCount += 1;
        item.pays.forEach((pay) => {
          totalEarnAmount += pay.amount;
          totalHoursCount += 1; // Assuming each pay is for 1 hour
        });
      });
      setTotalEarn(totalEarnAmount);
      setTotalJobs(totalJobsCount);
      setTotalHours(totalHoursCount);
    }
  }, [auth.currentProfile]);
  return (
    <div className='freelancer-portfolio flex flex-col py-6 md:px-4'>
      <div className='mobile:flex-wrap mobile:gap-x-0 mobile:gap-y-5 mobile:p-4 flex gap-3 rounded-2xl bg-[#10191d] p-7'>
        <div className='mobile:w-1/3 flex w-full flex-col gap-3'>
          <p className='mobile:text-center mobile:text-sm text-xl text-[#96B0BD]'>Total earnings</p>
          <p className='mobile:text-center mobile:text-3xl text-4xl font-bold text-white'>${totalEarn}</p>
        </div>
        <div className='mobile:w-1/3 flex w-full flex-col gap-3'>
          <p className='mobile:text-center mobile:text-sm text-xl text-[#96B0BD]'>Total jobs</p>
          <p className='mobile:text-center mobile:text-3xl text-4xl font-bold text-white'>{totalJobs}</p>
        </div>
        <div className='mobile:w-1/3 flex w-full flex-col gap-3'>
          <p className='mobile:text-center mobile:text-sm text-xl text-[#96B0BD]'>Total hours</p>
          <p className='mobile:text-center mobile:text-3xl text-4xl font-bold text-white'>{totalHours}</p>
        </div>
        <div className='mobile:w-full flex w-fit items-center justify-center gap-3'>
          <Link
            className='mobile:w-full mobile:text-center cursor-pointer rounded-xl bg-[#DC4F13] px-12 py-3 text-lg transition hover:bg-white hover:text-black'
            href='./create'
          >
            Create
          </Link>
        </div>
      </div>
      <div className='mobile:grid-cols-1 my-5 grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {portfolioList.map((portfolio_item, key) => (
          <div
            className='cursor-pointer rounded-xl bg-[#10191d] p-4'
            key={key}
            onClick={() =>
              router.push(`/dashboard/freelancer/portfolio-view/${params.id}/${portfolio_item._id}`)
            }
          >
            <div className='relative flex h-64 w-full'>
              <img
                alt={portfolio_item.portfolioTitle}
                className='absolute left-0 top-0 h-full w-full rounded-xl object-cover'
                src={`${portfolio_item.gallery?.images.length ? portfolio_item.gallery?.images[0] : '/assets/images/portfolio_works/portfolio.jpeg'}`}
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
          className='mobile:w-full mobile:px-5 mx-auto mt-4 w-full max-w-full cursor-pointer rounded-xl border border-[#aaaaaaaa] px-10 py-5 text-center transition hover:bg-white hover:text-black md:text-xl'
          onClick={handleLoadMore}
        >
          Load more +
        </div>
      )}
    </div>
  );
};

export default FreelancerPortfolio;
