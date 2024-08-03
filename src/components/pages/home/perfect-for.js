'use client';
import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Flip } from 'gsap/dist/Flip';
import SplitType from 'split-type';

// Register the Flip plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

/*------------- Icons -------------*/
import { TfiArrowTopRight } from 'react-icons/tfi';

const IsFor = ({ title, description, isDefault, link, image }) => {
  return (
    <div className='isFor relative flex flex-col gap-3 pl-16' data-link={link} data-image={image}>
      {isDefault && (
        <Link
          id='navigatable_link'
          href='#'
          className='absolute left-0 top-0 -ml-7 flex h-14 w-14 items-center justify-center rounded-full bg-orange mobile:-ml-0 mobile:h-10 mobile:w-10'
        >
          <TfiArrowTopRight fill='white' size={20} />
        </Link>
      )}
      <span className='text-4xl text-white'>{title}</span>
      <p
        className={
          'overflow-hidden text-base leading-normal text-[#96B0BD]' + (!isDefault ? ' h-0' : '')
        }
      >
        {description}
      </p>
    </div>
  );
};

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
              duration: 0.5,
            });
          });

          // Expand the hovered paragraph
          gsap.to(isFor.querySelector('p'), {
            height: 'auto',
            duration: 0.5,
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
                duration: 0.5,
              });
            },
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
        },
      });

      // Heading Animation
      SplitType.create('#perfect_for_heading');
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
          scrub: 1,
        },
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
          },
        });
      });
    }, PerfectForRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className='relative py-52 mobile:py-10' ref={PerfectForRef}>
      <div className='container relative z-20 flex flex-col gap-20'>
        <h2
          className='text-center text-[150px] font-bold text-white mobile:text-5xl'
          id='perfect_for_heading'
        >
          Perfect for
        </h2>
        <div className='flex w-full gap-20 mobile:flex-col mobile:gap-10'>
          <div className='relative h-[600px] w-1/2 mobile:h-[300px] mobile:w-full'>
            <div className='layer_effect absolute left-0 top-0 z-30 h-full w-full rounded-xl bg-[#28373E]' />
            <div className='layer_effect absolute left-0 top-0 z-20 h-full w-full rounded-xl bg-[#1B272C]' />
            <div className='layer_effect absolute left-0 top-0 z-10 h-full w-full rounded-xl bg-[#10191D]' />
            <img
              id='main_image'
              src='/assets/images/perfect-for-section-img-2.jpg'
              className='relative z-40 h-full w-full rounded-xl object-cover grayscale'
            />
          </div>
          <div className='flex w-1/2 flex-col gap-6 mobile:w-full'>
            <IsFor
              isDefault={true}
              title='Freelancers'
              description='Build your profile using our no-KYC ZKP on-chain profiles. Create your own gigs, develop your reputation, and earn in crypto. Leverage our Tri-Proof smart contracts to get paid securely.'
              link='/dashboard/freelancers'
              image='/assets/images/perfect-for-section-img-2.jpg'
            />
            <IsFor
              title='Clients'
              description='Looking for a particular service or freelancer? Use our powerful AI to find them, or publish a gig for freelancers to apply to. Then, when you have selected the best talent, use our Tri-Proof smart contract to pay them securely once the gig is complete.'
              link='/dashboard/clients'
              image='/assets/images/perfect-for-section-img-1.png'
            />
            <IsFor
              title='Employers'
              description='Ready to find your next hire? Use Jobs3 to find the best talent available. Our AI does the hard work for you. Simply input your requirements to get connected. Build a profile and attract quality candidates.'
              link='/dashboard/employers'
              image='/assets/images/perfect-for-section-img-3.jpg'
            />
            <IsFor
              title='Employees'
              description='What’s the next step in your career? With Jobs3, it could be just a few clicks away. Use our extensive network to link up with the leading companies in your space. Apply online in just a few steps.'
              link='/dashboard/employees'
              image='/assets/images/perfect-for-section-img-4.jpg'
            />
          </div>
        </div>
      </div>
      {/*----- Lighting -----*/}
      <div
        id='perfetFor-light-1'
        className='absolute bottom-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,_#00C2FF_0%,_#009EF6_100%)] blur-[150px]'
      />
    </div>
  );
};

export default PerfectFor;
