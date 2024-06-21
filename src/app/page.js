import React from 'react';

// Components
import Layout from '@/components/layout/Layout';
import BlogPosts from '@/components/pages/home/BlogPosts';
import ByCategories from '@/components/pages/home/ByCategories';
import Companies from '@/components/pages/home/Companies';
import FeaturedJobs from '@/components/pages/home/FeaturedJobs';
import ForEmployers from '@/components/pages/home/ForEmployers';
import GetPaid from '@/components/pages/home/GetPaid';
import Hero from '@/components/pages/home/Hero';
import PostAJob from '@/components/pages/home/PostAJob';

export default function Home() {
  return (
    <Layout pageClass='home_page'>
      <Hero />
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
