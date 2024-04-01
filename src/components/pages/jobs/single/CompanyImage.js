"use client";

import React, { useEffect, useState } from "react";

// Dependencies
import { validateImage } from "image-validator";

const CompanyImage = ({ logo }) => {
	const [imageValid, setImageValid] = useState(false);

	const urlValidation = async (url) => {
		const isValidImage = await validateImage(url);
		if (isValidImage) {
			setImageValid(true);
		} else {
			setImageValid(false);
		}
	};

	useEffect(() => {
		let imageUrl = logo;
		urlValidation(imageUrl);
	}, [logo]);

	return logo != "" && imageValid === true ? (
		<div className="sl_job_img">
			<img src={logo} />
		</div>
	) : (
		<div className="sl_job_img">
			<img src="/assets/images/3-logo.webp" />
		</div>
	);
};

export default CompanyImage;
