'use client';
import React, { useEffect, useState } from 'react';

import { useCustomContext } from '@/context/use-custom';
import api from '@/utils/api';

const decisionResults = [
  {
    // agree with seller
    buyerDisputeFee: {
      adminPercentage: 100,
      buyerPercentage: 0,
    },
    payment: {
      buyerPercentage: 0,
      sellerPercentage: 100,
    },
    sellerDisputeFee: {
      adminPercentage: 0,
      sellerPercentage: 100,
    },
  },
  {
    // agree with buyer
    buyerDisputeFee: {
      adminPercentage: 0,
      buyerPercentage: 100,
    },
    payment: {
      buyerPercentage: 100,
      sellerPercentage: 0,
    },
    sellerDisputeFee: {
      adminPercentage: 100,
      sellerPercentage: 0,
    },
  },
  {
    // agree with split
    buyerDisputeFee: {
      adminPercentage: 50,
      buyerPercentage: 50,
    },
    payment: {
      buyerPercentage: 50,
      sellerPercentage: 50,
    },
    sellerDisputeFee: {
      adminPercentage: 50,
      sellerPercentage: 50,
    },
  },
];

const DisputeDetail = () => {
  const [myGigs, setMyGigs] = useState([]);
  const [decision, setDecision] = useState('agree with seller');
  const [decisionResult, setDecisionResult] = useState(decisionResults[0]);
  const auth = useCustomContext();

  useEffect(() => {
    api
      .get(`/api/v1/client_gig/get_gigs_posted_by_profile_id/${auth?.currentProfile?._id}`)
      .then((data) => {
        setMyGigs(data.data.data);
      });
  }, [auth?.currentProfile?._id]);

  useEffect(() => {
    if (decision == 'agree with seller') {
      setDecisionResult(decisionResults[0]);
    } else if (decision == 'agree with buyer') {
      setDecisionResult(decisionResults[1]);
    } else {
      setDecisionResult(decisionResults[2]);
    }
  }, [decision]);

  const handleExcute = () => {
    // contract function call here
    console.log('handle excute!');
  };

  return (
    <div className='flex flex-col justify-between gap-2 md:flex-row'>
      <div className='mb-4 w-[60%] rounded-xl bg-[#10191d] p-9 mobile:w-full mobile:gap-3 mobile:p-7'>
        <div className='mb-5 flex'>
          <h1 className='text-xl text-white'>Dispute Detail</h1>
        </div>
        <div className='mb-5 border-t-2 bg-[#10191d] py-7 mobile:flex-col-reverse mobile:gap-3 mobile:py-3'>
          <div className='flex items-center justify-between gap-1'>
            <div>
              <h3 className='mb-2 text-lg text-slate-500'>Git Title</h3>
              <p className='text-white'>Rust developer</p>
            </div>
            <div>
              <h3 className='mb-2 text-lg text-slate-500'>Buuer username</h3>
              <p className='text-white'>Devon Miles</p>
            </div>
            <div>
              <h3 className='mb-2 text-lg text-slate-500'>Seller username</h3>
              <p className='text-white'>Devon Miles</p>
            </div>
          </div>
        </div>
        <div className='border-t-2 bg-[#10191d] pt-7 mobile:flex-col-reverse mobile:gap-3 mobile:pt-3'>
          <div className='mb-5 flex flex-col'>
            <h1 className='mb-5 text-xl text-white'>Buyer Explanation</h1>
            <textarea
              className='rounded-xl border-2 bg-[#10191d] p-4'
              placeholder='Write your request details...'
              rows={4}
            />
          </div>
          <div className='flex flex-col'>
            <h1 className='mb-5 text-xl text-white'>Seller Explanation</h1>
            <textarea
              className='rounded-xl border-2 bg-[#10191d] p-4'
              placeholder='Write your request details...'
              rows={4}
            />
          </div>
        </div>
      </div>
      <div className='mb-4 w-[40%] rounded-xl bg-[#10191d] p-9 mobile:w-full mobile:gap-3 mobile:p-7'>
        <div className='mb-5'>
          <h3 className='mb-2 text-lg text-slate-500'>Buyer dispute fee</h3>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Buyer percentage</h3>
              <p className='text-white'>{decisionResult.buyerDisputeFee.buyerPercentage}%</p>
            </div>
          </div>
          <div className='mt-2'>
            <div className='flex justify-between'>
              <h3 className='text-white'>Admin percentage</h3>
              <p className='text-white'>{decisionResult.buyerDisputeFee.adminPercentage}%</p>
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <h3 className='mb-2 text-lg text-slate-500'>Seller dispute fee</h3>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Seller percentage</h3>
              <p className='text-white'>{decisionResult.sellerDisputeFee.sellerPercentage}%</p>
            </div>
          </div>
          <div className='mt-2'>
            <div className='flex justify-between'>
              <h3 className='text-white'>Admin percentage</h3>
              <p className='text-white'>{decisionResult.sellerDisputeFee.adminPercentage}%</p>
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <h3 className='mb-2 text-lg text-slate-500'>Payment</h3>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Buyer percentage</h3>
              <p className=''>
                <input
                  className='w-[50px] bg-[#1B272C] text-white'
                  max={100}
                  min={0}
                  onChange={(e) => {
                    if (e.target.value >= 0 && e.target.value <= 100) {
                      setDecisionResult((prev) => {
                        return {
                          ...prev,
                          payment: {
                            buyerPercentage: e.target.value,
                            sellerPercentage: 100 - e.target.value,
                          },
                        };
                      });
                    }
                  }}
                  type='number'
                  value={decisionResult.payment.buyerPercentage}
                />
                %
              </p>
            </div>
          </div>
          <div className='mt-2'>
            <div className='flex justify-between'>
              <h3 className='text-white'>Seller percentage</h3>
              <p className=''>
                <input
                  className='w-[50px] bg-[#1B272C] text-white'
                  max={100}
                  min={0}
                  onChange={(e) => {
                    if (e.target.value >= 0 && e.target.value <= 100) {
                      setDecisionResult((prev) => {
                        return {
                          ...prev,
                          payment: {
                            buyerPercentage: 100 - e.target.value,
                            sellerPercentage: e.target.value,
                          },
                        };
                      });
                    }
                  }}
                  type='number'
                  value={decisionResult.payment.sellerPercentage}
                />
                %
              </p>
            </div>
          </div>
        </div>
        <div className='mb-5 w-full'>
          <select
            className='w-full rounded-2xl bg-[#1B272C] p-5 text-xl text-slate-500 mobile:text-lg'
            onChange={(e) => setDecision(e.target.value)}
            value={decision}
          >
            <option className='text-xl text-slate-500 mobile:text-lg' value='agree with seller'>
              Agree with Seller
            </option>
            <option className='text-xl text-slate-500 mobile:text-lg' value='agree with buyer'>
              Agree with Buyer
            </option>
            <option className='text-xl text-slate-500 mobile:text-lg' value='agree with split'>
              Agree with Split
            </option>
          </select>
        </div>
        <div className='flex w-full items-center justify-center'>
          <button
            className='w-full rounded-2xl bg-[#DC4F13] p-4 px-8 text-xl font-bold md:p-5 mobile:text-lg mobile:font-bold'
            onClick={() => handleExcute()}
          >
            Excute Decision
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisputeDetail;
