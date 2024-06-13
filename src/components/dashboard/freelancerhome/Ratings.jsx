"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdVerified } from "react-icons/md";
import { RiPoliceBadgeLine } from "react-icons/ri";
import { GiLaurelCrown } from "react-icons/gi";
import { getRecentViewedGigs } from "@/utils/http";

const ratings = [
  {
    name: "Hannibal Smith",
    time: "1 month ago",
    description: "But I must explain to you how all this mistaken idea of denouncing pleasure an...",
    star: 5,
    price: "$360",
  },
  {
    name: "Hannibal Smith",
    time: "1 month ago",
    description: "But I must explain to you how all this mistaken idea of denouncing pleasure an...",
    star: 5,
    price: "$400",
  },
  {
    name: "Hannibal Smith",
    time: "1 month ago",
    description: "But I must explain to you how all this mistaken idea of denouncing pleasure an...",
    star: 5,
    price: "$450",
  },
];

const Ratings = () => {

  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Recently Viewed</h1>
        <p className="cursor-pointer">Show more</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-4 mt-2">
        {ratings.map((rating, index) => (
          <div
            key={index}
            className="flex px-6 py-8 gap-1  flex-1 flex-col bg-darkGray rounded-2xl"
          >
            <div className="flex gap-4 flex-1 items-center">
                <Image
                  src={"/assets/icons/Freelancer.png"}
                  width={45}
                  height={45}
                />
                <h3 className="text-white text-xl font-[500] whitespace-nowrap">
                  {rating.name}
                </h3>
                <Image
                  src={"/assets/icons/artwork.png"}
                  width={22}
                  height={16}
                  className="object-contain"
                />
            </div>
            <p className="text-medGray mt-4">{rating.time}</p>

            <div className="flex gap-3 mt-2">
                <Image src={"/assets/icons/Vector.png"} height={16} width={16} />
                <Image src={"/assets/icons/Vector.png"} height={16} width={16} />
                <Image src={"/assets/icons/Vector.png"} height={16} width={16} />
                <Image src={"/assets/icons/Vector.png"} height={16} width={16} />
                <Image src={"/assets/icons/Vector.png"} height={16} width={16} />
            </div>
            <p className="mt-4">
                {rating.description}
            </p>
              {/* <div className="flex items-center justify-between gap-4">
                <p className="text-medGray font-[400] text-lg">{rating.time}</p>
                <div className="flex gap-1 items-center text-white border-2 border-white rounded-[6px] px-3">
                  <p className="p-[1px]">{rating.description}</p>
                </div>
              </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ratings;

