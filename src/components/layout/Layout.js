"use client";

import React from "react";
const { useRef } = React;

// Dependencies
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import SplitText from "gsap/SplitText";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

// Components
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, pageClass }) => {
	// Register GSAP Plugins
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

	// ScrollSmoother Refs
	const $wrapper = useRef();
	const $content = useRef();

	useGSAP(
		() => {
			if (ScrollTrigger.isTouch !== 1) {
				let smoother = ScrollSmoother.create({
					wrapper: $wrapper.current,
					content: $content.current,
					smooth: 1.5,
					smoothTouch: 0,
					effects: ScrollTrigger.isTouch === 1 ? false : true,
					preventDefault: true,
					normalizeScroll: { allowNestedScroll: true },
					ignoreMobileResize: true,
				});

				smoother.effects(".img-parallax", {
					speed: "auto",
				});

				smoother.scrollTop(0);

				return () => smoother.kill();
			}
		},
		{ scope: $wrapper },
		[]
	);

	useGSAP(() => {
		let ctx = gsap.context(() => {
			const splitParagraph = SplitText.create(".primary-heading", {
				type: "words, chars",
				wordsClass: "word",
			});

			splitParagraph.words.forEach((word) => {
				gsap.fromTo(
					word,
					{
						transformOrigin: "0% 50%",
						rotate: 2,
					},
					{
						ease: "none",
						rotate: 0,
						scrollTrigger: {
							trigger: word,
							start: "-50% 80%",
							end: "bottom 55%",
							scrub: true,
						},
					}
				);

				gsap.fromTo(
					word,
					{
						"will-change": "opacity",
						opacity: 0.1,
					},
					{
						ease: "none",
						opacity: 1,
						stagger: 0.05,
						scrollTrigger: {
							trigger: word,
							start: "-50% 80%",
							end: "bottom 55%",
							scrub: true,
						},
					}
				);
			});

			gsap.from(".fade-in", {
				opacity: 0,
				translateY: 30,
				duration: 1,
				scrollTrigger: {
					trigger: ".fade-in",
					scrub: true,
				},
			});
		}, $content.current);

		return () => ctx.revert();
	}, []);

	return (
		<>
			<ProgressBar
				height="4px"
				color="#dc4f14"
				options={{ showSpinner: false }}
				shallowRouting
			/>
			<div ref={$wrapper}>
				<div ref={$content} className={pageClass}>
					<Header />
					{children}
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Layout;
