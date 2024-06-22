import FillProfile from "@/components/home/FillProfile";
import Gigs from "@/components/home/Gigs";
import RecentlyViewed from "@/components/home/RecentlyViewed";
import Stats from "@/components/home/Stats";
import Hero from "@/components/home/hero";
import React from "react";

const page = () => {
  return (
    <div className="py-10 w-full min-h-screen flex flex-col items-center">
      <div className="w-full 2xl:max-w-[1000px]">
        <Stats />
        <FillProfile />
        <RecentlyViewed />
        <Gigs />
      </div>
    </div>
  );
};

export default page;
