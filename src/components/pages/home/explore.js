'use client';
/* ------------ Libraries ------------ */
import React, { useLayoutEffect, useRef } from 'react';
import SplitType from 'split-type';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import gsap from 'gsap';

/* ------------ Icons ------------ */
import { TfiArrowTopRight } from "react-icons/tfi";
import Image from 'next/image'; 

const JobCard = ({ title, location, priceFrom, priceTo }) => {
    return (
        <div className='bg-[#10191D] rounded-2xl px-7 mobile:px-5 py-10 mobile:py-5 flex flex-col gap-10 mobile:gap-5 job-card'>
            <h3 className='text-6xl mobile:text-[44px] text-white font-bold txt_animate'>{title}</h3>
            <div className='block h-1 w-20 bg-[#1B272C]'></div>
            <div className='flex flex-col gap-5 mobile:gap-3'>
                <div className='flex gap-2 items-center job-info'>
                    <Image src='/assets/icons/svgs/location.svg' height={30} width={30} alt='location' />
                    <span className='text-white text-base mobile:text-sm'>
                        {location}
                    </span>
                </div>
                <div className='flex gap-2 items-center job-info'>
                    <Image src='/assets/icons/svgs/receipt.svg' height={30} width={30} alt='location' />
                    <span className='text-white text-base mobile:text-sm'>
                        ${priceFrom} - {priceTo}
                    </span>
                </div>
            </div>
        </div>
    )
}
const ExploreSection = () => {
    const ExploreRef = useRef(null);
    useLayoutEffect(() => {
        // Create GSAP animations
        let ctx = gsap.context(()=> {
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

        return ()=> ctx.revert();
    }, []);

    return (
        <div className='relative py-10 overflow-hidden' ref={ExploreRef}>
            {/* --------------- Background ------------ */}
            <div className='bg-orange h-3/4 w-[98%] absolute top-0 left-[1%] rounded-xl z-0'></div>
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
                    className='!overflow-visible'
                >
                    <SwiperSlide>
                        <JobCard 
                            title='Digital interface  for finance project'
                            location='London, United Kingdom'
                            priceFrom={21000} priceTo={36000}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <JobCard 
                            title='Digital interface  for finance project'
                            location='London, United Kingdom'
                            priceFrom={21000} priceTo={36000}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <JobCard 
                            title='Digital interface  for finance project'
                            location='London, United Kingdom'
                            priceFrom={21000} priceTo={36000}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <JobCard 
                            title='Digital interface  for finance project'
                            location='London, United Kingdom'
                            priceFrom={21000} priceTo={36000}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default ExploreSection
