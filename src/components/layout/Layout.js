'use client';

// Dependencies
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import React, { useRef } from 'react';

// Components
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, pageClass }) => {
  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

  // ScrollSmoother Refs
  const $wrapper = useRef();
  const $content = useRef();

  // Temporarily disabled smooth scrolling to avoid lagging
  // useGSAP(
  // 	() => {
  // 		if (ScrollTrigger.isTouch !== 1) ) {
  // 			let smoother = ScrollSmoother.create({
  // 				wrapper: $wrapper.current,
  // 				content: $content.current,
  // 				smooth: 1.5,
  // 				smoothTouch: 0,
  // 				effects: ScrollTrigger.isTouch === 1 ? false : true,
  // 				preventDefault: true,
  // 				normalizeScroll: { allowNestedScroll: true },
  // 				ignoreMobileResize: true,
  // 			});

  // 			smoother.effects(".img-parallax", {
  // 				speed: "auto",
  // 			});

  // 			smoother.scrollTop(0);

  // 			return () => smoother.kill();
  // 		}
  // 	},
  // 	{ scope: $wrapper },
  // 	[]
  // );

  useGSAP(() => {
    let ctx = gsap.context(() => {
      const splitParagraph = SplitText.create('.primary-heading', {
        type: 'words, chars',
        wordsClass: 'word',
      });

      splitParagraph.words.forEach((word) => {
        gsap.fromTo(
          word,
          {
            rotate: 2,
            transformOrigin: '0% 50%',
          },
          {
            ease: 'none',
            rotate: 0,
            scrollTrigger: {
              end: 'bottom 55%',
              scrub: true,
              start: '-50% 80%',
              trigger: word,
            },
          }
        );

        gsap.fromTo(
          word,
          {
            opacity: 0.1,
            'will-change': 'opacity',
          },
          {
            ease: 'none',
            opacity: 1,
            scrollTrigger: {
              end: 'bottom 55%',
              scrub: true,
              start: '-50% 80%',
              trigger: word,
            },
            stagger: 0.05,
          }
        );
      });

      gsap.from('.fade-in', {
        duration: 1,
        opacity: 0,
        scrollTrigger: {
          scrub: true,
          trigger: '.fade-in',
        },
        translateY: 30,
      });
    }, $content.current);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <ProgressBar color='#dc4f14' height='4px' options={{ showSpinner: false }} shallowRouting />
      <div ref={$wrapper}>
        <div className={pageClass} ref={$content}>
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
