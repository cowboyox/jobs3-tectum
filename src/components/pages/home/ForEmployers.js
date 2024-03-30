import React from "react";
import Image from "next/image";

const ForEmployers = () => {
	return (
		<div className="container rich_text_2">
			<div className="text_side">
				<h2>
					Perfect for <br /> <span>Emloyers</span>
				</h2>
				<p>The hiring solution made to grow your business</p>
			</div>
			<Image
				src={"/assets/images/logos_teamup/marketplace.svg"}
				width={500}
				height={500}
				alt=""
			/>
		</div>
	);
};

export default ForEmployers;
