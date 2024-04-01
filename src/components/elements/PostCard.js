import React from "react";
import Image from "next/image";
import Link from "next/link";

// Helpers
import { fixHTMLEntities, formatDate } from "@/utils/Helpers";

const PostCard = ({ post }) => {
	return (
		<Link href={"/blog/" + post.slug} scroll={false} className="single_post">
			<Image
				src={post._embedded["wp:featuredmedia"][0].source_url}
				width={350}
				height={150}
				alt=""
			/>
			<div className="post_details">
				<h3>{fixHTMLEntities(post.title.rendered)}</h3>
				<span>
          <span className="published">Published:</span> {formatDate(post.date)}
				</span>
			</div>
		</Link>
	);
};

export default PostCard;
