'use client';
/* ------------ Libraries ------------ */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SplitType from 'split-type';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import gsap from 'gsap';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/* ------------ Icons ------------ */
import { TfiArrowTopRight } from "react-icons/tfi";
import Image from 'next/image';
import api from '@/utils/api';

const JobCard = ({ title, location, priceFrom, priceTo, paymentType }) => {
    function truncateString(str) {
        // Find the first comma's index
        const commaIndex = str.indexOf(',');
    
        // If a comma is found before 15 characters
        if (commaIndex > 0 && commaIndex < 15) {
          return str.substring(0, commaIndex) + '...';
        } 
        return str;
    }
    return (
        <div className='bg-[#10191D] rounded-2xl px-7 mobile:px-5 py-10 mobile:py-5 flex flex-col gap-10 mobile:gap-5 h-[420px] justify-between'>
            <h3 className='text-[48px] mobile:text-[44px] text-white font-bold txt_animate min-h-[205px] h-[180px] overflow-hidden flex items-center'>{title}</h3>
            <div className='flex flex-col gap-5'>
                <div className='block h-1 w-20 bg-[#1B272C]' />
                <div className='flex flex-col gap-5 mobile:gap-3'>
                    <div className='flex gap-2 items-center job-info'>
                        <Image src='/assets/icons/svgs/location.svg' height={30} width={30} alt='location' />
                        <span className='text-white text-base mobile:text-sm'>
                        <TooltipProvider>
                            <Tooltip>
                            <TooltipTrigger>
                                {truncateString(location !== '' ? location: "Anywhere")}
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{location !== ''? location: "Anywhere"}</p>
                            </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        </span>
                    </div>
                    <div className='flex gap-2 items-center job-info'>
                        <Image src='/assets/icons/svgs/receipt.svg' height={30} width={30} alt='location' />
                        <span className='text-white text-base mobile:text-sm'>
                            {paymentType ? `$${priceFrom} - ${priceTo}` : `$${priceFrom}`}
                            
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
const ExploreSection = () => {
    const [latestGigs, setLatestGigs] = useState([]);
    const ExploreRef = useRef(null);
    useLayoutEffect(() => {
        // Create GSAP animations
        let ctx = gsap.context(() => {
            // Animate Explore Heading
            SplitType.create('#explore-heading');
            gsap.from('#explore-heading .char', {
                y: 40,
                rotateX: 40,
                rotateY: -35,
                rotateZ: -15,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '#explore-heading',
                    start: 'top 70%',
                    end: 'center 30%',
                    scrub: 1
                },
            });

            SplitType.create('.job-card .txt_animate');
            gsap.from('.job-card .txt_animate .char', {
                x: 10,
                translateZ: 100,
                stagger: .02,
                duration: .03,
                opacity: 0,
                scrollTrigger: {
                    trigger: '.job-card .txt_animate',
                    start: 'top 80%',
                    end: 'bottom top',
                },
            });

            gsap.from('.job-card .job-info', {
                y: 10,
                translateZ: 100,
                duration: 1,
                opacity: 0,
                scrollTrigger: {
                    trigger: '.job-card .job-info',
                    start: 'top 80%',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, ExploreRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        api.get(`/api/v1/client_gig/get_latest_4gigs`).then((data) => {
            // console.log("++++++++ ", data.data.data)
            setLatestGigs(data.data.data);
        });
    }, [])

    return (
        <div className='relative py-10 overflow-hidden' ref={ExploreRef}>
            {/* --------------- Background ------------ */}
            <div className='bg-orange h-3/4 w-[98%] absolute top-0 left-[1%] rounded-xl z-0' />
            {/* --------------- Content --------------- */}
            <div className='container relative z-10'>
                <div className='w-full max-w-2xl ml-auto flex justify-end items-center gap-5 pr-10'>
                    <h2 className='font-bold text-9xl relative mobile:text-5xl' id='explore-heading'>Explore</h2>
                    <TfiArrowTopRight size={50} className='mobile:h-8' />
                </div>
            </div>
            <div className='block pl-10 pt-10 mobile:pl-5'>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1.2}
                    breakpoints={
                        {
                            768: {
                                slidesPerView: 3.5,
                                spaceBetween: 10,
                            },
                        }
                    }
                    className='!overflow-visible !flex'
                >
                    {
                        latestGigs?.length > 0 &&
                        latestGigs.map((item, index) => {
                            return <SwiperSlide key={index}>
                                <JobCard
                                    key={index}
                                    title={item.gigTitle}
                                    location={!item.location ? "Anywhere" : item.location}
                                    priceFrom={item.gigPaymentType ? item.minBudget : item.gigPrice} priceTo={item.maxBudget}
                                    paymentType={item.gigPaymentType}
                                />
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default ExploreSection
