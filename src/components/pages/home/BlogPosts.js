import Image from "next/image";
import React from "react";

const BlogPosts = () => {
	const postsData = [
		{
			id: 0,
			postImage: "thumbnail_1",
			postTitle: "The Essential Guide to DeFi Taxes",
			postReadMinutes: 10,
			postDate: "Nov 23, 2022",
		},
		{
			id: 1,
			postImage: "thumbnail_2",
			postTitle: "How I became a Solidity Developer in 12 Months?",
			postReadMinutes: 10,
			postDate: "Nov 22, 2022",
		},
		{
			id: 2,
			postImage: "thumbnail_3",
			postTitle: "Web3 Developer Salary in 2022",
			postReadMinutes: 10,
			postDate: "May 9, 2022",
		},
		{
			id: 3,
			postImage: "thumbnail_4",
			postTitle: "How to invest in web3?",
			postReadMinutes: 7,
			postDate: "Apr 14, 2022",
		},
		{
			id: 4,
			postImage: "thumbnail_5",
			postTitle: "Top 10 Programming Languages to Write Smart Contract",
			postReadMinutes: 15,
			postDate: "Mar 29, 2022",
		},
		{
			id: 5,
			postImage: "thumbnail_6",
			postTitle: "How to Find and Join a DAO?",
			postReadMinutes: 5,
			postDate: "Mar 7, 2022",
		},
		{
			id: 6,
			postImage: "thumbnail_7",
			postTitle: "Complete Web3 Developer Roadmap - 2022",
			postReadMinutes: 10,
			postDate: "Feb 14, 2022",
		},
		{
			id: 7,
			postImage: "thumbnail_8",
			postTitle: "How to Find a Entry-Level Cryptocurrency Job?",
			postReadMinutes: 6,
			postDate: "Jan 23, 2022",
		},
	];

	return (
		<div className="container blog_posts_section">
			<h2>
				See Our <span>Blog</span>
			</h2>
			<p className="section_description">
				Articles on web3, remote work, guides, tutorials etc.
			</p>
			<div className="posts_container">
				{postsData.map((post, index) => (
					<div className="single_post" key={index}>
						<Image
							src={`/assets/images/posts_thumbnails/${post.postImage}.jpeg`}
							width={350}
							height={150}
							alt=""
						/>
						<div className="post_details">
							<h3>{post.postTitle}</h3>
							<span>
								{post.postReadMinutes} min read •{" "}
								{post.postDate}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BlogPosts;
