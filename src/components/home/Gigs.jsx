"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { GiLaurelCrown } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import { RiPoliceBadgeLine } from "react-icons/ri";
import { TiLocationOutline } from "react-icons/ti";
import { getGigs } from "@/utils/http";

const gigOptions = [
  "Figma",
  "WebDesign",
  "Javascript",
  "React.JS",
  "Next.JS",
  "Shadcn",
  "Tailwind",
  "MobileDevelopment",
  "WebDevelopment",
  "DatabaseDevelopment",
  "DesktopApplication",
  "Python",
  "Java",
  "C++",
  "Swift",
  "Kotlin",
  "SQL",
  "MongoDB",
  "Angular",
  "Vue.JS",
];

const Gigs = () => {
  const [selectedGigs, setSelectedGigs] = useState(["Figma"]);
  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const fetchGigs = async (gigs) => {
    try {
      const res = await getGigs(gigs);
      console.log("Gigs Data", res); 
      setData(res.data);
      setDisplayedData(res.data.slice(0, itemsPerPage));
    } catch (err) {
      console.log("Err fetching Gigs", err);
    }
  };

  useEffect(() => {
    fetchGigs(selectedGigs);
  }, [selectedGigs]);

  const handleGigClick = (gig) => {
    setSelectedGigs((prevSelectedGigs) => {
      if (prevSelectedGigs.includes(gig)) {
        return prevSelectedGigs.filter((selectedGig) => selectedGig !== gig);
      } else {
        return [...prevSelectedGigs, gig];
      }
    });
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const newDisplayedData = data.slice(0, nextPage * itemsPerPage);
    setDisplayedData(newDisplayedData);
    setPage(nextPage);
  };


  return (
    <div className="mt-10 flex flex-col gap-4">
      <h1>Gigs you may like</h1>
      <div className="flex gap-2 items-center flex-wrap">
        {gigOptions.map((gig, index) => (
          <div
            key={index}
            onClick={() => handleGigClick(gig)}
            className={`${
              selectedGigs.includes(gig) ? "bg-orange" : "bg-darkGray"
            } cursor-pointer py-1 px-2 text-center rounded-full border border-lightGray`}
          >
            {gig}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {displayedData?.map((gig, index) => (
          <div
            key={index}
            className="bg-deepGreen px-5 flex flex-col gap-4 text-white rounded-2xl"
          >
            <div className="py-5 border-b border-lightGray flex flex-col gap-3">
              <h1>{gig.gigTitle}</h1>
              <div className="flex  gap-4 flex-wrap">
                <div className="flex gap-1 items-center">
                  <TiLocationOutline className="text-medGray text-xl" />
                  <span>{gig.location}</span>
                </div>
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
            <p className="w-[80%] text-medGray">{gig?.gigDescription?.length > 100 ? gig.gigDescription?.substring(0, 200) + "..." : gig.gigDescription}</p>
            
            <div className="flex gap-2 flex-wrap">
              {gig?.requiredSkills.map((skill,index) => (
                <div key={index} className="bg-darkGray cursor-pointer py-1 px-2 text-center rounded-full border border-lightGray">
                  {skill}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 md:flex-row justify-between pb-5">
              <div className="flex gap-4 items-center flex-1">
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
                      {gig?.clientProfileId?.chosen_visible_name}
                    </h3>
                    {gig?.clientProfileId?.verified && (
                    <MdVerified className="text-[#0A75C2]" />
                    )}
                  </div>
                  <div className="flex gap-1 items-center text-medGray">
                    <p className="text-medGray font-thin">Freelancer</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-56 h-14 md:h-auto flex justify-end items-center">
                <div className="w-full flex gap-2 bg-darkGray h-full rounded-2xl">
                  <button className="flex-1">Message</button>
                  <button className="w-[55%] bg-orange">Invite to Job</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {displayedData.length < data.length && (
        <div
          className="py-3 border border-lightGray rounded-2xl text-center cursor-pointer"
          onClick={handleLoadMore}
        >
          Load More +
        </div>
      )}
    </div>
  );
};

export default Gigs;

