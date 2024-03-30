import React from "react";
import Image from "next/image";

const Companies = () => {
	return (
		<div className="container sl_companies">
			<h2>
				Team up with the most forward <span>thinking companies</span>
			</h2>
			<div className="companies_logos">
				<Image
					src={"/assets/images/logos_teamup/shopify.svg"}
					width={190}
					height={100}
					alt=""
				/>
				<Image
					src={"/assets/images/logos_teamup/opentable.svg"}
					width={250}
					height={100}
					alt=""
				/>
				<Image
					src={"/assets/images/logos_teamup/amazon.svg"}
					width={250}
					height={100}
					alt=""
				/>
				<Image
					src={"/assets/images/logos_teamup/slack.svg"}
					width={190}
					height={100}
					alt=""
				/>
			</div>
		</div>
	);
};

export default Companies;
