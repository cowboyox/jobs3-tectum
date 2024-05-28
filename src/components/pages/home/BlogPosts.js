"use client";

import React from "react";

// Dependencies
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// Components
import PostCard from "@/components/elements/PostCard";

// Util Components
import FetchThis from "@/utils/FetchThis";

// Skeleton Loading Styling
import "react-loading-skeleton/dist/skeleton.css";

const BlogPosts = () => {
	const {
		loading: loadingPosts,
		error: errorPosts,
		data: postsData,
	} = FetchThis(
		"https://main.jobs3.io/wp-json/wp/v2/posts?_embed&per_page=8&orderby=id&order=desc"
	);

	return (
		<div className="container blog_posts_section">
			<h2>
				See Our <span>Blog</span>
			</h2>
			<p className="section_description">
				Articles on web3, remote work, guides, tutorials etc.
			</p>
			{!loadingPosts &&
			!errorPosts &&
			postsData &&
			Array.isArray(postsData) ? (
				<div className="posts_container">
					{postsData.slice(0, 8).map((post, index) => (
						<PostCard key={index} post={post} />
					))}
				</div>
			) : (
				<SkeletonTheme baseColor="#202020" highlightColor="#444">
					<div className="posts-grid-loading-home">
						<Skeleton count={8} height={268} />
					</div>
				</SkeletonTheme>
			)}
		</div>
	);
};

export default BlogPosts;
