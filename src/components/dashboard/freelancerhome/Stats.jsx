import React from "react";
import { CiSearch } from "react-icons/ci";
import { CgOptions } from "react-icons/cg";
import { MdVerified } from "react-icons/md";
import Image from "next/image";
import { HiOutlineLocationMarker } from "react-icons/hi";

const orders = [
  {
    title: "Figma and Flow Bite Mentor Needed",
    daysAgo: "15 H: 30 S",
    price: "$360",
  },
  {
    title: "Figma and Flow Bite Mentor Needed",
    daysAgo: "8 days",
    price: "$400",
  },
  {
    title: "Figma and Flow Bite Mentor Needed",
    daysAgo: "14 days",
    price: "$450",
  },
];

const earnings = [
  {
    month: 'June',
    price: '$360'
  },
  {
    month: 'May',
    price: '$1450'
  },
  {
    month: 'April',
    price: '$830'
  },
  {
    month: 'March',
    price: '$1250'
  },
];

const Stats = () => {
  return (
    <div className="w-full min-h-96 flex flex-col -mt-10 font-roboto md:mt-10">
      <div className="h-16 rounded-2xl bg-deepGreen flex items-center justify-between gap-6 px-4">
        <div className="flex gap-4 items-center">
          <CiSearch className="text-2xl text-medGray" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search by job title, co..."
            className="bg-transparent outline-none border-none h-full text-medGray"
          />
        </div>
        <div className="flex gap-4 min-w-28 justify-center items-center h-16">
          <div className="bg-[#1BBF36] rounded-full hidden md:block">
            <Image
              src={"/assets/icons/AIChatIcon.png"}
              width={32}
              height={32}
            />
          </div>
          <div className="flex gap-2 items-center ">
            <HiOutlineLocationMarker className="text-2xl text-medGray" />
            <p className="text-medGray hidden md:block">Anywhere</p>
          </div>
          <CgOptions className="text-2xl text-medGray" />
          <p className="text-medGray hidden md:block">Filter</p>
          <span className="rounded-full bg-orange size-6 flex justify-center items-center">
            4
          </span>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Your Stats</h1>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <div className="w-full md:w-[70%] rounded-2xl bg-deepGreen min-h-96 h-full p-5 flex flex-col">
            <div className="h-1/6 flex justify-between items-center">
              <h3 className="text-white text-2xl font-semibold">
                Active Orders
              </h3>
              <p className="text-medGray">See All</p>
            </div>
            <div className="flex flex-col justify-between gap-2 flex-1 mt-6">
              {orders.map((spend, index) => (
                <div
                  key={index}
                  className="flex px-3 gap-1 items-center flex-1 bg-darkGray rounded-2xl"
                >
                    <Image
                      src={"/assets/icons/ActiveOrder.png"}
                      width={45}
                      height={45}
                      className="md:hidden"
                    />
                  <div className=" flex flex-1 justify-between items-center flex-col md:flex-row">
                    <div className="flex gap-4 items-center">
                    <Image
                      src={"/assets/icons/ActiveOrder.png"}
                      width={45}
                      height={45}
                      className="hidden md:block"
                    />
                    <h3 className="text-white text-md md:text-xl font-semibold whitespace-nowrap">
                      {spend.title}
                    </h3>
                    </div>
                <div className="flex items-center gap-4 justify-between w-full md:w-auto px-4 md:px-0">
                    <p className="text-medGray font-[500] text-xl">
                      {spend.price}
                    </p>
                    <div className="flex gap-1 items-center text-white border-2 border-white rounded-[6px] px-3">
                      <p>{spend.daysAgo}</p>
                    </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[30%] rounded-2xl bg-deepGreen min-h-96 h-full p-5 flex flex-col">
            <div className="h-1/6 flex justify-between items-center">
            <h3 className="text-white text-2xl font-semibold">
                Earnings
              </h3>
              <p className="text-medGray">See All</p>
            </div>
            <div className="flex-1 mt-6">
              {earnings.map((earning, index) => (
                <div
                  key={index}
                  className="flex px-3 gap-1 items-center justify-between flex-1 bg-darkGray h-[45px] rounded-xl mb-2"
                >
                 <p className="text-white font-[500] text-xl">
                      {earning.month}
                    </p><p className="text-medGray font-[500] text-xl">
                      {earning.price}
                    </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
