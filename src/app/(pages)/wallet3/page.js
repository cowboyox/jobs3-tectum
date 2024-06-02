'use client';
import React, { useState } from 'react';

import { CiSearch } from "react-icons/ci";
import { CiGrid31 } from "react-icons/ci";
import { CgSortAz } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Wallet3() {

    return (
        <div className='pl-8 mt-[-20px] pr-8'>
            <div className='text-3xl text-[#545454]'>Hello Alex</div>
            <h2 className='text-4xl'>Welcome!!</h2>
            <div className='grid grid-cols-12 gap-8 mt-[4%]'>
                <div className="col-span-8 bg-[radial-gradient(circle_at_50%_75%,#DC4F13,#151A1E)] p-6 rounded-2xl pt-12 pb-12">
                    <div className='text-3xl text-[#A7A7A7]'>Total Balance</div>
                    <div className='text-6xl mt-2'>$ 13450.00</div>
                </div>
                <div className="col-span-4 bg-[#141519] p-6 rounded-2xl text-2xl flex flex-col items-center justify-center text-center">
                    <div className='p-4 bg-[#DC4F13] w-[80%] mb-4 rounded-xl'>Deposit</div>
                    <div className='p-4 bg-black w-[80%] rounded-xl'>Withdraw</div>
                </div>
            </div>
            <div className='text-4xl mt-3'>Assets</div>
            <div className='flex flex-row items-center gap-6 mt-3 overflow-x-auto max-w-[80vw] touch-pan-x overscroll-x-contain'>
                <div className='flex-none grid grid-cols-2 border border-[#353535] p-5 rounded-xl xl:w-[250px]'>
                    <div className='col-span-1'>
                        <div className='text-2xl'>
                            SOL
                        </div>
                        <div className='text-xl text-[#A7A7A7]'>
                            Solana
                        </div>
                    </div>
                    <div className='col-span-1 ml-[3vw]'>
                        <img src='/assets/images/token_logos/solana.svg' width={'50'} height={'50'}></img>
                    </div>
                    <div className='text-2xl'>
                        $84 948
                    </div>
                    <div className='text-xl text-[#00CC08] ml-[2vw]'>
                        + 4.57 %
                    </div>
                </div>
                <div className='flex-none grid grid-cols-2 border border-[#353535] p-5 rounded-xl xl:w-[250px]'>
                    <div className='col-span-1'>
                        <div className='text-2xl'>
                            SOL
                        </div>
                        <div className='text-xl text-[#A7A7A7]'>
                            Solana
                        </div>
                    </div>
                    <div className='col-span-1 ml-[3vw]'>
                        <img src='/assets/images/token_logos/solana.svg' width={'50'} height={'50'}></img>
                    </div>
                    <div className='text-2xl'>
                        $84 948
                    </div>
                    <div className='text-xl text-[#00CC08] ml-[2vw]'>
                        + 4.57 %
                    </div>
                </div>
                <div className='flex-none grid grid-cols-2 border border-[#353535] p-5 rounded-xl xl:w-[250px]'>
                    <div className='col-span-1'>
                        <div className='text-2xl'>
                            SOL
                        </div>
                        <div className='text-xl text-[#A7A7A7]'>
                            Solana
                        </div>
                    </div>
                    <div className='col-span-1 ml-[3vw]'>
                        <img src='/assets/images/token_logos/solana.svg' width={'50'} height={'50'}></img>
                    </div>
                    <div className='text-2xl'>
                        $84 948
                    </div>
                    <div className='text-xl text-[#00CC08] ml-[2vw]'>
                        + 4.57 %
                    </div>
                </div>
                <div className='flex-none grid grid-cols-2 border border-[#353535] p-5 rounded-xl xl:w-[250px]'>
                    <div className='col-span-1'>
                        <div className='text-2xl'>
                            SOL
                        </div>
                        <div className='text-xl text-[#A7A7A7]'>
                            Solana
                        </div>
                    </div>
                    <div className='col-span-1 ml-[3vw]'>
                        <img src='/assets/images/token_logos/solana.svg' width={'50'} height={'50'}></img>
                    </div>
                    <div className='text-2xl'>
                        $84 948
                    </div>
                    <div className='text-xl text-[#00CC08] ml-[2vw]'>
                        + 4.57 %
                    </div>
                </div>
                <div className='flex-none grid grid-cols-2 border border-[#353535] p-5 rounded-xl xl:w-[250px]'>
                    <div className='col-span-1'>
                        <div className='text-2xl'>
                            SOL
                        </div>
                        <div className='text-xl text-[#A7A7A7]'>
                            Solana
                        </div>
                    </div>
                    <div className='col-span-1 ml-[3vw]'>
                        <img src='/assets/images/token_logos/solana.svg' width={'50'} height={'50'}></img>
                    </div>
                    <div className='text-2xl'>
                        $84 948
                    </div>
                    <div className='text-xl text-[#00CC08] ml-[2vw]'>
                        + 4.57 %
                    </div>
                </div>
                <div className='flex-none grid grid-cols-2 border border-[#353535] p-5 rounded-xl xl:w-[250px]'>
                    <div className='col-span-1'>
                        <div className='text-2xl'>
                            SOL
                        </div>
                        <div className='text-xl text-[#A7A7A7]'>
                            Solana
                        </div>
                    </div>
                    <div className='col-span-1 ml-[3vw]'>
                        <img src='/assets/images/token_logos/solana.svg' width={'50'} height={'50'}></img>
                    </div>
                    <div className='text-2xl'>
                        $84 948
                    </div>
                    <div className='text-xl text-[#00CC08] ml-[2vw]'>
                        + 4.57 %
                    </div>
                </div>
                <div className='flex-none grid grid-cols-2 border border-[#353535] p-5 rounded-xl xl:w-[250px]'>
                    <div className='col-span-1'>
                        <div className='text-2xl'>
                            SOL
                        </div>
                        <div className='text-xl text-[#A7A7A7]'>
                            Solana
                        </div>
                    </div>
                    <div className='col-span-1 ml-[3vw]'>
                        <img src='/assets/images/token_logos/solana.svg' width={'50'} height={'50'}></img>
                    </div>
                    <div className='text-2xl'>
                        $84 948
                    </div>
                    <div className='text-xl text-[#00CC08] ml-[2vw]'>
                        + 4.57 %
                    </div>
                </div>
            </div>
            <div className='text-4xl mt-3'>Transactions history</div>
            <div className='grid grid-cols-12 mt-2 bg-[#141B22B2] p-5 rounded-xl'>
                <div className='col-span-2'>
                    <img src='/assets/images/token_logos/transaction-solana.svg' width={'50'} height={'50'}></img>
                </div>
                <div className='col-span-7'>
                    <div>
                        Sent
                    </div>
                    <div className='text-[#A7A7A7]'>
                        21/02/2023, 05:10
                    </div>
                </div>
                <div className='col-span-3 text-end'>
                    <div className='text-[#A7A7A7]'>
                        -$23.93
                    </div>
                    <div>
                        0.00098 SOL
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-12 mt-2 bg-[#141B22B2] p-5 rounded-xl'>
                <div className='col-span-2'>
                    
                    <img src='/assets/images/token_logos/transaction-solana.svg' width={'50'} height={'50'}></img>
                </div>
                <div className='col-span-7'>
                    <div>
                        Sent
                    </div>
                    <div className='text-[#A7A7A7]'>
                        21/02/2023, 05:10
                    </div>
                </div>
                <div className='col-span-3 text-end'>
                    <div className='text-[#A7A7A7]'>
                        -$23.93
                    </div>
                    <div>
                        0.00098 SOL
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-12 mt-2 bg-[#141B22B2] p-5 rounded-xl'>
                <div className='col-span-2'>
                    <img src='/assets/images/token_logos/transaction-solana.svg' width={'50'} height={'50'}></img>
                </div>
                <div className='col-span-7'>
                    <div>
                        Sent
                    </div>
                    <div className='text-[#A7A7A7]'>
                        21/02/2023, 05:10
                    </div>
                </div>
                <div className='col-span-3 text-end'>
                    <div className='text-[#A7A7A7]'>
                        -$23.93
                    </div>
                    <div>
                        0.00098 SOL
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-12 mt-2 bg-[#141B22B2] p-5 rounded-xl'>
                <div className='col-span-2'>
                    <img src='/assets/images/token_logos/transaction-solana.svg' width={'50'} height={'50'}></img>
                </div>
                <div className='col-span-7'>
                    <div>
                        Sent
                    </div>
                    <div className='text-[#A7A7A7]'>
                        21/02/2023, 05:10
                    </div>
                </div>
                <div className='col-span-3 text-end'>
                    <div className='text-[#A7A7A7]'>
                        -$23.93
                    </div>
                    <div>
                        0.00098 SOL
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-12 mt-2 bg-[#141B22B2] p-5 rounded-xl'>
                <div className='col-span-2'>
                    <img src='/assets/images/token_logos/transaction-solana.svg' width={'50'} height={'50'}></img>
                </div>
                <div className='col-span-7'>
                    <div>
                        Sent
                    </div>
                    <div className='text-[#A7A7A7]'>
                        21/02/2023, 05:10
                    </div>
                </div>
                <div className='col-span-3 text-end'>
                    <div className='text-[#A7A7A7]'>
                        -$23.93
                    </div>
                    <div>
                        0.00098 SOL
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-12 mt-2 bg-[#141B22B2] p-5 rounded-xl'>
                <div className='col-span-2'>
                    <img src='/assets/images/token_logos/transaction-solana.svg' width={'50'} height={'50'}></img>
                </div>
                <div className='col-span-7'>
                    <div>
                        Sent
                    </div>
                    <div className='text-[#A7A7A7]'>
                        21/02/2023, 05:10
                    </div>
                </div>
                <div className='col-span-3 text-end'>
                    <div className='text-[#A7A7A7]'>
                        -$23.93
                    </div>
                    <div>
                        0.00098 SOL
                    </div>
                </div>
            </div>
        </div>
    )
} 