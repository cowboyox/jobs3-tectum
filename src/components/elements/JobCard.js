import React, { useEffect, useState } from "react";
import Link from "next/link";

// Dependencies
import { validateImage } from "image-validator";

// Helpers
import { fixHTMLEntities, timeSincePublication } from "@/utils/Helpers";

const JobCard = ({ job }) => {
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
		let imageUrl = job._gofj_company_logo;
		urlValidation(imageUrl);
	}, [job._gofj_company_logo]);

	return (
		<div className="job_card">
			<div className="job_body">
				<div className="job_tags">
					{job.jobsearch_field_location_address != "" && (
						<div className="sl_job_tag">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
								/>
							</svg>
							<span>{job.jobsearch_field_location_address}</span>
						</div>
					)}
					{job.working_hours != "Fulltime" ? (
						<div className="sl_job_tag">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
							<span>Fulltime</span>
						</div>
					) : (
						<div className="sl_job_tag">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
							<span>{job.working_hours}</span>
						</div>
					)}
					{job.acf.sl_job_views != "" && (
						<div className="sl_job_tag">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
								/>
							</svg>
							<span>{job.acf.sl_job_views} Views</span>
						</div>
					)}
				</div>
				<div className="job_details">
					<div className="job_info">
						<h3 className="job_title">
							{fixHTMLEntities(job.title.rendered)}
						</h3>
					</div>
					<p className="job_date">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
							/>
						</svg>
						<span>
							Published{" "}
							{timeSincePublication(
								job.jobsearch_field_job_publish_date
							)}
						</span>
					</p>
				</div>
			</div>
			<div className="card_footer">
				<Link href={"/jobs/" + job.slug} className="view_details">
					View Details
				</Link>
				<div className="job_company_info">
					<p className="job_company_name">{job._gofj_company}</p>
					{job._gofj_company_logo != "" && imageValid === true ? (
						<div className="job_image">
							<img src={job._gofj_company_logo} />
						</div>
					) : (
						<div className="job_image">
							<img src="/assets/images/3-logo.webp" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default JobCard;
