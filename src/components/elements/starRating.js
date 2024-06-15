'use client';
import React from 'react';
import StarRatings from 'react-star-ratings';

const StarRating = (props) => {
  return (
    <div className={props.className}>
      <StarRatings
        numberOfStars={5}
        rating={props.rating}
        starDimension='18px'
        starEmptyColor='#8e8e93'
        starRatedColor='#fa4e17'
        starSpacing='1px'
      />
    </div>
  );
};

export default StarRating;
