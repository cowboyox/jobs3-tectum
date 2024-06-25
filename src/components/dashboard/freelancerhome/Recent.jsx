'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaRegHeart, FaRegUser } from 'react-icons/fa';
import { IoIosMore, IoLogoUsd } from 'react-icons/io';
import { MdAccessTime } from 'react-icons/md';
import { TiLocationOutline } from 'react-icons/ti';

const gigOptions = [
  'Figma',
  'WebDesign',
  'Javascript',
  'React.JS',
  'Next.JS',
  'Shadcn',
  'Tailwind',
];

const gigs = [
  // {
  //   title: "Figma and Flow bite mentor needed",
  //   time: "Posted 15 minutes ago",
  //   location: "Remote",
  //   rated: "5 Applicants",
  //   jobSuccess: "Hourly: $40–$60",
  //   about:
  //     "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
  //   skills: ["UI/UX", "Design", "Webdesign"],
  //   pic: "/assets/dashboard-media/profilePic.png",
  //   name: "Deven Miles",
  //   desg: "Freelancer",
  // },
  // {
  //   title: "Figma and Flow bite mentor needed",
  //   time: "Posted 15 minutes ago",
  //   location: "Remote",
  //   rated: "5 Applicants",
  //   jobSuccess: "Hourly: $40–$60",
  //   about:
  //     "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
  //   skills: ["UI/UX", "Design", "Webdesign"],
  //   pic: "/assets/dashboard-media/profilePic.png",
  //   name: "Deven Miles",
  //   desg: "Freelancer",
  // },
  // {
  //   title: "Figma and Flow bite mentor needed",
  //   time: "Posted 15 minutes ago",
  //   location: "Remote",
  //   rated: "5 Applicants",
  //   jobSuccess: "Hourly: $40–$60",
  //   about:
  //     "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
  //   skills: ["UI/UX", "Design", "Webdesign"],
  //   pic: "/assets/dashboard-media/profilePic.png",
  //   name: "Deven Miles",
  //   desg: "Freelancer",
  // },
  // {
  //   title: "Figma and Flow bite mentor needed",
  //   time: "Posted 15 minutes ago",
  //   location: "Remote",
  //   rated: "5 Applicants",
  //   jobSuccess: "Hourly: $40–$60",
  //   about:
  //     "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
  //   skills: ["UI/UX", "Design", "Webdesign"],
  //   pic: "/assets/dashboard-media/profilePic.png",
  //   name: "Deven Miles",
  //   desg: "Freelancer",
  // },
  // {
  //   title: "Figma and Flow bite mentor needed",
  //   time: "Posted 15 minutes ago",
  //   location: "Remote",
  //   rated: "5 Applicants",
  //   jobSuccess: "Hourly: $40–$60",
  //   about:
  //     "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
  //   skills: ["UI/UX", "Design", "Webdesign"],
  //   pic: "/assets/dashboard-media/profilePic.png",
  //   name: "Deven Miles",
  //   desg: "Freelancer",
  // },
  // {
  //   title: "Figma and Flow bite mentor needed",
  //   time: "Posted 15 minutes ago",
  //   location: "Remote",
  //   rated: "5 Applicants",
  //   jobSuccess: "Hourly: $40–$60",
  //   about:
  //     "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
  //   skills: ["UI/UX", "Design", "Webdesign"],
  //   pic: "/assets/dashboard-media/profilePic.png",
  //   name: "Deven Miles",
  //   desg: "Freelancer",
  // },
  // {
  //   title: "Figma and Flow bite mentor needed",
  //   time: "Posted 15 minutes ago",
  //   location: "Remote",
  //   rated: "5 Applicants",
  //   jobSuccess: "Hourly: $40–$60",
  //   about:
  //     "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
  //   skills: ["UI/UX", "Design", "Webdesign"],
  //   pic: "/assets/dashboard-media/profilePic.png",
  //   name: "Deven Miles",
  //   desg: "Freelancer",
  // },
  // {
  //   title: "Figma and Flow bite mentor needed",
  //   time: "Posted 15 minutes ago",
  //   location: "Remote",
  //   rated: "5 Applicants",
  //   jobSuccess: "Hourly: $40–$60",
  //   about:
  //     "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
  //   skills: ["UI/UX", "Design", "Webdesign"],
  //   pic: "/assets/dashboard-media/profilePic.png",
  //   name: "Deven Miles",
  //   desg: "Freelancer",
  // },
  // {
  //   title: "Figma and Flow bite mentor needed",
  //   time: "Posted 15 minutes ago",
  //   location: "Remote",
  //   rated: "5 Applicants",
  //   jobSuccess: "Hourly: $40–$60",
  //   about:
  //     "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring ...",
  //   skills: ["UI/UX", "Design", "Webdesign"],
  //   pic: "/assets/dashboard-media/profilePic.png",
  //   name: "Deven Miles",
  //   desg: "Freelancer",
  // },
];

