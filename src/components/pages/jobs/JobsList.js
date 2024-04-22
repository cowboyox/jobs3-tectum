"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Dependencies
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroller";

// Util Components
import FetchThis from "@/utils/FetchThis";

// Components
import JobCard from "@/components/elements/JobCard";

// Helpers
import { manipulateIds } from "@/utils/Helpers";

// Skeleton Loading Styling
import "react-loading-skeleton/dist/skeleton.css";

const JobsList = () => {
	const searchParams = useSearchParams();

	const search = searchParams.get("search");
	const [keywords, setKeywords] = useState();
	const [searchWord, setSearchWord] = useState(search == null ? "" : search);

	const [selectedSectors, setSelectedSectors] = useState("");
	const [selectedJobStyle, setSelectedJobStyle] = useState("");
	const [selectedExperiences, setSelectedExperiences] = useState("");

	const [jobsLoadCount, setJobsLoadCount] = useState(12);
	const [jobsLoadPage, setJobsLoadPage] = useState(1);
	const [seeMoreCategories, setSeeMoreCategories] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const [filterQuery, setFilterQuery] = useState(
		"https://main.jobs3.io/wp-json/wp/v2/jobs?orderby=date&order=desc"
	);

	const searchJobs = (e) => {
		e.preventDefault();
		setSearchWord(keywords);
	};

	// Get Jobs
	const {
		loading: loadingJobs,
		error: errorJobs,
		data: dataJobs,
		count: jobsNumber,
	} = FetchThis(filterQuery);

	// Get Categories
	const {
		loading: loadingCategories,
		error: errorCategories,
		data: dataCategories,
	} = FetchThis(
		`https://main.jobs3.io/wp-json/wp/v2/sector?per_page=${
			seeMoreCategories ? "100" : "12"
		}`
	);

	// Get Experiences
	const {
		loading: loadingExperience,
		error: errorExperience,
		data: dataExperience,
	} = FetchThis(
		`https://main.jobs3.io/wp-json/wp/v2/experience-level?per_page=12`
	);

	// Sectors Filter
	const setSector = (id) => {
		let sectorIDs = manipulateIds(selectedSectors, id);
		setSelectedSectors(sectorIDs);
	};

	// Working Styles Filter
	const setWorkingStyle = (id) => {
		setSelectedJobStyle(id);
	};

	// Experiences Filter
	const setExperiences = (id) => {
		let experienceIDs = manipulateIds(selectedExperiences, id);
		setSelectedExperiences(experienceIDs);
	};

	// Filters Setup
	useEffect(() => {
		setFilterQuery(
			`https://main.jobs3.io/wp-json/wp/v2/jobs?${
				selectedSectors != "" ? `sector=${selectedSectors}&` : ""
			}${selectedJobStyle != "" ? `jobtype=${selectedJobStyle}&` : ""}${
				selectedExperiences != ""
					? `experience-level=${selectedExperiences}&`
					: ""
			}${
				searchWord != "" ? `search=${searchWord}&` : ""
			}orderby=date&order=desc&per_page=${jobsLoadCount}&page=${jobsLoadPage}`
		);
	}, [
		selectedSectors,
		selectedJobStyle,
		selectedExperiences,
		jobsLoadCount,
		jobsLoadPage,
		searchWord,
	]);

	// Load More Jobs
	const getMoreJobs = () => {
		if (dataJobs.length >= 200) {
			setHasMore(false);
			return;
		} else if (dataJobs.length < 12) {
			setHasMore(false);
			return;
		}

		setTimeout(() => {
			setJobsLoadCount(jobsLoadCount + 12);
			if (jobsLoadCount >= 100) {
				setJobsLoadCount(12) 
				setJobsLoadPage(jobsLoadPage + 1)
			} 
		}, 500);
	};

	return (
		<div className="container search_page">
			<h2>{!searchWord ? "Jobs" : searchWord + " : Jobs"}</h2>
			<p>
				This is a classifieds job board and therefore not subject to DAO
				governance. Exercise caution when evaluating job posts
			</p>
			<form
				onSubmit={(e) => {
					searchJobs(e);
				}}
			>
				<input
					type="text"
					placeholder="Search: Frontend developer, Marketing, Binance, etc."
					id="search_input"
					onChange={(e) => setKeywords(e.target.value)}
				/>
				<button className="search-btn">
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
			<div className="search_results_filter_container">
				<div className="filter_search_results">
					<div className="filter_box">
						<div className="filter_title">Job categories</div>
						<div className="filter_options">
							{!loadingCategories &&
							!errorCategories &&
							dataCategories ? (
								dataCategories.map((single_sector) => {
									return (
										<div
											className="filter_option"
											key={single_sector.id}
										>
											<input
												type="checkbox"
												data-field-id={single_sector.id}
												value={single_sector.id}
												onChange={(e) => {
													setSector(e.target.value);
												}}
												id={`category_${single_sector.id}`}
												name="category"
												data-filter-name="category"
											/>
											<label
												htmlFor={`category_${single_sector.id}`}
											>
												{single_sector.name}
											</label>
										</div>
									);
								})
							) : (
								<SkeletonTheme
									baseColor="#202020"
									highlightColor="#444"
								>
									<p className="filters-loading">
										<Skeleton count={12} />
									</p>
								</SkeletonTheme>
							)}
						</div>
						<button
							className="see_more_btn"
							onClick={() =>
								setSeeMoreCategories(!seeMoreCategories)
							}
						>
							{seeMoreCategories ? (
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
										d="M5 12h14"
									/>
								</svg>
							) : (
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
										d="M12 4.5v15m7.5-7.5h-15"
									/>
								</svg>
							)}
							<span>
								See {seeMoreCategories ? "Less" : "More"}
							</span>
						</button>
					</div>
					<div className="filter_box">
						<div className="filter_title">Working Style</div>
						<div className="filter_options">
							<div className="filter_option">
								<input
									type="radio"
									onChange={(e) => {
										setWorkingStyle(e.target.value);
									}}
									id={`working_style_inperson`}
									name="working_style"
									data-field-id={44}
									value={44}
									data-filter-name="working_style"
								/>
								<label htmlFor="working_style_inperson">
									In Person
								</label>
							</div>
							<div className="filter_option">
								<input
									type="radio"
									onChange={(e) => {
										setWorkingStyle(e.target.value);
									}}
									id={`working_style_remote`}
									name="working_style"
									data-field-id={40}
									value={40}
									data-filter-name="working_style"
								/>
								<label htmlFor="working_style_remote">
									Remote
								</label>
							</div>
						</div>
					</div>
					<div className="filter_box">
						<div className="filter_title">Experience</div>
						<div className="filter_options">
							{!loadingExperience &&
							!errorExperience &&
							dataExperience ? (
								dataExperience.map((single_experience) => {
									return (
										<div
											className="filter_option"
											key={single_experience.id}
										>
											<input
												type="radio"
												data-field-id={
													single_experience.id
												}
												onChange={(e) => {
													setExperiences(
														e.target.value
													);
												}}
												id={`experience_${single_experience.slug}`}
												name="experience_field"
												value={single_experience.id}
												data-filter-name="experience"
											/>
											<label
												htmlFor={`experience_${single_experience.slug}`}
											>
												{single_experience.name}
											</label>
										</div>
									);
								})
							) : (
								<SkeletonTheme
									baseColor="#202020"
									highlightColor="#444"
								>
									<p className="filters-loading">
										<Skeleton count={6} />
									</p>
								</SkeletonTheme>
							)}
						</div>
					</div>
					<div className="filter_box">
						<div className="filter_title">Job Type</div>
						<div className="filter_options">
							<div className="filter_option">
								<input
									type="radio"
									id="job_type_fulltime"
									name="job_type"
								/>
								<label htmlFor="job_type_fulltime">
									Full-Time
								</label>
							</div>
							<div className="filter_option">
								<input
									type="radio"
									id="job_type_parttime"
									name="job_type"
								/>
								<label htmlFor="job_type_parttime">
									Part-Time
								</label>
							</div>
							<div className="filter_option">
								<input
									type="radio"
									id="job_type_contract"
									name="job_type"
								/>
								<label htmlFor="job_type_contract">
									Contract
								</label>
							</div>
							<div className="filter_option">
								<input
									type="radio"
									id="job_type_freelance"
									name="job_type"
								/>
								<label htmlFor="job_type_freelance">
									Freelance
								</label>
							</div>
							<div className="filter_option">
								<input
									type="radio"
									id="job_type_volunteer"
									name="job_type"
								/>
								<label htmlFor="job_type_volunteer">
									Volunteer
								</label>
							</div>
							<div className="filter_option">
								<input
									type="radio"
									id="job_type_internship"
									name="job_type"
								/>
								<label htmlFor="job_type_internship">
									Internship
								</label>
							</div>
						</div>
					</div>
					<div className="filter_box">
						<div className="filter_title">Pay</div>
						<div className="filter_options">
							<div className="filter_option">
								<input type="radio" id="pay_25000" name="pay" />
								<label htmlFor="pay_25000">$25,000+</label>
							</div>
							<div className="filter_option">
								<input type="radio" id="pay_35000" name="pay" />
								<label htmlFor="pay_35000">$35,000+</label>
							</div>
							<div className="filter_option">
								<input type="radio" id="pay_45000" name="pay" />
								<label htmlFor="pay_45000">$45,000+</label>
							</div>
							<div className="filter_option">
								<input type="radio" id="pay_55000" name="pay" />
								<label htmlFor="pay_55000">$55,000+</label>
							</div>
						</div>
					</div>
					<div className="filter_box">
						<div className="filter_title">Date Posted</div>
						<div className="filter_options">
							<div className="filter_option">
								<input
									type="radio"
									id="date_last3days"
									name="date_posted"
								/>
								<label htmlFor="date_last3days">
									Last 3 days
								</label>
							</div>
							<div className="filter_option">
								<input
									type="radio"
									id="date_last24hours"
									name="date_posted"
								/>
								<label htmlFor="date_last24hours">
									Last 24 hours
								</label>
							</div>
							<div className="filter_option">
								<input
									type="radio"
									id="date_last7days"
									name="date_posted"
								/>
								<label htmlFor="date_last7days">
									Last 7 days
								</label>
							</div>
							<div className="filter_option">
								<input
									type="radio"
									id="date_last2weeks"
									name="date_posted"
								/>
								<label htmlFor="date_last2weeks">
									Last 2 weeks
								</label>
							</div>
							<div className="filter_option">
								<input
									type="radio"
									id="date_lastmonth"
									name="date_posted"
								/>
								<label htmlFor="date_lastmonth">
									Last month
								</label>
							</div>
						</div>
					</div>
				</div>
				{!loadingJobs &&
				!errorJobs &&
				dataJobs &&
				Array.isArray(dataJobs) ? (
					<div className="all_search_results">
						<div className="search_results_con">
							<div className="search_results_top">
								<div className="jobs_found_num">
									{jobsNumber} Jobs Found
								</div>
								{jobsNumber == 0 && (
									<div className="sorry_message">
										<p>
											No Record Sorry! Does ot match
											record with your keyword. Change
											your filter keyword to re-submit OR{" "}
										</p>
										<div className="reset_filter">
											Reset Filters
										</div>
									</div>
								)}
								<div className="email_me_form">
									<div className="email_me_title">
										Email Me New Jobs
									</div>
									<form action="">
										<div className="form_top">
											<input
												type="text"
												placeholder="Job Alert Name..."
											/>
											<input
												type="email"
												placeholder="Email"
											/>
											<button type="submit">
												Create Alert
											</button>
										</div>
										<div className="form_checkboxes">
											<div className="single_check">
												<input
													type="checkbox"
													name="send_email"
													id="daily"
												/>
												<label htmlFor="daily">
													Daily
												</label>
											</div>
											<div className="single_check">
												<input
													type="checkbox"
													name="send_email"
													id="weekly"
												/>
												<label htmlFor="weekly">
													Weekly
												</label>
											</div>
											<div className="single_check">
												<input
													type="checkbox"
													name="send_email"
													id="fortnightly"
												/>
												<label htmlFor="fortnightly">
													Fortnightly
												</label>
											</div>
											<div className="single_check">
												<input
													type="checkbox"
													name="send_email"
													id="monthly"
												/>
												<label htmlFor="monthly">
													Monthly
												</label>
											</div>
										</div>
									</form>
								</div>
							</div>
							<div className="search_results_wrapper">
								<InfiniteScroll
									pageStart={0}
									loadMore={getMoreJobs}
									hasMore={true || false}
									threshold={200}
									loader={
										hasMore && (
											<div className="!text-sm" key={0}>
												Loading ...
											</div>
										)
									}
								>
									{dataJobs.map((job, index) => {
										return (
											<JobCard key={index} job={job} />
										);
									})}
								</InfiniteScroll>
							</div>
						</div>
					</div>
				) : (
					<div className="all_search_results">
						<SkeletonTheme
							baseColor="#202020"
							highlightColor="#444"
						>
							<div className="jobs-header-loading">
								<Skeleton height={32} />
								<Skeleton height={186} />
							</div>
							<div className="jobs-grid-loading">
								<Skeleton count={jobsLoadCount} height={350} />
							</div>
						</SkeletonTheme>
					</div>
				)}
			</div>
		</div>
	);
};

export default JobsList;
