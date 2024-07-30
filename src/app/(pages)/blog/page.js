'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Components
import Layout from '@/components/layout/Layout';
import PostsList from '@/components/pages/blog/PostsList';
import useFetchThis from '@/hooks/useFetchThis';

const Blog = () => {
  const contentfulConfig = useMemo(
    () => ({
      accessToken: '8Pyn9Y824lo8aUGkUzm2v2W5Rv8ROcAZs6jW_Q5asBg',
      baseUrl: 'https://cdn.contentful.com',
      environmentId: 'master',
      requiredContentType: 'jobs3Blog',
      spaceId: 'b4r65ixxe2is',
    }),
    []
  );

  const [blogPostsData, loading, error] = useFetchThis(
    `${contentfulConfig.baseUrl}/spaces/${contentfulConfig.spaceId}/environments/${contentfulConfig.environmentId}/entries?access_token=${contentfulConfig.accessToken}&content_type=${contentfulConfig.requiredContentType}`
  );
  const [assetUrls, setAssetUrls] = useState({});

  const fetchAssetUrl = useCallback(
    async (assetId) => {
      if (assetUrls[assetId]) {
        return assetUrls[assetId];
      }
      try {
        const response = await fetch(
          `${contentfulConfig.baseUrl}/spaces/${contentfulConfig.spaceId}/environments/${contentfulConfig.environmentId}/assets/${assetId}?access_token=${contentfulConfig.accessToken}`
        );
        const data = await response.json();
        const url = `https:${data.fields.file.url}`;
        setAssetUrls((prevState) => ({ ...prevState, [assetId]: url }));
        return url;
      } catch (error) {
        console.error('Failed to fetch asset:', error);
        return null;
      }
    },
    [assetUrls, contentfulConfig]
  );

  useEffect(() => {
    if (blogPostsData && blogPostsData.items) {
      blogPostsData.items.forEach((post) => {
        if (post.fields.postThumbnail && post.fields.postThumbnail.sys) {
          fetchAssetUrl(post.fields.postThumbnail.sys.id);
        }
      });
    }
  }, [blogPostsData, fetchAssetUrl]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>Could not load the Blog Posts! Try refreshing the page.</p>;

  return (
    <Layout>
      {blogPostsData && <PostsList assetUrls={assetUrls} posts={blogPostsData.items} />}
    </Layout>
  );
};

export default Blog;
