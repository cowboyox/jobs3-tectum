"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Dependencies
import Marquee from "react-fast-marquee";

const Hero = () => {
	const router = useRouter();
	const [search, setSearch] = useState();

	const searchQuery = (e) => {
		e.preventDefault();
		router.push(`/jobs?search=${search}`);
	};

	return (
		<div className="hero_section-wrapper">
			<div className="hero_section">
				<div className="section_content">
					<Image
						src={"/assets/images/logo.svg"}
						width={209}
						height={53}
						alt="Jobs3"
					/>
					<h1>Your Web3 Career <span>Starts Here</span></h1>
					<p className="section_subtitle">Decentralising and globalising the employment landscape</p>
					<p className="version">2024 -V01</p>

					{/* <form onSubmit={(e) => searchQuery(e)}>
					<input
						type="text"
						placeholder="Search: Frontend developer, Marketing, Binance, etc."
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
							/>
						</svg>
					</button>
				</form> */}
					{/* <div className="sl_counters" >
					<div className="single_counter">
						<strong>20M+</strong>
						<span>users</span>
					</div>
					<div className="single_counter">
						<strong>500K+</strong>
						<span>jobs</span>
					</div>
					<div className="single_counter">
						<strong>100+</strong>
						<span>partners</span>
					</div>
				</div> */}
					{/* <Marquee className="sl_logos">
					<div className="logos-set">
						<Image
							src={"/assets/images/Partners/Partner-1.webp"}
							width={450}
							height={130}
							alt=""
						/>
						<Image
							src={"/assets/images/Partners/Partner-2.png"}
							width={450}
							height={130}
							alt=""
						/>
						<Image
							src={"/assets/images/Partners/Partner-3.png"}
							width={450}
							height={130}
							alt=""
						/>
						<Image
							src={"/assets/images/Partners/Partner-4.png"}
							width={450}
							height={130}
							alt=""
						/>
						<Image
							src={"/assets/images/Partners/Partner-5.png"}
							width={450}
							height={130}
							alt=""
						/>
					</div>
				</Marquee> */}
				</div>
			</div>
		</div>
	);
};

export default Hero;
