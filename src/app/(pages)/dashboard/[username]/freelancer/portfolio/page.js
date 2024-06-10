import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link';

const portfolio = [
  {
      id: 0,
      name: 'Title of the item',
      description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
      image: '/assets/images/portfolio_works/portfolio.jpeg',
      badges: [
          'Tag', 'Category'
      ]
  },
  {
      id: 1,
      name: 'Title of the item',
      description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
      image: '/assets/images/portfolio_works/portfolio.jpeg',
      badges: [
          'Tag', 'Category'
      ]
  },
  {
      id: 2,
      name: 'Title of the item',
      description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
      image: '/assets/images/portfolio_works/portfolio.jpeg',
      badges: [
          'Tag', 'Category'
      ]
  },
  {
      id: 3,
      name: 'Title of the item',
      description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
      image: '/assets/images/portfolio_works/portfolio.jpeg',
      badges: [
          'Tag', 'Category'
      ]
  },
  {
      id: 4,
      name: 'Title of the item',
      description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
      image: '/assets/images/portfolio_works/portfolio.jpeg',
      badges: [
          'Tag', 'Category'
      ]
  },
  {
      id: 5,
      name: 'Title of the item',
      description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
      image: '/assets/images/portfolio_works/portfolio.jpeg',
      badges: [
          'Tag', 'Category'
      ]
  },
]


const FreelancerPortfolio = () => {
  return (
    <div className='freelancer-portfolio md:px-4 py-6 flex flex-col'>
      <div className="p-7 mobile:p-4 flex gap-3 mobile:gap-x-0 mobile:gap-y-5 rounded-2xl bg-[#10191d] mobile:flex-wrap">
        <div className="w-full mobile:w-1/3 flex flex-col gap-3">
          <p className="text-xl text-[#96B0BD] mobile:text-sm mobile:text-center">Total earnings</p>
          <p className="text-4xl text-white font-bold mobile:text-center mobile:text-3xl">$9K+</p>
        </div>
        <div className="w-full mobile:w-1/3 flex flex-col gap-3">
          <p className="text-xl text-[#96B0BD] mobile:text-sm mobile:text-center">Total jobs</p>
          <p className="text-4xl text-white font-bold mobile:text-center mobile:text-3xl">44</p>
        </div>
        <div className="w-full mobile:w-1/3 flex flex-col gap-3">
          <p className="text-xl text-[#96B0BD] mobile:text-sm mobile:text-center">Total hours</p>
          <p className="text-4xl text-white font-bold mobile:text-center mobile:text-3xl">240</p>
        </div>
        <div className="w-fit mobile:w-full flex justify-center items-center gap-3">
          <Link href="./portfolio/create" className="px-12 py-3 rounded-xl cursor-pointer text-lg transition bg-[#DC4F13] hover:bg-white hover:text-black mobile:w-full mobile:text-center">
            Create
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-3 mobile:grid-cols-1 gap-5 w-full my-5">
        {portfolio.map((portfolio_item)=> (
          <div key={portfolio_item.id} className='bg-[#10191d] p-4 rounded-xl'>
            <div className="h-64 w-full relative flex">
              <img 
                src="/assets/images/portfolio_works/portfolio.jpeg" alt={portfolio_item.name} 
                className="absolute left-0 top-0 w-full h-full object-cover rounded-xl" 
              />
              <div className="flex mt-auto p-3 gap-3 flex-wrap">
                {portfolio_item.badges.map((portfolio_badge,pb_id)=> (
                  <div key={pb_id} className='border border-white rounded-xl py-1 px-3 relative bg-[#10191d] text-sm cursor-pointer'>
                    {portfolio_badge}
                  </div>
                ))}
              </div>
            </div>
            <div className="py-6 flex flex-col gap-3">
              <div className="text-3xl text-[#F5F5F5]">
                {portfolio_item.name}
              </div>
              <div className="text-base text-[#96B0BD]">
                {portfolio_item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="py-5 md:text-xl hover:bg-white transition hover:text-black px-10 md:w-1/3 max-w-full rounded-xl mobile:px-5 mobile:w-full border border-[#aaaaaaaa] text-center mx-auto cursor-pointer mt-4">Load more +</div>
    </div>
  )
}

export default FreelancerPortfolio
