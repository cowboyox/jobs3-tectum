'use client';

import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Wallet3() {
  return (
    <div className='mt-[-20px] pl-8 pr-8'>
      <div className='text-3xl text-[#545454]'>Hello Alex</div>
      <h2 className='text-4xl'>Welcome!!</h2>
      <div className='mt-[4%] grid grid-cols-12 gap-8'>
        <div className='col-span-8 rounded-2xl bg-[radial-gradient(circle_at_50%_75%,#DC4F13,#151A1E)] p-6 pb-12 pt-12'>
          <div className='text-3xl text-[#A7A7A7]'>Total Balance</div>
          <div className='mt-2 text-6xl'>$ 13450.00</div>
        </div>
        <div className='col-span-4 flex flex-col items-center justify-center rounded-2xl bg-[#141519] p-6 text-center text-2xl'>
          <div className='mb-4 w-[80%] rounded-xl bg-[#DC4F13] p-4'>Deposit</div>
          <div className='w-[80%] rounded-xl bg-black p-4'>Withdraw</div>
        </div>
      </div>
      <div className='mt-3 text-4xl'>Assets</div>
      <div className='mt-3 flex max-w-[80vw] touch-pan-x flex-row items-center gap-6 overflow-x-auto overscroll-x-contain'>
        <div className='grid flex-none grid-cols-2 rounded-xl border border-[#353535] p-5 xl:w-[250px]'>
          <div className='col-span-1'>
            <div className='text-2xl'>SOL</div>
            <div className='text-xl text-[#A7A7A7]'>Solana</div>
          </div>
          <div className='col-span-1 ml-[3vw]'>
            <img height={'50'} src='/assets/images/token_logos/solana.svg' width={'50'} />
          </div>
          <div className='text-2xl'>$84 948</div>
          <div className='ml-[2vw] text-xl text-[#00CC08]'>+ 4.57 %</div>
        </div>
        <div className='grid flex-none grid-cols-2 rounded-xl border border-[#353535] p-5 xl:w-[250px]'>
          <div className='col-span-1'>
            <div className='text-2xl'>SOL</div>
            <div className='text-xl text-[#A7A7A7]'>Solana</div>
          </div>
          <div className='col-span-1 ml-[3vw]'>
            <img height={'50'} src='/assets/images/token_logos/solana.svg' width={'50'} />
          </div>
          <div className='text-2xl'>$84 948</div>
          <div className='ml-[2vw] text-xl text-[#00CC08]'>+ 4.57 %</div>
        </div>
        <div className='grid flex-none grid-cols-2 rounded-xl border border-[#353535] p-5 xl:w-[250px]'>
          <div className='col-span-1'>
            <div className='text-2xl'>SOL</div>
            <div className='text-xl text-[#A7A7A7]'>Solana</div>
          </div>
          <div className='col-span-1 ml-[3vw]'>
            <img height={'50'} src='/assets/images/token_logos/solana.svg' width={'50'} />
          </div>
          <div className='text-2xl'>$84 948</div>
          <div className='ml-[2vw] text-xl text-[#00CC08]'>+ 4.57 %</div>
        </div>
        <div className='grid flex-none grid-cols-2 rounded-xl border border-[#353535] p-5 xl:w-[250px]'>
          <div className='col-span-1'>
            <div className='text-2xl'>SOL</div>
            <div className='text-xl text-[#A7A7A7]'>Solana</div>
          </div>
          <div className='col-span-1 ml-[3vw]'>
            <img height={'50'} src='/assets/images/token_logos/solana.svg' width={'50'} />
          </div>
          <div className='text-2xl'>$84 948</div>
          <div className='ml-[2vw] text-xl text-[#00CC08]'>+ 4.57 %</div>
        </div>
        <div className='grid flex-none grid-cols-2 rounded-xl border border-[#353535] p-5 xl:w-[250px]'>
          <div className='col-span-1'>
            <div className='text-2xl'>SOL</div>
            <div className='text-xl text-[#A7A7A7]'>Solana</div>
          </div>
          <div className='col-span-1 ml-[3vw]'>
            <img height={'50'} src='/assets/images/token_logos/solana.svg' width={'50'} />
          </div>
          <div className='text-2xl'>$84 948</div>
          <div className='ml-[2vw] text-xl text-[#00CC08]'>+ 4.57 %</div>
        </div>
        <div className='grid flex-none grid-cols-2 rounded-xl border border-[#353535] p-5 xl:w-[250px]'>
          <div className='col-span-1'>
            <div className='text-2xl'>SOL</div>
            <div className='text-xl text-[#A7A7A7]'>Solana</div>
          </div>
          <div className='col-span-1 ml-[3vw]'>
            <img height={'50'} src='/assets/images/token_logos/solana.svg' width={'50'} />
          </div>
          <div className='text-2xl'>$84 948</div>
          <div className='ml-[2vw] text-xl text-[#00CC08]'>+ 4.57 %</div>
        </div>
        <div className='grid flex-none grid-cols-2 rounded-xl border border-[#353535] p-5 xl:w-[250px]'>
          <div className='col-span-1'>
            <div className='text-2xl'>SOL</div>
            <div className='text-xl text-[#A7A7A7]'>Solana</div>
          </div>
          <div className='col-span-1 ml-[3vw]'>
            <img height={'50'} src='/assets/images/token_logos/solana.svg' width={'50'} />
          </div>
          <div className='text-2xl'>$84 948</div>
          <div className='ml-[2vw] text-xl text-[#00CC08]'>+ 4.57 %</div>
        </div>
      </div>
      <div className='mt-3 text-4xl'>Transactions history</div>
      <div className='mt-2 grid grid-cols-12 rounded-xl bg-[#141B22B2] p-5'>
        <div className='col-span-2'>
          <img height={'50'} src='/assets/images/token_logos/transaction-solana.svg' width={'50'} />
        </div>
        <div className='col-span-7'>
          <div>Sent</div>
          <div className='text-[#A7A7A7]'>21/02/2023, 05:10</div>
        </div>
        <div className='col-span-3 text-end'>
          <div className='text-[#A7A7A7]'>-$23.93</div>
          <div>0.00098 SOL</div>
        </div>
      </div>
      <div className='mt-2 grid grid-cols-12 rounded-xl bg-[#141B22B2] p-5'>
        <div className='col-span-2'>
          <img height={'50'} src='/assets/images/token_logos/transaction-solana.svg' width={'50'} />
        </div>
        <div className='col-span-7'>
          <div>Sent</div>
          <div className='text-[#A7A7A7]'>21/02/2023, 05:10</div>
        </div>
        <div className='col-span-3 text-end'>
          <div className='text-[#A7A7A7]'>-$23.93</div>
          <div>0.00098 SOL</div>
        </div>
      </div>
      <div className='mt-2 grid grid-cols-12 rounded-xl bg-[#141B22B2] p-5'>
        <div className='col-span-2'>
          <img height={'50'} src='/assets/images/token_logos/transaction-solana.svg' width={'50'} />
        </div>
        <div className='col-span-7'>
          <div>Sent</div>
          <div className='text-[#A7A7A7]'>21/02/2023, 05:10</div>
        </div>
        <div className='col-span-3 text-end'>
          <div className='text-[#A7A7A7]'>-$23.93</div>
          <div>0.00098 SOL</div>
        </div>
      </div>
      <div className='mt-2 grid grid-cols-12 rounded-xl bg-[#141B22B2] p-5'>
        <div className='col-span-2'>
          <img height={'50'} src='/assets/images/token_logos/transaction-solana.svg' width={'50'} />
        </div>
        <div className='col-span-7'>
          <div>Sent</div>
          <div className='text-[#A7A7A7]'>21/02/2023, 05:10</div>
        </div>
        <div className='col-span-3 text-end'>
          <div className='text-[#A7A7A7]'>-$23.93</div>
          <div>0.00098 SOL</div>
        </div>
      </div>
      <div className='mt-2 grid grid-cols-12 rounded-xl bg-[#141B22B2] p-5'>
        <div className='col-span-2'>
          <img height={'50'} src='/assets/images/token_logos/transaction-solana.svg' width={'50'} />
        </div>
        <div className='col-span-7'>
          <div>Sent</div>
          <div className='text-[#A7A7A7]'>21/02/2023, 05:10</div>
        </div>
        <div className='col-span-3 text-end'>
          <div className='text-[#A7A7A7]'>-$23.93</div>
          <div>0.00098 SOL</div>
        </div>
      </div>
      <div className='mt-2 grid grid-cols-12 rounded-xl bg-[#141B22B2] p-5'>
        <div className='col-span-2'>
          <img height={'50'} src='/assets/images/token_logos/transaction-solana.svg' width={'50'} />
        </div>
        <div className='col-span-7'>
          <div>Sent</div>
          <div className='text-[#A7A7A7]'>21/02/2023, 05:10</div>
        </div>
        <div className='col-span-3 text-end'>
          <div className='text-[#A7A7A7]'>-$23.93</div>
          <div>0.00098 SOL</div>
        </div>
      </div>
    </div>
  );
}
