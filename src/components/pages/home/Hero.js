"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'

const Hero = () => {
	const router = useRouter()

	const [search, setSearch] = useState();

	const searchQuery = (e) => {
		e.preventDefault();
		
		router.push(`/jobs?search=${search}`);
	}

	return (
		<div className="hero_section">
			<div className="section_content">
				<h1>YOUR WEB3 CAREER STARTS HERE</h1>
				<p>Decentralising and globalising the employment landscape</p>
				<form onSubmit={(e) => searchQuery(e)}>
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
				</form>
				<div className="sl_counters">
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
				</div>
				<div className="sl_logos">
					<Image
						src={"/assets/images/logos/logo_1.svg"}
						width={100}
						height={50}
						alt=""
					/>
					<Image
						src={"/assets/images/logos/logo_2.svg"}
						width={100}
						height={50}
						alt=""
					/>
					<Image
						src={"/assets/images/logos/logo_3.svg"}
						width={100}
						height={50}
						alt=""
					/>
					<Image
						src={"/assets/images/logos/logo_4.svg"}
						width={100}
						height={50}
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
