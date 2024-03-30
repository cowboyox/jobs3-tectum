import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/*--------- Hooks ---------*/
// import { usePopupFunctions } from '../hooks/popups';

const Header = () => {
	// const { openPopup, renderPopup } = usePopupFunctions();
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuClick = () => {
		setMenuOpen(!menuOpen); // Toggle the menu state
	};

	return (
		<header className="main_header">
			<div className="container">
				{/* {renderPopup()} */}
				<Link href={"/"} className="main_logo">
					<Image
						src={"/assets/images/logo.svg"}
						width={133}
						height={50}
						alt="Jobs3"
					/>
				</Link>
				{/* <LogoSVG className='main_logo' /> */}
				{/* <BarsSVG className='menu_bars' onClick={handleMenuClick} /> */}
				<nav className={menuOpen ? "open_menu" : ""}>
					<Link href={"/"}>HOME</Link>
					<Link href={"/jobs"}>JOBS</Link>
				</nav>
				<div className={`right_side ${menuOpen ? "open_menu" : ""}`}>
					{/* <button
					className="btn_sign_up"
					onClick={() => openPopup("SignUp")}
				>
					Sign Up
				</button> */}
					<Link href={"#"} className="btn_classified">
						Classified
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
