'use client';
import { useEffect, useRef, useState } from 'react';
import { GoChevronDown } from 'react-icons/go';

import { Textarea } from '../ui/textarea';

const CollapsibleText = ({ previewText, expandedText, isEditBio, setBio }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');

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
        <div>
          {previewText.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      ) : (
        <Textarea
          className='rounded-xl outline-none'
          onChange={(e) => setBio(e.target.value)}
          rows={7}
          value={previewText + expandedText}
        />
      )}
      {!isEditBio && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out`}
          ref={contentRef}
          style={{ maxHeight }}
        >
          <div>
            {expandedText.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}
      {!isEditBio && (
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
      )}
    </div>
  );
};

export default CollapsibleText;
