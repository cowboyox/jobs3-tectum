import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Dependencies
import gsap from "gsap";

const Header = () => {
	const mobileMenu = useRef();

	const dropdownLink = useRef();
	const dropdownArrow = useRef();
	const [dropdownStatus, setDropdownStatus] = useState(false);

	const handleMenuClick = (status) => {
		if (status == true) {
			gsap.to(mobileMenu.current, {
				translateX: 0,
				duration: 0.5,
			});
		}

		if (status == false) {
			gsap.to(mobileMenu.current, {
				translateX: "-100%",
				duration: 0.5,
			});
		}
	};

	const toggleDropdown = () => {
		if (dropdownStatus == true) {
			gsap.to(dropdownLink.current, {
				height: "115px",
				duration: 0.6,
			});

			gsap.to(dropdownArrow.current, {
				rotate: "90deg",
				duration: 0.6,
			});
		}

		if (dropdownStatus == false) {
			gsap.to(dropdownLink.current, {
				height: "0",
				duration: 0.6,
			});

			gsap.to(dropdownArrow.current, {
				rotate: "0deg",
				duration: 0.6,
			});
		}

		setDropdownStatus(!dropdownStatus);
	};

	return (
		<>
			<header className="main_header">
				<div className="container">
					<Link href={"/"} className="main_logo">
						<Image
							src={"/assets/images/logo.svg"}
							width={133}
							height={50}
							alt="Jobs3"
						/>
					</Link>
					<button
						className="menu_bars"
						onClick={() => handleMenuClick(true)}
					>
						<Image
							src={"/assets/images/menu_icon.svg"}
							width={40}
							height={40}
							alt=""
						/>
					</button>
					<nav>
						<Link href={"/"}>HOME</Link>
						<Link href={"/jobs"}>JOBS</Link>
					</nav>
					<div className="right_side">
						<div className="dropdown-link">
							<Link href={"#"}>$THREE</Link>
							<ul>
								<li>
									<Link
										href={
											"https://three-3.gitbook.io/litepaper"
										}
										target="_blank"
									>
										LitePaper
									</Link>
								</li>
								<li>
									<Link href={"#"}>Tokenomics</Link>
								</li>
							</ul>
						</div>
						<Link href={"#"} className="btn_classified">
							Classified
						</Link>
					</div>
				</div>
			</header>

			<div className="mobile-menu" ref={mobileMenu}>
				<div className="mm-head">
					<button className="close-button" onClick={() => handleMenuClick(false)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="#fff"
							style={{ width: "20px" }}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18 18 6M6 6l12 12"
							/>
						</svg>
						<span>Close</span>
					</button>
				</div>
				<Link href={"/"}>HOME</Link>
				<Link href={"/jobs"}>JOBS</Link>
				<div className="dropdown-link-mobile">
					<Link
						href={"#"}
						className="dd-link"
						onClick={() => toggleDropdown()}
					>
						<span>$THREE</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							ref={dropdownArrow}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m8.25 4.5 7.5 7.5-7.5 7.5"
							/>
						</svg>
					</Link>
					<ul ref={dropdownLink}>
						<li>
							<Link
								href={"https://three-3.gitbook.io/litepaper"}
								target="_blank"
							>
								LitePaper
							</Link>
						</li>
						<li>
							<Link href={"#"}>Tokenomics</Link>
						</li>
					</ul>
				</div>
				<Link href={"#"} className="btn_classified">
					Classified
				</Link>
			</div>
		</>
	);
};

export default Header;
