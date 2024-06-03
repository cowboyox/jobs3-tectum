'use client';
import { useState, useRef, useEffect } from "react";
import { GoChevronDown } from "react-icons/go";

const CollapsibleText = ({ previewText, expandedText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setMaxHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        setMaxHeight("0px");
      }
    }
  }, [isOpen]);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <p>{previewText}</p>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-500 ease-in-out`}
        style={{ maxHeight }}
      >
        <p className="mt-2">{expandedText}</p>
      </div>
      <button
        onClick={toggleCollapse}
        className={`
          mt-2 text-base absolute bottom-0 w-full flex justify-center top-full text-[#96B0BD]
        `}
      >
        {isOpen ? 
        <span className="flex items-center gap-2">Show less <GoChevronDown className="rotate-180" /></span> : 
        <span className="flex items-center gap-2 shadow-inner">Show more <GoChevronDown /></span>}
      </button>
    </div>
  );
};

export default CollapsibleText;
