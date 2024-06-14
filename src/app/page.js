import React from "react";

// Components
import Layout from "@/components/layout/Layout";
import Hero from "@/components/pages/home/Hero";
import GetPaid from "@/components/pages/home/GetPaid";
import FeaturedJobs from "@/components/pages/home/FeaturedJobs";
import ByCategories from "@/components/pages/home/ByCategories";
import PostAJob from "@/components/pages/home/PostAJob";
import ForEmployers from "@/components/pages/home/ForEmployers";
import Companies from "@/components/pages/home/Companies";
import BlogPosts from "@/components/pages/home/BlogPosts";

export default function Home() {
  return (
    <Layout pageClass="home_page">
      <GetPaid />
      <FeaturedJobs />
      <ByCategories />
      <PostAJob />
      <ForEmployers />
      <Companies />
      <BlogPosts />
    </Layout>
  );
}
