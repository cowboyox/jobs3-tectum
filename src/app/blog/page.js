import React from "react";

// Components
import Layout from "@/components/layout/Layout";
import PostsList from "@/components/pages/blog/PostsList";

async function getData() {
	try {
		const res = await fetch(
			`https://main.jobs3.io/wp-json/wp/v2/posts?_embed&per_page=8&orderby=id&order=desc`
		);

		if (!res.ok) {
			throw new Error("Failed to fetch Posts");
		}

		const posts = await res.json();
		return posts;
	} catch (error) {
		res.status(500).json({ error: "Error fetching Posts" });
	}
}

const blog = async () => {
	const posts = await getData();

	return (
		<Layout>
			<PostsList posts={posts} />
		</Layout>
	);
};

export default blog;