const Recent = ({ search }) => {
  const [selectedGigs, setSelectedGigs] = useState(['Figma']);
  // const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  // const itemsPerPage = 10;

  // const fetchGigs = async (gigs) => {
  //   try {
  //     const res = await getGigs(gigs);
  //     setData(res.data);
  //   } catch (err) {
  //     console.warn('Err fetching Gigs', err);
  //   }
  // };

  // useEffect(() => {
  //   fetchGigs(selectedGigs);
  // }, [selectedGigs]);

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

  // const handleLoadMore = () => {
  //   const nextPage = page + 1;
  //   const newDisplayedData = data.slice(0, nextPage * itemsPerPage);
  //   setDisplayedData(newDisplayedData);
  //   setPage(nextPage);
  // };

  return (
    <div className='mt-10 flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold'>Recent Job Posts</h1>
      <div className='flex flex-wrap items-center gap-2'>
        {gigOptions.map((gig, index) => (
          <div
            className={`${
              selectedGigs.includes(gig) ? 'bg-orange' : 'bg-darkGray'
            } cursor-pointer rounded-full border border-lightGray px-2 py-1 text-center`}
            key={index}
            onClick={() => handleGigClick(gig)}
          >
            {gig}
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-4'>
        {filteredRecentJob.length ? (
          filteredRecentJob.map((gig, index) => (
            <div
              className='flex flex-col gap-4 rounded-2xl bg-deepGreen px-6 py-6 text-white'
              key={index}
            >
              <div className='flex flex-col gap-3 border-b border-lightGray pb-5'>
                <div className='flex items-center justify-between gap-4'>
                  <div className='flex items-center gap-4'>
                    <Image height={45} src={'/assets/icons/ActiveOrder.png'} width={45} />
                    <h3 className='hidden whitespace-nowrap text-xl font-semibold text-white md:block'>
                      {gig.title}
                    </h3>
                  </div>
                  <div className='flex items-center gap-6'>
                    <p className='cursor-pointer rounded-[6px] border border-green-600 p-[1px] px-2 font-[500] text-green-600'>
                      Applied
                    </p>
                    <FaRegHeart className='text-xl text-medGray' />
                    <IoIosMore className='text-xl text-medGray' />
                  </div>
                </div>
                <h3 className='whitespace-nowrap text-xl font-semibold text-white md:hidden'>
                  {gig.title}
                </h3>
                <div className='flex flex-wrap gap-4'>
                  <div className='flex items-center gap-1'>
                    <MdAccessTime className='text-xl text-medGray' />
                    <span>{gig.time}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <TiLocationOutline className='text-xl text-medGray' />
                    <span>{gig.location}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaRegUser className='text-xl text-medGray' />
                    <span>{gig.rated}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <IoLogoUsd className='text-xl text-medGray' />
                    <span>{gig.jobSuccess}</span>
                  </div>
                </div>
              </div>
              <p className='text-medGray'>{gig.about}</p>
              <p className='text-white'>Show more</p>
              <div className='flex flex-wrap gap-2'>
                {gig.skills.map((skill, skillIndex) => (
                  <div
                    className='cursor-pointer rounded-full border border-lightGray bg-darkGray px-2 py-1 text-center'
                    key={skillIndex}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className='text-center text-2xl font-semibold'>Not yet</div>
        )}
      </div>
      <div className='cursor-pointer rounded-2xl border border-lightGray py-3 text-center'>
        Load More +
      </div>
    </div>
  );
};

export default Recent;
