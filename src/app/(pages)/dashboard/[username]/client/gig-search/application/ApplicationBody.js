import React from "react";
import BannerImage from "../../../../../../../assets/image/gigs/application_banner.png";
import NextImage from "next/image";

export default function ApplicationBody({}) {
  return (
    <div>
      <div className="flex flex-col p-4 rounded-xl">
        <NextImage src={BannerImage} />
        <p className="font-bold text-lg mt-4">
          Title of the searching Gig can be very long
        </p>
      </div>
    </div>
  );
}
