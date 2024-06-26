import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Helpers
import { formatDate, getReadTime } from '@/utils/Helpers';

const PostCard = ({ postItem, assetUrls, isBanner }) => {
  const post = postItem && postItem?.fields;
  const imageUrl = post?.postThumbnail?.sys?.id ? assetUrls[post?.postThumbnail.sys.id] : null;

  console.log(`Post: ${post?.title}, Image URL: ${imageUrl}`);

  return isBanner == true ? (
    <Link
      className='relative flex flex-col md:col-span-2'
      href={'/blog/' + post?.slug}
      scroll={false}
    >
      {imageUrl && (
        <Image
          className='h-[500px] w-full rounded-xl object-cover brightness-75 mobile:h-80'
          height={300}
          src={imageUrl}
          width={600}
        />
      )}
      <div className='gradient absolute bottom-0 left-0 z-10 -mt-6 flex w-full flex-col gap-4 bg-gradient-to-t from-[#000000c7] to-[transparent] p-8 mobile:p-4'>
        <div className='flex items-center gap-2'>
          <div className='text-[16px] text-white'>{formatDate(postItem?.sys.createdAt)}</div>
          <span className='text-[16px] text-white'>/</span>
          <div className='text-[16px] text-white'>
            <span>{getReadTime(postItem?.fields.postContent)} min to read</span>
          </div>
        </div>
        <h1 className='text-6xl font-bold mobile:text-2xl'>{postItem?.fields.title}</h1>
        <div className='mt-auto flex gap-3'>
          {postItem?.metadata.tags.map((tag) => (
            <div
              className='rounded-full border border-[#3E525B] bg-[#28373E] px-3 py-1 capitalize text-[#F5F5F5]'
              key={tag.sys.id}
            >
              {tag.sys.id}
            </div>
          ))}
        </div>
      </div>
    </Link>
  ) : (
    <Link className='flex flex-col' href={'/blog/' + post?.slug} scroll={false}>
      {imageUrl && (
        <Image
          className='h-64 w-full rounded-xl object-cover'
          height={300}
          src={imageUrl}
          width={600}
        />
      )}
      <div className='relative z-10 mx-auto -mt-6 flex h-full w-full max-w-5xl flex-col gap-4 rounded-xl bg-[#10191D] p-5'>
        <div className='flex items-center gap-2'>
          <div className='text-[16px] text-[#96B0BD]'>{formatDate(postItem?.sys.createdAt)}</div>
          <span className='text-[16px] text-[#96B0BD]'>/</span>
          <div className='text-[16px] text-[#96B0BD]'>
            <span>{getReadTime(postItem?.fields.postContent)} min to read</span>
          </div>
        </div>
        <h1 className='text-2xl font-bold'>{postItem?.fields.title}</h1>
        <div className='mt-auto flex gap-3'>
          {postItem?.metadata.tags.map((tag) => (
            <div
              className='rounded-full border border-[#3E525B] bg-[#28373E] px-3 py-1 capitalize text-[#F5F5F5]'
              key={tag.sys.id}
            >
              {tag.sys.id}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
