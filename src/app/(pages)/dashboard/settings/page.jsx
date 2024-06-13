"use client";
import React, { useState } from "react";
import AccountView from "@/components/dashboard/settings/AccountView";
import BillingView from "@/components/dashboard/settings/BillingView";
import NotificationView from "@/components/dashboard/settings/NotificationView";

const buttonTexts = [
  "Account",
  "Billing and Payments",
  "Password and Security",
  "Notifications",
];


const Page = () => {
  const [selectedTab, setSelectedTab] = useState("Account");

 return (
    <>
      <div className="flex max-w-[1130px] mx-auto bg-[#1B272C] rounded-tl-[12px] rounded-tr-[12px]">
        {buttonTexts.map((item, index) => (
          <div
            key={index}
            className={`flex-1 py-6 text-center text-white cursor-pointer border-b-4 ${
              selectedTab === item ? " border-[#DC4F13]" : "border-[#516170]"
            }`}
            onClick={() => setSelectedTab(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="mt-10">
        {selectedTab === "Account" && (
        <AccountView />
        )}
        {selectedTab === "Billing and Payments" && (
        <BillingView />
        )}
        {selectedTab === "Password and Security" && (
        <AccountView />
        )}
        {selectedTab === "Notifications" && (
        <NotificationView />
        )}
      </div>
    </>
  );
};

export default Page;
