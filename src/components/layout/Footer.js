import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<footer>
			<div className="email_subscribe">
				<p>
					Always get the <span>latest</span> information
				</p>
				<form>
					<input type="text" placeholder="Email Address" />
					<button>subscribe</button>
				</form>
			</div>
			<div className="footer_bottom">
				<Link href={"/"} className="footer_logo">
					<Image
						src={"/assets/images/logo.svg"}
						width={133}
						height={50}
						alt="Jobs3"
					/>
				</Link>
				<p className="footer_description">Find Us On Social Media:</p>
				<div className="social_icons">
					<a href={"#"} target="_blank" className="icon_circle">
						<Image
							src={
								"/assets/images/social_media/facebook.svg"
							}
							width={40}
							height={40}
							alt="Facebook"
						/>
					</a>
					<a href={"#"} target="_blank" className="icon_circle">
						<Image
							src={
								"/assets/images/social_media/twitter.svg"
							}
							width={40}
							height={40}
							alt="Twitter"
						/>
					</a>
					<a href={"#"} target="_blank" className="icon_circle">
						<Image
							src={
								"/assets/images/social_media/instagram.svg"
							}
							width={40}
							height={40}
							alt="Instageam"
						/>
					</a>
				</div>
				<hr />
				<p>Copyright © 2024</p>
			</div>
		</footer>
	);
};

export default Footer;
