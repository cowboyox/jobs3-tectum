'use client';
/*------------- Main libraries imports -------------*/
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import Link from 'next/link';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { useRouter } from 'next/navigation';

/*------------- ShadCN imports -------------*/
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/*------------- Icons -------------*/
import { TfiArrowTopRight } from 'react-icons/tfi';
import { CiSearch } from 'react-icons/ci';
import { VscRobot } from 'react-icons/vsc';

/*------------- String variables -------------*/
const mainHeadingStyle =
  'text-[170px] mobile:text-[50px] uppercase font-bold leading-none white-space-nowrap flex-nowrap';
const usersImages = [
  '/assets/images/users/landing-page-user-1.png',
  '/assets/images/users/landing-page-user-2.png',
  '/assets/images/users/landing-page-user-3.png',
  '/assets/images/users/landing-page-user-4.png',
  '/assets/images/users/landing-page-user-5.png',
];

const FloatingHeading = ({ moveSpeed, id }) => {
  /*------------- Mouse Animation -------------*/
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  const getTransformStyle = (x, y, factor) => {
    const offsetX = (x / window.innerWidth - 0.5) * factor;
    const offsetY = (y / window.innerHeight - 0.5) * factor;
    return {
      transform: `translate(${offsetX}px, ${offsetY}px)`,
    };
  };

  return (
    <div className='absolute left-1/2 top-1/2 -mt-6 w-full -translate-y-1/2 mobile:top-0 mobile:mt-0 mobile:-translate-y-0'>
      <div
        className='flex w-full flex-col gap-5'
        id={id}
        style={getTransformStyle(mousePosition.x, mousePosition.y, moveSpeed)}
      >
        <span className={mainHeadingStyle + ' text-white-border text-transparent opacity-20'}>
          {' '}
          Your WEB3{' '}
        </span>
        <span className={mainHeadingStyle + ' text-white-border text-transparent opacity-20'}>
          {' '}
          Career{' '}
        </span>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const heroRef = useRef(null);
  useLayoutEffect(() => {
    // Split Headings
    SplitType.create('#heading-1');
    SplitType.create('#heading-2');
    SplitType.create('#floating-heading-1 span');
    SplitType.create('#floating-heading-2 span');

    // Create GSAP animations
    let ctx = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline
        .from(['#light-1', '#light-2'], {
          duration: 0.6,
          opacity: 0,
          delay: 0.3,
        })
        .from('#heading-1 .char', {
          y: 100,
          opacity: 0,
          duration: 0.6,
          stagger: 0.03,
        })
        .from(['#heading-2 .char', '#floating-heading-1 span .char'], {
          x: 100,
          opacity: 0,
          duration: 0.6,
          stagger: 0.03,
        })
        .from('#floating-heading-2 span .char', {
          scale: 0.9,
          duration: 0.3,
          opacity: 0,
        })
        .from(['.user_0', '.user_1', '.user_2', '.user_3', '.user_4'], {
          x: -5,
          stagger: 0.2,
          duration: 0.4,
          opacity: 0,
        })
        .from('#user_arrow', {
          x: -5,
          opacity: 0,
        })
        .from('#search_bar', {
          y: 10,
          opacity: 0,
          duration: 0.4,
        })
        .from('#search_options', {
          x: -5,
          opacity: 0,
        })
        .from('#search_input', {
          x: -5,
          opacity: 0,
        })
        .from('#logos_slider', {
          y: 10,
          opacity: 0,
          duration: 0.4,
        });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const router = useRouter();
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('normal');

  const searchQuery = (e) => {
    e.preventDefault();
    window.location.href = `/jobs?search=${search}&type=${searchType}`
    // router.push(`/jobs?search=${search}&type=${searchType}`);
  };
  const onChangeType = (value) => {
    setSearchType(value);
  };
  return (
    <div
      className='relative flex min-h-screen w-full flex-col items-center justify-center gap-10 pb-14 pt-40'
      ref={heroRef}
    >
      <div className='container relative'>
        <div className='flex flex-col gap-5'>
          {/*----- Main headings -----*/}
          <h1 className={mainHeadingStyle + ' relative z-20 text-white'} id='heading-1'>
            Your WEB3
          </h1>
          <div className='relative z-20 flex justify-between mobile:flex-col mobile:gap-10'>
            <h1 className={mainHeadingStyle + ' text-white'} id='heading-2'>
              {' '}
              Career{' '}
            </h1>
            <div className='flex items-center mobile:pl-7'>
              {usersImages.map((userImage, index) => (
                <div
                  className='-ml-7 aspect-square h-24 w-24 transition-all hover:mr-7 mobile:h-auto mobile:w-full'
                  key={index}
                >
                  <Image
                    key={index}
                    src={userImage}
                    width={100}
                    height={100}
                    className={`h-full w-full rounded-full object-cover user_${index}`}
                  />
                </div>
              ))}
              <Link
                href='#'
                className='-ml-7 flex aspect-square h-24 w-24 items-center justify-center rounded-full bg-orange mobile:h-full mobile:w-full'
                id='user_arrow'
              >
                <TfiArrowTopRight fill='white' size={30} />
              </Link>
            </div>
          </div>
        </div>
        {/*----- Floating headings -----*/}
        <FloatingHeading moveSpeed={15} id='floating-heading-1' />
        <FloatingHeading moveSpeed={30} id='floating-heading-2' />
      </div>
      <div className='container'>
        {/*----- Search Bar -----*/}
        {/* Note : Keep ids to not mess the animations */}
        <div className='flex gap-5 mobile:gap-3 bg-[#f5f5f50d] p-5 mobile:p-2 rounded-2xl relative z-20' id='search_bar'>
          <Select default='classic' id='search_options' onValueChange={(e) => onChangeType(e)}>
            <SelectTrigger className='w-20 h-16 mobile:h-12 rounded-xl bg-[#1a272c]'>
              <SelectValue placeholder={<CiSearch size={25} />} />
            </SelectTrigger>
            <SelectContent className='rounded-xl bg-[#1a272c] p-2'>
              <SelectItem className='rounded' value='classic'>
                <CiSearch size={25} />
              </SelectItem>
              <SelectItem className='rounded' value='ai'>
                <VscRobot size={25} />
              </SelectItem>
            </SelectContent>
          </Select>
          <input 
            type='text' id='search_input'
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchQuery(e)
              }
            }}
            placeholder='Search: Frontend developer, Marketing, Binance, etc.'
            className='h-16 w-full border-none bg-transparent text-white outline-none mobile:h-12 mobile:text-sm'
          />
        </div>
      </div>
      <div className='mt-10 w-full' id='logos_slider'>
        <Marquee speed={20}>
          <div className='mr-16 flex w-full items-center gap-16'>
            <Image
              className='brightness-0 invert'
              height={30}
              src={'/assets/images/Partners/logo-1.svg'}
              width={100}
            />
            <Image
              className='brightness-0 invert'
              height={30}
              src={'/assets/images/Partners/logo-2.svg'}
              width={100}
            />
            <Image
              className='brightness-0 invert'
              height={30}
              src={'/assets/images/Partners/logo-3.svg'}
              width={100}
            />
            <Image
              className='brightness-0 invert'
              height={30}
              src={'/assets/images/Partners/logo-4.svg'}
              width={100}
            />
            <Image
              className='brightness-0 invert'
              height={30}
              src={'/assets/images/Partners/logo-5.svg'}
              width={100}
            />
            <Image
              className='brightness-0 invert'
              height={30}
              src={'/assets/images/Partners/logo-6.svg'}
              width={100}
            />
            <Image
              className='brightness-0 invert'
              height={30}
              src={'/assets/images/Partners/logo-7.png'}
              width={100}
            />
            <Image
              className='brightness-0 invert'
              height={30}
              src={'/assets/images/Partners/logo-8.png'}
              width={100}
            />
            <Image
              className='brightness-0 invert'
              height={30}
              src={'/assets/images/Partners/logo-9.png'}
              width={100}
            />
          </div>
        </Marquee>
      </div>
      {/*----- Lighting -----*/}
      <div
        id='light-1'
        className='mobile absolute bottom-1/4 left-1/2 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,_#00C2FF_0%,_#009EF6_100%)] blur-[150px] mobile:bottom-1/2 mobile:left-0 mobile:z-10 mobile:h-[423px] mobile:w-[423px]'
      />
      <div
        id='light-2'
        className='absolute right-0 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,_#DC4F13_0%,_#FF4C00_100%)] blur-[150px] mobile:z-0 mobile:h-[423px] mobile:w-[423px] mobile:translate-x-1/2'
      />
    </div>
  );
};

export default HeroSection;
