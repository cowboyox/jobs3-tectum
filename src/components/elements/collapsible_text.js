'use client';
import { useEffect, useRef, useState } from 'react';
import { GoChevronDown } from 'react-icons/go';

import { Textarea } from '../ui/textarea';

const CollapsibleText = ({ previewText, expandedText, isEditBio, setBio, bio }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  const descriptionTextMaxLength = 320;

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setMaxHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        setMaxHeight('0px');
      }
    }
  }, [isOpen]);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      {!isEditBio ? (
        <div className='w-full'>
          <pre className='whitespace-pre-wrap break-all'>
          {
            bio.length < descriptionTextMaxLength
              ? bio
              : showMore
                ? bio
                : bio.slice(0, descriptionTextMaxLength) + '...'
          }
          </pre>
          <div className='mt-3 text-left'>
            {bio.length < descriptionTextMaxLength ? (
              <></>
            ) : !showMore ? (
              <button onClick={() => setShowMore(true)}
              >
                Show more
              </button>
            ) : (
              <button onClick={() => setShowMore(false)}>
                Show less
              </button>
            )}
          </div>
        </div>
      ) : (
        <Textarea
          className='outline-none rounded-xl'
          onChange={(e) => setBio(e.target.value)}
          rows={7}
          value={bio}
        />
      )}
      {!isEditBio && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out`}
          ref={contentRef}
          style={{ maxHeight }}
        >
          <div>
            {/* {expandedText.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))} */}
            <pre>
              {bio}
            </pre>
          </div>
        </div>
      )}
      {/* {!isEditBio && (
        <button
          className={`absolute bottom-0 top-full mt-2 flex w-full justify-center text-base text-[#96B0BD]`}
          onClick={toggleCollapse}
        >
          {isOpen ? (
            <span className='flex items-center gap-2'>
              Show less <GoChevronDown className='rotate-180' />
            </span>
          ) : (
            <span className='flex items-center gap-2 shadow-inner'>
              Show more <GoChevronDown />
            </span>
          )}
        </button>
      )} */}
    </div>
  );
};

export default CollapsibleText;
