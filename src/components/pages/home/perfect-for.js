'use client';
import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Flip } from 'gsap/dist/Flip';
import SplitType from 'split-type';

// Register the Flip plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

/*------------- Icons -------------*/
import { TfiArrowTopRight } from "react-icons/tfi";

const IsFor = ({ title, description, isDefault, link, image }) => {
  return (
    <div 
      className="isFor flex flex-col gap-3 pl-16 relative"
      data-link={link}
      data-image={image}
    >
      {isDefault && (
        <Link 
          id="navigatable_link"
          href='#' 
          className='h-14 w-14 bg-orange rounded-full -ml-7 flex items-center justify-center absolute top-0 left-0'
        >
          <TfiArrowTopRight fill='white' size={20} />
        </Link>       
      )}
      <span className="text-white text-4xl">{title}</span>
      <p className={
        'text-[#96B0BD] text-base leading-normal overflow-hidden'
        + (!isDefault ? ' h-0' : '')
      }>
        {description}
      </p>
    </div>
  )
}

const PerfectFor = () => {
  const PerfectForRef = useRef(null);

  useLayoutEffect(() => { 
    let ctx = gsap.context(() => {
      // IsFor Animations
      const isFors = document.querySelectorAll('.isFor');
      const navigatable_link = document.getElementById('navigatable_link');
      isFors.forEach((isFor) => {
        isFor.addEventListener('mouseenter', () => {
          // Collapse all paragraphs
          isFors.forEach((isForElm) => {
            gsap.to(isForElm.querySelector('p'), {
              height: 0, 
              duration: 0.5
            });
          });

          // Expand the hovered paragraph
          gsap.to(isFor.querySelector('p'), {
            height: 'auto', 
            duration: 0.5
          });

          // Move the navigatable link to the hovered paragraph
          const flipState = Flip.getState([navigatable_link]);
          isFor.appendChild(navigatable_link);
          Flip.from(flipState, { duration: 0.5 });

          // Set the link
          const data_link = isFor.getAttribute('data-link');
          navigatable_link.setAttribute('href', data_link);

          // Animate Image
          const data_image = isFor.getAttribute('data-image');
          const main_image = document.getElementById('main_image');
          main_image.setAttribute('src', data_image);
          gsap.to('#main_image', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              gsap.to('#main_image', {
                opacity: 1,
                duration: 0.5
              });
            }
          });
        });
      });

      // Lighting Animation
      gsap.from('#perfetFor-light-1', {
        duration: 1,
        scale: 0,
        opacity: 0,
        scrollTrigger: {
          trigger: '#perfetFor-light-1',
          start: 'top bottom',
          end: 'bottom 50%',
          scrub: 1,
        } 
      });

      // Heading Animation
      SplitType.create("#perfect_for_heading");
      gsap.from('#perfect_for_heading .char', {
        x: -100,
        rotateX: 40,
        rotateY: -35,
        rotateZ: -15,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '#perfect_for_heading',
          start: 'top bottom',
          end: 'bottom 50%',
          scrub: 1
        } 
      });

      // Layer Effects come up as user scrolls
      const layer_effects = document.querySelectorAll('.layer_effect');
      layer_effects.forEach((layer_effect, index) => {
        gsap.to(layer_effect, {
          duration: 1,
          y: (index + 1) * -15, 
          scrollTrigger: {
            trigger: layer_effect,
            start: 'top bottom',
            end: 'top 50%',
            scrub: 1,
          } 
        });
      });
    }, PerfectForRef);

    return ()=> ctx.revert();
  }, []);

  return (
    <div className="py-52 relative" ref={PerfectForRef}>
      <div className="container flex flex-col gap-20 relative z-20">
        <h2 className="text-white text-[150px] font-bold text-center" id="perfect_for_heading">Perfect for</h2>
        <div className="flex gap-20 w-full">
          <div className="relative w-1/2 h-[600px]">
            <div className='layer_effect absolute top-0 left-0 h-full w-full rounded-xl bg-[#28373E] z-30'></div>
            <div className='layer_effect absolute top-0 left-0 h-full w-full rounded-xl bg-[#1B272C] z-20'></div>
            <div className='layer_effect absolute top-0 left-0 h-full w-full rounded-xl bg-[#10191D] z-10'></div>
            <img 
              id='main_image'
              src='/assets/images/perfect-for-section-img-2.jpg'
              className="relative object-cover rounded-xl h-full w-full grayscale z-40"
            />
          </div>
          <div className="flex flex-col gap-6 w-1/2">
            <IsFor 
              isDefault={true}
              title="Freelancers"
              description="But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system,"
              link="/dashboard/freelancers"
              image="/assets/images/perfect-for-section-img-2.jpg"
            />
            <IsFor 
              title="Clients"
              description="Here goes Clients text"
              link= "/dashboard/clients"
              image="/assets/images/perfect-for-section-img-1.png"
            />
            <IsFor 
              title="Employers"
              description="Here goes Employers text"
              link="/dashboard/employers"
              image="/assets/images/perfect-for-section-img-3.jpg"
            />
            <IsFor 
              title="Employees"
              description="Here goes Employees text"
              link="/dashboard/employees"
              image="/assets/images/perfect-for-section-img-4.jpg"
            />
          </div>
        </div>
      </div>
      {/*----- Lighting -----*/}
      <div id="perfetFor-light-1" className='
        rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,_#00C2FF_0%,_#009EF6_100%)] blur-[150px]
        h-[400px] w-[400px]
        absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2
      '/>
    </div>
  )
}

export default PerfectFor;
