"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { GiLaurelCrown } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import { RiPoliceBadgeLine } from "react-icons/ri";
import { TiLocationOutline } from "react-icons/ti";
import { getGigs } from "@/utils/http";
import { MdAccessTime } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoLogoUsd } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

const gigOptions = [
  "Figma",
  "WebDesign",
  "Javascript",
  "React.JS",
  "Next.JS",
  "Shadcn",
  "Tailwind",
];

const gigs = [
  {
    title: "Figma and Flow bite mentor needed",
    time: "Posted 15 minutes ago",
    location: "Remote",
    rated: "5 Applicants",
    jobSuccess: "Hourly: $40–$60",
    about:
      "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
    skills: ["UI/UX", "Design", "Webdesign"],
    pic: "/assets/dashboard-media/profilePic.png",
    name: "Deven Miles",
    desg: "Freelancer",
  },
  {
    title: "Figma and Flow bite mentor needed",
    time: "Posted 15 minutes ago",
    location: "Remote",
    rated: "5 Applicants",
    jobSuccess: "Hourly: $40–$60",
    about:
      "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
    skills: ["UI/UX", "Design", "Webdesign"],
    pic: "/assets/dashboard-media/profilePic.png",
    name: "Deven Miles",
    desg: "Freelancer",
  },
  {
    title: "Figma and Flow bite mentor needed",
    time: "Posted 15 minutes ago",
    location: "Remote",
    rated: "5 Applicants",
    jobSuccess: "Hourly: $40–$60",
    about:
      "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
    skills: ["UI/UX", "Design", "Webdesign"],
    pic: "/assets/dashboard-media/profilePic.png",
    name: "Deven Miles",
    desg: "Freelancer",
  },
  {
    title: "Figma and Flow bite mentor needed",
    time: "Posted 15 minutes ago",
    location: "Remote",
    rated: "5 Applicants",
    jobSuccess: "Hourly: $40–$60",
    about:
      "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
    skills: ["UI/UX", "Design", "Webdesign"],
    pic: "/assets/dashboard-media/profilePic.png",
    name: "Deven Miles",
    desg: "Freelancer",
  },
  {
    title: "Figma and Flow bite mentor needed",
    time: "Posted 15 minutes ago",
    location: "Remote",
    rated: "5 Applicants",
    jobSuccess: "Hourly: $40–$60",
    about:
      "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
    skills: ["UI/UX", "Design", "Webdesign"],
    pic: "/assets/dashboard-media/profilePic.png",
    name: "Deven Miles",
    desg: "Freelancer",
  },
  {
    title: "Figma and Flow bite mentor needed",
    time: "Posted 15 minutes ago",
    location: "Remote",
    rated: "5 Applicants",
    jobSuccess: "Hourly: $40–$60",
    about:
      "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
    skills: ["UI/UX", "Design", "Webdesign"],
    pic: "/assets/dashboard-media/profilePic.png",
    name: "Deven Miles",
    desg: "Freelancer",
  },
  {
    title: "Figma and Flow bite mentor needed",
    time: "Posted 15 minutes ago",
    location: "Remote",
    rated: "5 Applicants",
    jobSuccess: "Hourly: $40–$60",
    about:
      "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
    skills: ["UI/UX", "Design", "Webdesign"],
    pic: "/assets/dashboard-media/profilePic.png",
    name: "Deven Miles",
    desg: "Freelancer",
  },
  {
    title: "Figma and Flow bite mentor needed",
    time: "Posted 15 minutes ago",
    location: "Remote",
    rated: "5 Applicants",
    jobSuccess: "Hourly: $40–$60",
    about:
      "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
    skills: ["UI/UX", "Design", "Webdesign"],
    pic: "/assets/dashboard-media/profilePic.png",
    name: "Deven Miles",
    desg: "Freelancer",
  },
  {
    title: "Figma and Flow bite mentor needed",
    time: "Posted 15 minutes ago",
    location: "Remote",
    rated: "5 Applicants",
    jobSuccess: "Hourly: $40–$60",
    about:
      "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
    skills: ["UI/UX", "Design", "Webdesign"],
    pic: "/assets/dashboard-media/profilePic.png",
    name: "Deven Miles",
    desg: "Freelancer",
  },
];

const Recent = ({search, setSearch}) => {

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

  
  const handleFilter = () => {
    let filteredGigs = gigs;

    if (search) {
      filteredGigs = filteredGigs.filter((gig) =>
        gig.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // if (sortOrder === "dateAsc") {
    //   filteredGigs.sort(
    //     (a, b) => new Date(a.gigPostDate) - new Date(b.gigPostDate)
    //   );
    // } else if (sortOrder === "dateDesc") {
    //   filteredGigs.sort(
    //     (a, b) => new Date(b.gigPostDate) - new Date(a.gigPostDate)
    //   );
    // }

    return filteredGigs;
  };

  const filteredRecentJob = handleFilter();

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const newDisplayedData = data.slice(0, nextPage * itemsPerPage);
    setDisplayedData(newDisplayedData);
    setPage(nextPage);
  };

  return (
    <div className="mt-10 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Recent Job Posts</h1>
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
      <div className="flex flex-col gap-4">
        {filteredRecentJob.map((gig, index) => (
          <div
            key={index}
            className="bg-deepGreen px-6 py-6 flex flex-col gap-4 text-white rounded-2xl"
          >
            <div className="pb-5 border-b border-lightGray flex flex-col gap-3">
              <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-4 items-center">
                  <Image
                    src={"/assets/icons/ActiveOrder.png"}
                    width={45}
                    height={45}
                  />
                  <h3 className="text-white hidden md:block text-xl font-semibold whitespace-nowrap">
                    {gig.title}
                  </h3>
                </div>
                <div className="flex gap-6 items-center">
                  <p className="border border-green-600 text-green-600 font-[500] rounded-[6px] p-[1px] px-2 cursor-pointer">
                    Applied
                  </p>
                  <FaRegHeart className="text-medGray text-xl" />
                  <IoIosMore className="text-medGray text-xl" />
                </div>
              </div>
              <h3 className="text-white md:hidden text-xl font-semibold whitespace-nowrap">
                {gig.title}
              </h3>
              <div className="flex  gap-4 flex-wrap">
                <div className="flex gap-1 items-center">
                  <MdAccessTime className="text-medGray text-xl" />
                  <span>{gig.time}</span>
                </div>
                <div className="flex gap-1 items-center">
                  <TiLocationOutline className="text-medGray text-xl" />
                  <span>{gig.location}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <FaRegUser className="text-medGray text-xl" />
                  <span>{gig.rated}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <IoLogoUsd className="text-medGray text-xl" />
                  <span>{gig.jobSuccess}</span>
                </div>
              </div>
            </div>
            <p className="text-medGray">{gig.about}</p>
            <p className="text-white">Show more</p>
            <div className="flex gap-2 flex-wrap">
              {gig.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="bg-darkGray cursor-pointer py-1 px-2 text-center rounded-full border border-lightGray"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="py-3 border border-lightGray rounded-2xl text-center cursor-pointer">
        Load More +
      </div>
    </div>
  );
};

export default Recent;
