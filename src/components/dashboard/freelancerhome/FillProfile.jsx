import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const FillProfile = () => {
  return (
    <div className="mt-10 flex  flex-col justify-between rounded-2xl bg-deepGreen gap-4 p-8 md:flex-row h-full">
      <div className="flex h-full w-full flex-col justify-center gap-4">
        <h1 className="text-3xl font-semibold text-white">
          Fill out your profile 🤩
        </h1>
        <p className="text-sm text-medGray">
          Increase your chances of standing out on job applications and
          searches.
        </p>
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-2 md:w-1/5 md:flex-col">
        <Link href={"/dashboard/freelancer/profile"}>
          <Button
              className={`w-full md:w-[180px] rounded-xl bg-[#DC4F13] px-10 py-8 text-white hover:bg-[#DC4F13]`}
            >
            Edit Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FillProfile;
