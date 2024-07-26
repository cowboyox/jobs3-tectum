'use client';
import { CircleAlert, CreditCardIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  useAnchorWallet,
} from "@solana/wallet-adapter-react";

import { Button } from '@/components/ui/button';
import api from '@/utils/api';

const BillingView = () => {
  const wallet = useAnchorWallet();
  
  const [addBilling, setBilling] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    (async () => {
      const info = JSON.parse(localStorage.getItem('jobs_2024_token'));
      let token;
      
      if (info) {
        token = info?.data?.token; // Replace 'your_token_key' with the actual key name
      }

      if (wallet && token) {
        try {
          await api.put(`/api/v1/profile/update-walletPublickey`, JSON.stringify({ walletPublicKey: wallet.publicKey }));
        } catch (error) {
          console.log("Error while updating wallet publicKey:", error);
        }
      }
    })();
  }, [wallet]);

  return (
    <div className='mx-auto flex max-w-[700px] flex-col gap-4'>
      <div className='rounded-[12px] bg-[#10191D] p-8'>
        {addBilling ? (
          <div className='flex flex-col gap-4'>
            <label className='text-lg font-[500] text-primary' htmlFor='billin'>
              Add a Billing Method
            </label>

            <div className='flex flex-col gap-4 rounded-[12px] bg-[#1B272C] p-6'>
              <div className='flex items-start gap-6'>
                {' '}
                <input
                  className='mt-1 h-6 w-6 cursor-pointer accent-[#DC4F13]'
                  name='billingMethod'
                  onClick={() => setPaymentMethod('card')}
                  type='radio'
                  value='card'
                />
                <div>
                  <label className='text-lg font-[500] text-primary' htmlFor='status'>
                    Payment Card
                  </label>
                  <p className='text-[#96B0BD]'>
                    Visa, Mastercard, American Express, Discover, Diners
                  </p>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className='flex flex-col gap-6'>
                  <div className='flex flex-col gap-3'>
                    <label className='text-md font-[500] text-primary' htmlFor='cardNumber'>
                      Card Number
                    </label>
                    <div className='flex gap-4 rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4 text-[#96B0BD]'>
                      <CreditCardIcon className='w-6 h-6 text-white' />
                      <input
                        className='flex-1 bg-[#1B272C] text-white outline-none'
                        placeholder='Card Number'
                        type='text'
                      />
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div className='flex flex-col flex-1 gap-3'>
                      <label className='text-md font-[500] text-primary' htmlFor='cardNumber'>
                        First Name
                      </label>
                      <input
                        className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4 text-[#96B0BD]'
                        placeholder='First Name'
                        type='text'
                      />
                    </div>
                    <div className='flex flex-col flex-1 gap-3'>
                      <label className='text-md font-[500] text-primary' htmlFor='cardNumber'>
                        Last Name
                      </label>
                      <input
                        className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4 text-[#96B0BD]'
                        placeholder='Last Name'
                        type='text'
                      />
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div className='flex w-[31.5%] flex-col gap-3'>
                      <label className='text-md font-[500] text-primary' htmlFor='cardNumber'>
                        Expiration Month
                      </label>
                      <input
                        className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4 text-[#96B0BD]'
                        placeholder='mm'
                        type='text'
                      />
                    </div>
                    <div className='flex w-[31.5%] flex-col gap-3'>
                      <label className='text-md font-[500] text-primary' htmlFor='cardNumber'>
                        Expiration Year
                      </label>
                      <input
                        className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4 text-[#96B0BD]'
                        placeholder='yy'
                        type='text'
                      />
                    </div>
                    <div className='flex w-[31.5%] flex-col gap-3'>
                      <label
                        className='text-md flex items-start gap-2 font-[500] text-primary'
                        htmlFor='cardNumber'
                      >
                        Security Code <CircleAlert className='w-4 h-4' />
                      </label>
                      <input
                        className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4 text-[#96B0BD]'
                        placeholder='3 digits'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='flex flex-col flex-1 gap-3'>
                      <label className='text-md font-[500] text-primary' htmlFor='cardNumber'>
                        Billing Address
                      </label>
                      <input
                        className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4 text-[#96B0BD]'
                        placeholder='United Kingdom'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='flex flex-col flex-1 gap-3'>
                      <label className='text-md font-[500] text-primary' htmlFor='cardNumber'>
                        Address Line 1
                      </label>
                      <input
                        className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4 text-[#96B0BD]'
                        placeholder=''
                        type='text'
                      />
                    </div>
                    <div className='flex flex-col flex-1 gap-3'>
                      <label className='text-md font-[500] text-primary' htmlFor='cardNumber'>
                        Address Line 2
                      </label>
                      <input
                        className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4 text-[#96B0BD]'
                        placeholder='Optional'
                        type='text'
                      />
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div className='flex flex-col flex-1 gap-3'>
                      <label className='text-md font-[500] text-primary' htmlFor='cardNumber'>
                        City
                      </label>
                      <select className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4 pr-4 text-[#96B0BD]'>
                        <option className='text-[#96B0BD]' value='London'>
                          London
                        </option>
                      </select>
                    </div>
                    <div className='flex flex-col flex-1 gap-3'>
                      <label className='text-md font-[500] text-primary' htmlFor='cardNumber'>
                        Postal code
                      </label>
                      <input
                        className='rounded-[12px] border border-[#96B0BD] bg-[#1B272C] p-4 text-[#96B0BD]'
                        placeholder='100001'
                        type='text'
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='mt-4 flex items-start gap-6 rounded-[12px] bg-[#1B272C] p-6'>
              <input
                className='mt-1 h-6 w-6 cursor-pointer accent-[#DC4F13]'
                name='billingMethod'
                onClick={() => setPaymentMethod('paypal')}
                type='radio'
                value='paypal'
              />
              <div>
                <label className='text-lg font-[500] text-primary' htmlFor='status'>
                  Paypal
                </label>
              </div>
            </div>
            <div className='flex justify-end'>
              {' '}
              <Button
                className={`mt-6 w-[200px] rounded-xl bg-[#DC4F13] px-10 py-8 text-white hover:bg-[#DC4F13]`}
                onClick={() => setBilling(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <label className='text-lg font-[500] text-primary' htmlFor='billin'>
              Billing Methods
            </label>
            <p className='text-md text-[#96B0BD]'>
              You haven&apos;t set up any billing methods yet. Your billing method will be charged
              only when your available balance from JOBS3 earnings is not sufficient to pay for your
              monthly membership
            </p>

            {/* <div className='flex justify-end'>
              <Button
                className={`mt-6 w-[200px] rounded-xl bg-[#DC4F13] px-10 py-8 text-white hover:bg-[#DC4F13]`}
                onClick={() => setBilling(true)}
              >
                Add Billing Method
              </Button>
            </div> */}
            <div className='flex justify-end'>
              <div className='rounded-2xl bg-[#DC4F13]'>
                <WalletMultiButton className="bg-secondary hover:bg-[#DC4F13]" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BillingView;
