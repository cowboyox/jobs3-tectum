import FillProfile from "@/components/dashboard/freelancerhome/FillProfile";
import Recent from "@/components/dashboard/freelancerhome/Recent";
import RecentlyViewed from "@/components/dashboard/freelancerhome/RecentlyViewed";
import Stats from "@/components/dashboard/freelancerhome/Stats";
import Hero from "@/components/dashboard/freelancerhome/hero";
import Ratings from "@/components/dashboard/freelancerhome/Ratings";
import React from "react";

const Page = () => {
  return (
    <div className="py-10 w-full min-h-screen flex flex-col items-center">
      <div className="2xl:max-w-[1000px]">
        <Stats />
        <FillProfile />
        <RecentlyViewed />
        <Ratings />
        <Recent />
      </div>
    </div>
  );
};

export default Page;