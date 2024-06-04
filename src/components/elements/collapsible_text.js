'use client';
import { useState, useRef, useEffect } from "react";
import { GoChevronDown } from "react-icons/go";
import { Textarea } from "../ui/textarea";

const CollapsibleText = ({ previewText, expandedText, isEditBio, bio, setBio }) => {

  console.log("previewText: ", previewText)
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
      {
        !isEditBio ?
          <div>
            {previewText.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          :
          <Textarea className="rounded-xl" value={bio} onChange={e => setBio(e.target.value)} rows={7}></Textarea>
      }
      {
        !isEditBio &&
        <div
          ref={contentRef}
          className={`overflow-hidden transition-all duration-500 ease-in-out`}
          style={{ maxHeight }}
        >
          <div>
            {expandedText.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      }
      {
        !isEditBio &&
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
      }
    </div>
  );
};

export default CollapsibleText;
