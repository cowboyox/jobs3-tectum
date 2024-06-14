"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdVerified } from "react-icons/md";
import { RiPoliceBadgeLine } from "react-icons/ri";
import { GiLaurelCrown } from "react-icons/gi";
import { getRecentViewedGigs } from "@/utils/http";

const recentViewed = [
  {
    title: "Figma and Flow Bite Mentor Needed",
    location: "Remote",
    price: "$360",
  },
  {
    title: "Figma and Flow Bite Mentor Needed",
    location: "Remote",
    price: "$400",
  },
  {
    title: "Figma and Flow Bite Mentor Needed",
    location: "Remote",
    price: "$450",
  },
];

const RecentlyViewed = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRecentViewGigs = async () => {
      try {
        const res = await getRecentViewedGigs();
        console.log("Gigs Data", res);
        setData(res.data);
      } catch (err) {
        console.log("Err fetching Gigs", err);
      }
    };
    fetchRecentViewGigs();
  }, []);
  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Recently Viewed</h1>
        <p className="cursor-pointer">Show more</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-4 mt-2">
        {recentViewed.map((spend, index) => (
          <div
            key={index}
            className="flex px-4 py-8 gap-1 items-center flex-col bg-darkGray rounded-2xl"

          >
            <div className=" flex flex-col gap-4">
              <div className="">
                <Image
                  src={"/assets/icons/ActiveOrder.png"}
                  width={45}
                  height={45}
                />
                <h3 className="text-white text-xl font-[500] mt-4">
                  {spend.title}
                </h3>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-medGray font-[400] text-lg">{spend.price}</p>
                <div className="flex gap-1 items-center text-white border-2 border-white rounded-[6px] px-3">
                  <p className="p-[1px]">{spend.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;

const recentlyViewed = [
  {
    pic: "/assets/dashboard-media/profilePic.png",
    name: "Deven Miles",
    locatin: "Yogyakarta, Indonesia",
    skills: ["UI/UX", "Design", "Webdesign"],
    rated: "Top Rated",
    jobSuccess: "96% Job Success",
  },
  {
    pic: "/assets/dashboard-media/profilePic.png",
    name: "Deven Miles",
    locatin: "Yogyakarta, Indonesia",
    skills: ["UI/UX", "Design", "Webdesign"],
    rated: "Top Rated",
    jobSuccess: "96% Job Success",
  },
  {
    pic: "/assets/dashboard-media/profilePic.png",
    name: "Deven Miles",
    locatin: "Yogyakarta, Indonesia",
    skills: ["UI/UX", "Design", "Webdesign"],
    rated: "Top Rated",
    jobSuccess: "96% Job Success",
  },
];
