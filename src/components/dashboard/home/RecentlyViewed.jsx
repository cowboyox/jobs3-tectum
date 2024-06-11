"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdVerified } from "react-icons/md";
import { RiPoliceBadgeLine } from "react-icons/ri";
import { GiLaurelCrown } from "react-icons/gi";
import { getRecentViewedGigs } from "@/utils/http";

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
      <h1>Recently Viewed</h1>
      <p className="cursor-pointer">Show more</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        {data?.map((recent, index) => (
          <div
            className="bg-deepGreen p-5 flex flex-col gap-4 rounded-2xl"
            key={index}
          >
            <div className="flex gap-4 items-center flex-1 border-b py-3 border-lightGray">
              <div className="w-10 flex justify-center items-center">
                <div className=" w-[100%] h-10 outline-none border-none flex justify-center items-center">
                  <Image
                    src={"/assets/dashboard-media/profilePic.png"}
                    alt="pic"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-white text-lg truncate">
                    {recent?.gigId?.clientProfileId?.chosen_visible_name}
                  </h3>
                  {recent?.gigId?.clientProfileId?.verified && (
                    <MdVerified className="text-[#0A75C2]" />
                  )}
                </div>
                <div className="flex gap-1 items-center text-medGray">
                  <p className="text-medGray font-thin">
                    {recent?.gigId?.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-white">
              <div className="flex gap-2 flex-wrap">
                {recent?.gigId?.requiredSkills?.map((skill) => (
                  <div className="bg-darkGray py-1 px-2 text-center rounded-full border border-lightGray">
                    {skill}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="flex gap-2 items-center">
                  <RiPoliceBadgeLine className="text-[#158FE8]" />
                  <span>Top Rated</span>
                </div>
                <div className="flex gap-2 items-center">
                  <GiLaurelCrown className="text-[#34E250]" />
                  <span>0% Job Success</span>
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
