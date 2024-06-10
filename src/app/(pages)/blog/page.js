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
        console.error("Error fetching Posts:", error);
        return null;
    }
}

const Blog = async () => {
    const posts = await getData();

    return (
        <Layout>
            {posts ? (
                <PostsList posts={posts} />
            ) : (
                <div className="min-h-screen flex items-center justify-center">
					Error fetching posts. Please try again later.
				</div>
            )}
        </Layout>
    );
};

export default Blog;