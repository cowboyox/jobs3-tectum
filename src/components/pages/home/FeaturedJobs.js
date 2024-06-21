'use client';

import React, { useEffect, useState } from 'react';
// Dependencies
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

// Components
import JobCard from '@/components/elements/JobCard';
// Util Components
import FetchThis from '@/utils/FetchThis';

// Skeleton Loading Styling
import 'react-loading-skeleton/dist/skeleton.css';

const FeaturedJobs = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [filterQuery, setFilterQuery] = useState('https://main.jobs3.io/wp-json/wp/v2/jobs');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const baseQuery = 'https://main.jobs3.io/wp-json/wp/v2/jobs';

    if (activeTab != 'recent') {
      let queryParams = `?search=${activeTab}`;
      setFilterQuery(baseQuery + queryParams);
    } else {
      setFilterQuery(baseQuery + '?orderby=date&order=desc');
    }
  }, [activeTab]);

  const { loading: loadingJobs, error: errorJobs, data: jobData } = FetchThis(filterQuery);

  return (
    <div className='jobs_section container'>
      <h2>
        Featured <span>Opportunities</span>
      </h2>
      <p>Get the fastest application so that your name is above other application</p>
      <div className='jobs_navigation'>
        <span
          className={`job_nav_item ${activeTab === 'recent' ? 'active' : ''}`}
          onClick={() => handleTabClick('recent')}
        >
          All Recent
        </span>
        <span
          className={`job_nav_item ${activeTab === 'finance' ? 'active' : ''}`}
          onClick={() => handleTabClick('finance')}
        >
          Finance
        </span>
        <span
          className={`job_nav_item ${activeTab === 'dev' ? 'active' : ''}`}
          onClick={() => handleTabClick('dev')}
        >
          Development
        </span>
        <span
          className={`job_nav_item ${activeTab === 'marketing' ? 'active' : ''}`}
          onClick={() => handleTabClick('marketing')}
        >
          Marketing
        </span>
        <span
          className={`job_nav_item ${activeTab === 'specialist' ? 'active' : ''}`}
          onClick={() => handleTabClick('specialist')}
        >
          Specialist
        </span>
      </div>

      {!loadingJobs && !errorJobs && jobData && Array.isArray(jobData) ? (
        <div className='job_content'>
          {jobData.slice(0, 6).map((job, index) => {
            return <JobCard job={job} key={index} />;
          })}
        </div>
      ) : (
        <SkeletonTheme baseColor='#202020' highlightColor='#444'>
          <div className='jobs-grid-loading-home'>
            <Skeleton count={6} height={354.5} />
          </div>
        </SkeletonTheme>
      )}
    </div>
  );
};

export default FeaturedJobs;
