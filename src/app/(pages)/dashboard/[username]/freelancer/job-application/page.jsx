import React from "react";
import Job from "../../../../../../components/dashboard/jobapplication/Job";
import { VscLock } from "react-icons/vsc";

const Page = () => {
  return (
    <div className="flex gap-8 md:flex-row flex-col items-center md:justify-center md:items-start
     ">
      <div className="w-full md:w-[65%] md:max-w-[690px]">
        <Job />
        <div className="bg-deepGreen mt-4  px-6 py-6 flex flex-col gap-4 text-white rounded-2xl">
          <h3 className="text-white hidden md:block text-xl font-semibold whitespace-nowrap">
            Cover letter
          </h3>
          <textarea name="" id="" cols="30" rows="7" className="border border-medGray bg-deepGreen w-full rounded-xl p-4" placeholder="Type here..."></textarea>
        </div>
      </div>
      <div className="w-full md:w-[35%] md:max-w-[420px]">
        <div className="bg-deepGreen px-6 py-6 flex flex-col gap-4 text-white rounded-2xl">
          <div className="flex flex-col gap-3">
            <div className="bg-[#1B272C] p-3 rounded-xl flex items-center justify-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
                  stroke="#96B0BD"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
                  stroke="#96B0BD"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
                  stroke="#96B0BD"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              SSL Secure Payment
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p> Refundable Dispute Fee</p>
                <p>$ 0,50</p>
              </div>
              <div className="flex justify-between">
                <p>Service Fee</p>
                <p>$ 0</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xl font-semibold">Total</p>
                <p className="text-xl font-semibold">$ 0</p>
              </div>
            </div>
            <div className="bg-[#1B272C] p-1 rounded-xl flex md:mt-0 mt-2 ">
              <button className="md:p-3 md:px-8 px-8 p-2">Back</button>
              <button className="bg-[#DC4F13] md:p-3 px-8 p-2 w-full">
                Apply
              </button>
            </div>
          </div>
        </div>
        <p className="text-medGray text-sm p-4">
          * Refundable Dispute Fee will be charged in case the client accepts
          the offer
        </p>
      </div>
    </div>
  );
};

export default Page;
