import React, { useEffect, useState } from 'react';

const LongText = ({ text, maxLength = 250 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpanded, setCanExpanded] = useState(false);

  useEffect(() => {
    if (text.length < maxLength) {
      setCanExpanded(false);
    } else {
      setCanExpanded(true);
    }
  }, [text, maxLength]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedText = !canExpanded ? text : isExpanded ? text : text.slice(0, maxLength) + '...';

  return (
    <div>
      <p className='text-medGray'>{displayedText}</p>
      {canExpanded && (
        <button
          className='mt-2 text-white hover:underline focus:outline-none'
          onClick={toggleExpansion}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default LongText;
