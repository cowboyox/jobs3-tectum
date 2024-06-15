'use client'
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { CgOptions } from "react-icons/cg";
import { MdVerified } from "react-icons/md";
import Image from 'next/image';
import api from '@/utils/api';

const recentHires = [
    {
        pic: "/assets/dashboard-media/profilePic.png",
        name: "Deven Miles",
        desg: "Freelancer",
    },
    {
        pic: "/assets/dashboard-media/profilePic.png",
        name: "Deven Miles",
        desg: "Freelancer",
    },
    {
        pic: "/assets/dashboard-media/profilePic.png",
        name: "Deven Miles",
        desg: "Freelancer",
    },
    {
        pic: "/assets/dashboard-media/profilePic.png",
        name: "Deven Miles",
        desg: "Freelancer",
    },
]

const Stats = () => {
    const [spendings, setSpending] = useState([
        {
            title: "",
            hiredFreelancer: [],
            daysAgo: "",
            price: ""

        }
    ]);
    const [recentHires, setRecentHires] = useState([{
        pic: "",
        name: "",
        desg: ""
    }])

    useEffect(() => {
        api.get(`/api/v1/client_gig/get-gigs-bystatus/ended`).then(data => {
            setSpending(data.data.data);
        })

        api.get(`/api/v1/client_gig/recent-hired-freelancers`).then(data => {
            setRecentHires(data.data.data);
        })
    }, [])
    return (
        <div className='w-full min-h-96 flex flex-col -mt-10 font-roboto md:mt-10'>
            <div className='h-16 rounded-2xl bg-deepGreen flex items-center justify-between gap-6 px-4'>
                <div className='flex gap-4 flex-1 items-center'>
                    <CiSearch className='text-2xl text-medGray' />
                    <input type="text" name="search" id="search" placeholder='Search by Order title...' className='bg-transparent outline-none border-none h-full text-medGray' />
                </div>
                <div className='flex gap-4 min-w-28 justify-center items-center'>
                    <CgOptions className='text-2xl text-medGray' />
                    <p className='text-white'>Filter</p>
                    <span className='rounded-full bg-orange size-6 flex justify-center items-center'>4</span>
                </div>
                <div className='min-w-28 hidden md:flex justify-center items-center'>
                    <span className='text-white'>
                        Sorted by
                    </span>
                    <select name="date" id="date" className='bg-transparent border-none outline-none text-medGray'>
                        <option value="date" className='text-medGray'>Date</option>
                    </select>
                </div>
            </div>
            <div className='mt-10 flex flex-col gap-4'>

                <h1>
                    Your Stats
                </h1>
                <div className='grid lg:grid-cols-3 gap-4'>
                    <div className='rounded-2xl bg-deepGreen min-h-96 h-full p-5 flex flex-col'>
                        <div className='h-1/6 flex justify-between items-center'>
                            <h3 className='text-white text-2xl'>Spendings</h3>
                            <p className='text-medGray'>See All</p>
                        </div>
                        <div className='flex flex-col justify-between gap-2 flex-1'>
                            {
                                spendings.length ? spendings.map((spend,index) => (
                                    <div key={index} className='flex px-3 gap-1 items-center flex-1 bg-darkGray rounded-2xl'>
                                        <div className='w-[70%]'>
                                            <h3 className='text-white text-lg truncate'>{spend.title}</h3>
                                            <div className='flex gap-1 items-center text-medGray'>
                                                <p className='text-medGray'>{spend.desc}</p>
                                                <div className='rounded-full size-1 bg-medGray'></div>
                                                <span>{spend.daysAgo}</span>
                                            </div>
                                        </div>
                                        <div className='flex-1 flex justify-center items-center'>
                                            <div className='bg-lightGray w-[90%] h-8 outline-none border-none flex justify-center items-center rounded-[8px] gap-2'><span>-</span> {spend.price}</div>
                                        </div>
                                    </div>
                                )) :
                                <div className='text-center mt-[50%]'>No spendings</div>
                            }
                        </div>
                    </div>
                    <div className='rounded-2xl bg-deepGreen min-h-96 h-full p-5 flex flex-col'>
                        <div className='h-1/6 flex justify-between items-center'>
                            <h3 className='text-white text-2xl'>Recent Hires</h3>
                            <p className='text-medGray'>See All</p>
                        </div>
                        <div className='flex flex-col justify-between gap-2 flex-1'>
                            {
                                recentHires.length ? recentHires.map((spend,index) => (
                                    <div key={index} className='flex px-3 gap-1 items-center flex-1 bg-darkGray rounded-2xl'>

                                        <div className='flex-1 flex justify-center items-center'>
                                            <div className=' w-[90%] h-10 outline-none border-none flex justify-center items-center'><Image src={spend.pic} alt='pic' width={1000} height={1000} className='w-full h-full object-contain' /></div>
                                        </div>
                                        <div className='w-[70%]'>
                                            <div className='flex items-center gap-2'>
                                                <h3 className='text-white text-lg truncate'>{spend.name}</h3>
                                                <MdVerified className='text-[#0A75C2]'/>
                                            </div>
                                            <div className='flex gap-1 items-center text-medGray'>
                                                <p className='text-medGray'>{spend.desg}</p>
                                            </div>
                                        </div>
                                    </div>
                                )) : 
                                <div className='text-center mt-[50%]'>No Hires yet</div>
                            }
                        </div>
                    </div>
                    <div className='rounded-2xl bg-deepGreen min-h-96 h-full p-5 flex flex-col'>
                        <div className='h-1/6 flex justify-between items-center'>
                            <h3 className='text-white text-2xl'>Applications</h3>
                            <p className='text-medGray'>See All</p>
                        </div>
                        <div className='flex flex-col justify-between gap-2 flex-1'>
                            {
                                recentHires.map((spend,index) => (
                                    <div key={index} className='flex px-3 gap-1 items-center flex-1 bg-darkGray rounded-2xl'>

                                        <div className='flex-1 flex justify-center items-center'>
                                            <div className=' w-[90%] h-10 outline-none border-none flex justify-center items-center'><Image src={spend.pic} alt='pic' width={1000} height={1000} className='w-full h-full object-contain' /></div>
                                        </div>
                                        <div className='w-[70%]'>
                                            <div className='flex items-center gap-2'>
                                                <h3 className='text-white text-lg truncate'>{spend.name}</h3>
                                                <MdVerified className='text-[#0A75C2]'/>
                                            </div>
                                            <div className='flex gap-1 items-center text-medGray'>
                                                <p className='text-medGray'>{spend.desg}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats