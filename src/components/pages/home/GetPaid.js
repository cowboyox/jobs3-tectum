import React from "react";
import Image from "next/image";

const GetPaid = () => {
	return (
		<div className="container rich_text">
			<Image
				src={"/assets/images/logos/parts.svg"}
				width={500}
				height={500}
				alt=""
			/>
			<div className="text_side">
				<h2>
					Get Paid In <span>Crypto</span>
				</h2>
				<p>
					Enjoy the benefits of borderless, secure, and instant
					payments
				</p>
				<a href="#" className="cta_button">
					get started
				</a>
			</div>
		</div>
	);
};

export default GetPaid;
