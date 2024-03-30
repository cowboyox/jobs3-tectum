import Layout from "@/components/layout/Layout";
import React from "react";

async function getData(slug) {
	try {
		const res = await fetch(
			`https://main.jobs3.io/wp-json/wp/v2/jobs?slug=${slug}`
		);

		if (!res.ok) {
			throw new Error("Failed to fetch Job");
		}

		const job = await res.json();
		return job;
	} catch (error) {
		res.status(500).json({ error: "Error fetching Job" });
	}
}

const page = async ({ params }) => {
	const job = await getData(params.slug);

	return (
		<Layout>
			<section></section>
		</Layout>
	);
};

export default page;
