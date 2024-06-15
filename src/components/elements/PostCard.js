import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Helpers
import { fixHTMLEntities, formatDate } from '@/utils/Helpers';

const PostCard = ({ post }) => {
  return (
    <Link className='single_post' href={'/blog/' + post.slug} scroll={false}>
      <Image
        alt=''
        height={150}
        src={post._embedded['wp:featuredmedia'][0].source_url}
        width={350}
      />
      <div className='post_details'>
        <h3>{fixHTMLEntities(post.title.rendered)}</h3>
        <span>
          <span className='published'>Published:</span> {formatDate(post.date)}
        </span>
      </div>
    </Link>
  );
};

export default PostCard;
