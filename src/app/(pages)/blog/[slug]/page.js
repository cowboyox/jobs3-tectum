import React from 'react';

import Layout from '@/components/layout/Layout';
import { fixHTMLEntities, formatDate } from '@/utils/Helpers';

async function getData(slug) {
  try {
    const res = await fetch(`https://main.jobs3.io/wp-json/wp/v2/posts?_embed&slug=${slug}`);

    if (!res.ok) {
      throw new Error('Failed to fetch Post');
    }

    const post = await res.json();

    // const res2 = await fetch(
    // 	`https://main.jobs3.io/wp-json/wp/v2/tags?include=${post.tags.join(
    // 		","
    // 	)}`
    // );

    // if (!res2.ok) {
    // 	throw new Error("Failed to fetch Post");
    // }

    // const tags = await res2.json();

    return post;
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Error fetching Post" });
  }
}

const post = async ({ params }) => {
  const post = await getData(params.slug);

  return (
    <Layout>
      <div className='blog_page'>
        <img className='post_thumb' src={post[0]._embedded['wp:featuredmedia'][0].source_url} />
        <div className='blog_page_container'>
          <div className='post_info'>
            <h1>{fixHTMLEntities(post[0].title.rendered)}</h1>
            <div className='author_box'>
              <strong>{post[0]._embedded.author[0].name}</strong>
              <span>
                <span className='published'>Published:</span> {formatDate(post[0].date)}
              </span>
            </div>
            <div className='post_tags'>
              <div className='single_post_tag'>Web3</div>
              <div className='single_post_tag'>Crypto</div>
              <div className='single_post_tag'>Jobs3</div>
            </div>
          </div>
          <div
            className='blog_post_content'
            dangerouslySetInnerHTML={{
              __html: post[0].content.rendered,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default post;
