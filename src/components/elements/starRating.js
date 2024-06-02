"use client";
import React from 'react';
import StarRatings from 'react-star-ratings';  

const StarRating = (props) => {
  return (
    <div className={props.className}>
        <StarRatings
            rating={props.rating}
            starRatedColor="#fa4e17"
            starEmptyColor="#8e8e93"
            numberOfStars={5}
            starDimension="18px"
            starSpacing="1px"
        />
    </div>
  )
}

export default StarRating
