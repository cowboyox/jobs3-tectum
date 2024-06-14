"use client";

import React from "react";
import ApplicationBody from "./ApplicationBody";

export default function ApplicationPage() {
  return (
    <div className="flex flex-row items-center gap-8">
      <div className="w-9/12  bg-darkGray">
        <ApplicationBody />
      </div>
      <div className="w-3/12">
        <ApplicationBody />
      </div>
    </div>
  );
}
