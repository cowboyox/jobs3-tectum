import React, { useState, useEffect } from 'react';

// Components
import PostCard from '@/components/elements/PostCard';

const PostsList = ({ posts, assetUrls }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const getTransformStyle = (x, y, factor) => {
    const offsetX = (x / window.innerWidth - 0.5) * factor;
    const offsetY = (y / window.innerHeight - 0.5) * factor;
    return {
      transform: `translate(${offsetX}px, ${offsetY}px)`,
    };
  };

  return (
    <div className='mx-auto flex max-w-7xl flex-col gap-32 pt-48 mobile:gap-12 mobile:pt-24'>
      <h2 className='flex items-center justify-center text-center text-[160px] font-bold uppercase text-[#F5F5F5] mobile:text-[60px]'>
        Blog
        <div className='relative'>
          <span
            className='text_stroke_white -ml-28 block text-[190px] opacity-25 mobile:text-[60px]'
            style={getTransformStyle(mousePosition.x, mousePosition.y, 50)}
          >
            Blog
          </span>
          <span
            className='text_stroke_white absolute left-0 top-4 -ml-28 text-[190px] opacity-25 mobile:text-[60px]'
            style={getTransformStyle(mousePosition.x, mousePosition.y, 20)}
          >
            Blog
          </span>
        </div>
      </h2>

      <div className='grid grid-cols-2 gap-6 mobile:grid-cols-1 mobile:px-5'>
        {posts.map((post, index) =>
          index == 0 ? (
            <PostCard key={index} postItem={post} assetUrls={assetUrls} isBanner={true} />
          ) : (
            <PostCard key={index} postItem={post} assetUrls={assetUrls} />
          )
        )}
      </div>
    </div>
  );
};

export default PostsList;
