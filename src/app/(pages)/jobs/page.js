import React, { Suspense } from 'react';

// Components
import Layout from '@/components/layout/Layout';
import JobsList from '@/components/pages/jobs/JobsList';

const jobs = async () => {
  return (
    <Layout>
      <Suspense fallback={null}>
        <JobsList />
      </Suspense>
    </Layout>
  );
};

export default jobs;
