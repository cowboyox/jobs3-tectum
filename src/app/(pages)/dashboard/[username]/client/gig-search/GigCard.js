import React, { useState } from "react";
import { FaStar, FaClock, FaDollarSign, FaCheckCircle } from "react-icons/fa";
import { CiReceipt } from "react-icons/ci";
import { PiShootingStarLight } from "react-icons/pi";
import { BsPatchCheckFill } from "react-icons/bs";
import Image from "next/image";

export default function GigCard({}) {
  const [showApplication, setShowApplication] = useState(false);
  const handleOrder = () => {
    setShowApplication(true);
  };

  return (
    <>
      {showApplication ? null : (
        <div
          className="bg-[#10191d] text-white p-4 rounded-xl flex gap-4 w-full items-center mobile:flex-col cursor-pointer"
          onClick={handleOrder}
        >
          <div className="relative w-[400px] max-w-full">
            <img
              src="/assets/images/portfolio_works/portfolio.jpeg"
              alt="Gig Image"
              className="object-cover w-full rounded-xl aspect-video"
            />
            <div className="absolute flex gap-2 top-2 left-2">
              <div className="bg-gray-800 text-white px-2 py-1 rounded-full flex items-center gap-2">
                <FaStar fill="#DC4F13" size={16} />
                <p className="text-[14px] flex gap-1 text-[#E0F0F9]">
                  5.5
                  <span className="text-[#96b0be]">(921)</span>
                </p>
              </div>
              <div className="bg-gray-800 text-white px-2 py-1 rounded-full flex items-center gap-2">
                <PiShootingStarLight className="text-blue-500" />
                <span className="text-[#96b0be]">Top Rated</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <h3 className="text-2xl font-semibold text-[#F5F5F5]">
              Title of the searching Gig can be very long
            </h3>
            <div className="flex items-center gap-5 mt-2 text-gray-400">
              <div className="flex items-center gap-2">
                <FaClock size={24} />
                <span className="text-base">3 days</span>
              </div>
              <div className="flex items-center gap-2">
                <CiReceipt size={28} />
                <span className="text-base">$400</span>
              </div>
            </div>
            <hr className="my-3 border-[#1B272C]" />
            <div className="flex items-center">
              <Image
                src="/assets/images/users/user-6.png"
                alt="Devon Miles"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-2xl mobile:text-xl">
                    Devon Miles
                  </p>
                  <BsPatchCheckFill fill="#0b75c2" />
                </div>
                <p className="text-gray-400 text-base mobile:text-sm">
                  Yogyakarta, Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
