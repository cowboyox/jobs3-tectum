import { minutesDifference } from "@/utils/Helpers";
import Image from "next/image";
import React from "react";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { MdAccessTime } from "react-icons/md";

const Job = ({ gigData }) => {
    return (
        <div className="bg-deepGreen px-6 py-6 flex flex-col gap-4 text-white rounded-2xl">
            <div className="pb-5 border-b border-lightGray flex flex-col gap-3">
                <div className="flex gap-4 items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <Image
                            src={"/assets/icons/ActiveOrder.png"}
                            width={45}
                            height={45}
                        />
                        <h3 className="text-white hidden md:block text-xl font-semibold whitespace-nowrap">
                            {gigData.data.data.gigTitle}
                        </h3>
                    </div>
                    <div className="flex gap-6 items-center">
                        <FaRegHeart className="text-medGray text-xl" />
                        <IoIosMore className="text-medGray text-xl" />
                    </div>
                </div>
                <h3 className="text-white md:hidden text-xl font-semibold whitespace-nowrap">
                    {/* {gig.title} */} Figma and Flow bite mentor needed
                </h3>
                <div className="flex  gap-4 flex-wrap justify-end">
                    <div className="flex gap-1 items-center">
                        <MdAccessTime className="text-medGray text-xl" />
                        <span>
                        {minutesDifference(gigData.data.data.gigPostDate)}
                        </span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.75 13.4299C14.4731 13.4299 15.87 12.0331 15.87 10.3099C15.87 8.58681 14.4731 7.18994 12.75 7.18994C11.0269 7.18994 9.63 8.58681 9.63 10.3099C9.63 12.0331 11.0269 13.4299 12.75 13.4299Z"
                                stroke="#96B0BD"
                                stroke-width="1.5"
                            />
                            <path
                                d="M4.37001 8.49C6.34001 -0.169998 19.17 -0.159997 21.13 8.5C22.28 13.58 19.12 17.88 16.35 20.54C14.34 22.48 11.16 22.48 9.14001 20.54C6.38001 17.88 3.22001 13.57 4.37001 8.49Z"
                                stroke="#96B0BD"
                                stroke-width="1.5"
                            />
                        </svg>
                        <span>{gigData.data.data.location}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <FaRegUser className="text-medGray text-xl" />
                        <span>{gigData.data.data.proposalUsers.length} Applicants</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.42188 14.3298C9.42188 15.6198 10.4119 16.6598 11.6419 16.6598H14.1519C15.2219 16.6598 16.0919 15.7498 16.0919 14.6298C16.0919 13.4098 15.5619 12.9798 14.7719 12.6998L10.7419 11.2998C9.95187 11.0198 9.42188 10.5898 9.42188 9.36984C9.42188 8.24984 10.2919 7.33984 11.3619 7.33984H13.8719C15.1019 7.33984 16.0919 8.37984 16.0919 9.66984"
                                stroke="#96B0BD"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M12.75 6V18"
                                stroke="#96B0BD"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M12.75 22C18.2728 22 22.75 17.5228 22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22Z"
                                stroke="#96B0BD"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>

                        <span>
                            {gigData.data.data.gigPaymentType
                                ? `Hourly: $${gigData.data.data.minBudget}–$${gigData.data.data.maxBudget}`
                                : `Fixed: $${gigData.data.data.gigPrice}`}
                        </span>
                    </div>
                </div>
            </div>
            <p className="text-medGray text-sm">
                {gigData.data.data.gigDescription}
            </p>
            <h3 className="text-white hidden md:block text-xl font-semibold whitespace-nowrap">
                Skills
            </h3>
            <div className="flex gap-2 flex-wrap">
                {gigData.data.data.requiredSkills.map((skill, skillIndex) => (
                    <div
                        key={skillIndex}
                        className="bg-darkGray cursor-pointer py-1 px-2 text-center rounded-full border border-lightGray"
                    >
                        {skill}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Job;