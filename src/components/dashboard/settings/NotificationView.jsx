import { Button } from "@/components/ui/button";
import React from "react";

const NotificationView = () => {
  return (
    <div className="max-w-[700px] mx-auto flex flex-col gap-4">
      <div className="bg-[#10191D] rounded-[12px] p-8">
        <label htmlFor="billin" className="text-lg font-[500] text-primary">
          Notifications
        </label>
        <p className="text-[#96B0BD] text-md">
          For important updates regarding your JOBS3 activity, certain
          notifications cannot be disabled
        </p>

        <div className="bg-[#1B272C] rounded-[12px] p-6 flex flex-col gap-6 mt-6">
          <div className="flex">
            <div className="w-[31.5%]">Type</div>
            <div className="w-[31.5%] flex items-center">
              <label className="text-md font-[500] text-primary">Email</label>
            </div>
            <div className="w-[31.5%] flex items-center">
              <label className="text-md font-[500] text-primary">Mobile</label>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {[
              "Inbox Messages",
              "Order Messages",
              "Order Updates",
              "Rating Reminders",
              "My Gigs",
              "My Account",
            ].map((type, index) => (
              <div key={index} className="flex items-center">
                <div className="w-[31.5%]">
                  <label className="text-[#96B0BD] text-md">{type}</label>
                </div>
                <div className="w-[31.5%] flex justify-start items-center">
                  <input
                    type="checkbox"
                    className="accent-[#DC4F13] cursor-pointer"
                  />
                </div>
                <div className="w-[31.5%] flex justify-start items-center">
                  <input
                    type="checkbox"
                    className="accent-[#DC4F13] cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            className={`bg-[#DC4F13] hover:bg-[#DC4F13] text-white px-10 py-8 mt-6 rounded-xl w-[200px]`}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationView;
