import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Helpers
import { fixHTMLEntities, formatDate, getReadTime } from '@/utils/Helpers'; 

const PostCard = ({ postItem, assetUrls, isBanner }) => { 
  const post = postItem && postItem.fields;
  const imageUrl = post?.postThumbnail?.sys?.id ? assetUrls[post.postThumbnail.sys.id] : null;

  console.log(`Post: ${post.title}, Image URL: ${imageUrl}`);

  return (
    isBanner == true ? ( 
      <Link className='relative flex flex-col md:col-span-2' href={'/blog/' + post.slug} scroll={false}>
        {imageUrl && (
          <Image 
            height={300}
            src={imageUrl}
            width={600}
            className='w-full rounded-xl h-[500px] object-cover brightness-75 mobile:h-80'
          />
        )}
        <div className="absolute bottom-0 left-0 p-8 mobile:p-4 w-full z-10 flex flex-col gap-4 -mt-6 gradient bg-gradient-to-t from-[#000000c7] to-[transparent]">
          <div className="flex items-center gap-2">
            <div className="text-white text-[16px]">
              {formatDate(postItem.sys.createdAt)}
            </div>
            <span className="text-white text-[16px]">/</span>
            <div className="text-white text-[16px]">
              <span>{getReadTime(postItem.fields.postContent)} min to read</span>
            </div>
          </div>
          <h1 className='text-6xl font-bold mobile:text-2xl'>{postItem.fields.title}</h1>
          <div className="flex gap-3 mt-auto">
            {postItem.metadata.tags.map((tag)=> (
              <div key={tag.sys.id} className='capitalize bg-[#28373E] px-3 py-1 rounded-full text-[#F5F5F5] border border-[#3E525B]'>
                {tag.sys.id}
              </div>
            ))}
          </div>
        </div>
      </Link>
    ) : (
      <Link className='flex flex-col' href={'/blog/' + post.slug} scroll={false}>
        {imageUrl && (
          <Image 
            height={300}
            src={imageUrl}
            width={600}
            className='w-full rounded-xl h-64 object-cover'
          />
        )}
        <div className="p-5 max-w-5xl mx-auto w-full rounded-xl bg-[#10191D] h-full z-10 relative flex flex-col gap-4 -mt-6">
          <div className="flex items-center gap-2">
            <div className="text-[#96B0BD] text-[16px]">
              {formatDate(postItem.sys.createdAt)}
            </div>
            <span className="text-[#96B0BD] text-[16px]">/</span>
            <div className="text-[#96B0BD] text-[16px]">
              <span>{getReadTime(postItem.fields.postContent)} min to read</span>
            </div>
          </div>
          <h1 className='text-2xl font-bold'>{postItem.fields.title}</h1>
          <div className="flex gap-3 mt-auto">
            {postItem.metadata.tags.map((tag)=> (
              <div key={tag.sys.id} className='capitalize bg-[#28373E] px-3 py-1 rounded-full text-[#F5F5F5] border border-[#3E525B]'>
                {tag.sys.id}
              </div>
            ))}
          </div>
        </div>
      </Link>
    )
  );
};

export default PostCard;
