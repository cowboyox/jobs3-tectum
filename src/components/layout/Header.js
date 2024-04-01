import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuClick = () => {
		setMenuOpen(!menuOpen);
	};

	return (
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
				<button className="menu_bars" onClick={() => handleMenuClick()}>
					<Image
						src={"/assets/images/menu_icon.svg"}
						width={40}
						height={40}
						alt=""
					/>
				</button>
				<nav className={menuOpen ? "open_menu" : ""}>
					<Link href={"/"}>HOME</Link>
					<Link href={"/jobs"}>JOBS</Link>
					<div className="dropdown-link-mobile">
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
				</nav>
				<div className={`right_side ${menuOpen ? "open_menu" : ""}`}>
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
	);
};

export default Header;
