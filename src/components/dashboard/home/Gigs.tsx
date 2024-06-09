import Image from 'next/image';
import React from 'react'
import { GiLaurelCrown } from 'react-icons/gi'
import { MdVerified } from 'react-icons/md';
import { RiPoliceBadgeLine } from 'react-icons/ri'
import { TiLocationOutline } from "react-icons/ti";

const gigOptions = [
    "UI/UX",
    "Design",
    "Webdesign",
    "Webdesign",
    "Webdesign",
    "Webdesign",
    "Webdesign",
]

const gigs = [
    {
        title: "Front-End Developer",
        location: "Yogyakarta, Indonesia",
        rated: "Top Rated",
        jobSuccess: "96% Job Success",
        about: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
        skills: [
            "UI/UX",
            "Design",
            "Webdesign",
        ],
        pic: "/assets/dashboard-media/profilePic.png",
        name: "Deven Miles",
        desg: "Freelancer",
    },
    {
        title: "Front-End Developer",
        location: "Yogyakarta, Indonesia",
        rated: "Top Rated",
        jobSuccess: "96% Job Success",
        about: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
        skills: [
            "UI/UX",
            "Design",
            "Webdesign",
        ],
        pic: "/assets/dashboard-media/profilePic.png",
        name: "Deven Miles",
        desg: "Freelancer",
    },
    {
        title: "Front-End Developer",
        location: "Yogyakarta, Indonesia",
        rated: "Top Rated",
        jobSuccess: "96% Job Success",
        about: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
        skills: [
            "UI/UX",
            "Design",
            "Webdesign",
        ],
        pic: "/assets/dashboard-media/profilePic.png",
        name: "Deven Miles",
        desg: "Freelancer",
    },
    {
        title: "Front-End Developer",
        location: "Yogyakarta, Indonesia",
        rated: "Top Rated",
        jobSuccess: "96% Job Success",
        about: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
        skills: [
            "UI/UX",
            "Design",
            "Webdesign",
        ],
        pic: "/assets/dashboard-media/profilePic.png",
        name: "Deven Miles",
        desg: "Freelancer",
    },
    {
        title: "Front-End Developer",
        location: "Yogyakarta, Indonesia",
        rated: "Top Rated",
        jobSuccess: "96% Job Success",
        about: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
        skills: [
            "UI/UX",
            "Design",
            "Webdesign",
        ],
        pic: "/assets/dashboard-media/profilePic.png",
        name: "Deven Miles",
        desg: "Freelancer",
    },
    {
        title: "Front-End Developer",
        location: "Yogyakarta, Indonesia",
        rated: "Top Rated",
        jobSuccess: "96% Job Success",
        about: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
        skills: [
            "UI/UX",
            "Design",
            "Webdesign",
        ],
        pic: "/assets/dashboard-media/profilePic.png",
        name: "Deven Miles",
        desg: "Freelancer",
    },
    {
        title: "Front-End Developer",
        location: "Yogyakarta, Indonesia",
        rated: "Top Rated",
        jobSuccess: "96% Job Success",
        about: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
        skills: [
            "UI/UX",
            "Design",
            "Webdesign",
        ],
        pic: "/assets/dashboard-media/profilePic.png",
        name: "Deven Miles",
        desg: "Freelancer",
    },
    {
        title: "Front-End Developer",
        location: "Yogyakarta, Indonesia",
        rated: "Top Rated",
        jobSuccess: "96% Job Success",
        about: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
        skills: [
            "UI/UX",
            "Design",
            "Webdesign",
        ],
        pic: "/assets/dashboard-media/profilePic.png",
        name: "Deven Miles",
        desg: "Freelancer",
    },
    {
        title: "Front-End Developer",
        location: "Yogyakarta, Indonesia",
        rated: "Top Rated",
        jobSuccess: "96% Job Success",
        about: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
        skills: [
            "UI/UX",
            "Design",
            "Webdesign",
        ],
        pic: "/assets/dashboard-media/profilePic.png",
        name: "Deven Miles",
        desg: "Freelancer",
    },
]
const Gigs = () => {
    return (
        <div className='mt-10 flex flex-col gap-4'>
            <h1>
                Gigs you may like
            </h1>
            <div className='flex gap-2 items-center flex-wrap'>
                {
                    gigOptions.map((gig, index) => (
                        <div className={`${index === 0 ? "bg-orange" : "bg-darkGray"} cursor-pointer  py-1 px-2 text-center rounded-full border border-lightGray`} key={index}>
                            {gig}
                        </div>
                    ))
                }
            </div>
            <div className='flex flex-col gap-2'>
                {
                    gigs.map((gig, index) => (
                        <div key={index} className='bg-deepGreen px-5 flex flex-col gap-4 text-white rounded-2xl'>
                            <div className='py-5 border-b border-lightGray flex flex-col gap-3'>
                                <h1>
                                    {gig.title}
                                </h1>
                                <div className='flex  gap-4 flex-wrap'>
                                    <div className='flex gap-1 items-center'>
                                        <TiLocationOutline className='text-medGray text-xl' />
                                        <span>
                                            {
                                                gig.location
                                            }
                                        </span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <RiPoliceBadgeLine className='text-[#158FE8]' />
                                        <span>
                                            {gig.rated}
                                        </span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <GiLaurelCrown className='text-[#34E250]' />
                                        <span>{gig.jobSuccess}</span></div>
                                </div>
                            </div>
                            <p className='w-[80%] text-medGray'>
                                {gig.about}
                            </p>
                            <div className='flex gap-2 flex-wrap'>
                                {
                                    gig.skills.map((skill) => (
                                        <div className='bg-darkGray cursor-pointer py-1 px-2 text-center rounded-full border border-lightGray'>
                                            {skill}
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='flex flex-col gap-2 md:flex-row justify-between pb-5'>
                                <div className='flex gap-4 items-center flex-1'>
                                    <div className='w-10 flex justify-center items-center'>
                                        <div className=' w-[100%] h-10 outline-none border-none flex justify-center items-center'><Image src={gig.pic} alt='pic' width={1000} height={1000} className='w-full h-full object-contain' /></div>
                                    </div>
                                    <div className='flex-1'>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='text-white text-lg truncate'>{gig.name}</h3>
                                            <MdVerified className='text-[#0A75C2]' />
                                        </div>
                                        <div className='flex gap-1 items-center text-medGray'>
                                            <p className='text-medGray font-thin'>{gig.desg}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full md:w-56 h-14 md:h-auto flex justify-end items-center'>
                                    <div className='w-full flex gap-2 bg-darkGray h-full rounded-2xl'>
                                        <button className='flex-1'>Message</button>
                                        <button className='w-[55%] bg-orange'>Invite to Job</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='py-3 border border-lightGray rounded-2xl text-center cursor-pointer'>
                Load More +
            </div>
        </div>
    )
}

export default Gigs