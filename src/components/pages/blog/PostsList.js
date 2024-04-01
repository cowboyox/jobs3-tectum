import React from "react";

// Components
import PostCard from "@/components/elements/PostCard";

const PostsList = ({ posts }) => {
	return (
		<div className="container blog_page">
			<h2>
				Jobs3 <span>Blog</span>
			</h2>
			<p>Stay up-to-date with our newsletter and what we are up to!</p>

			<div className="posts_container">
				{posts.map((post, index) => (
					<PostCard key={index} post={post} />
				))}
			</div>
		</div>
	);
};

export default PostsList;
