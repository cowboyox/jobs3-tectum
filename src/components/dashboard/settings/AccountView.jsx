import { Button } from "@/components/ui/button";
import React from "react";

const AccountView = () => {
  return (
    <div className="max-w-[700px] mx-auto flex flex-col gap-4">
      <div className="bg-[#10191D] rounded-[12px] p-8">
        <div className="bg-[#1B272C] rounded-[12px] p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="zkpId" className="text-lg font-[500] text-primary">
              ZKP ID
            </label>
            <input
              type="text"
              placeholder="13ec8d51"
              name=""
              id=""
              className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg font-[500] text-primary">
              Name
            </label>
            <input
              type="text"
              placeholder="Devin Miles"
              name=""
              id=""
              className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg font-[500] text-primary">
              Email
            </label>
            <input
              type="text"
              placeholder="devin@***.com"
              name=""
              id=""
              className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-lg font-[500] text-primary">
              Online Status
            </label>
            <p className="text-[#96B0BD]">
              When you&apos;re online your Gigs are visible under the Online
              search filters
            </p>
            <select className="border border-[#96B0BD] mt-2 p-4 rounded-[12px] bg-[#1B272C] text-[#96B0BD] pr-4">
              <option className="text-[#96B0BD]" value="Go Offile for ...">
                Go Offile for ...
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-[#10191D] rounded-[12px] p-8">
        <label htmlFor="accounts" className="text-lg font-[500] text-primary">
          Additional Accounts
        </label>
        <p className="text-[#96B0BD] text-md">
        Creating a new account allows you to use JOBS3 in different ways, while still having just one login.
        </p>
        <div className="flex justify-end mt-4">
        <Button
          className={`bg-[#DC4F13] hover:bg-[#DC4F13] text-white px-10 py-8 mt-6 rounded-xl`}
        >
          Add New Account
        </Button>
        </div>
      </div>
      <div className="bg-[#10191D] rounded-[12px] p-8">
        <div className="bg-[#1B272C] rounded-[12px] p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="zkpId" className="text-lg font-[500] text-primary">
              Time Zone
            </label>
            <input
              type="text"
              placeholder="UTC+03:00 Baghdad, Kuwait, Nairobi, Riyadh"
              name=""
              id=""
              className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg font-[500] text-primary">
              Address
            </label>
            <input
              type="text"
              placeholder="United Kindom"
              name=""
              id=""
              className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg font-[500] text-primary">
              Phone
            </label>
            <input
              type="text"
              placeholder="+ 45 7883 443-34-56"
              name=""
              id=""
              className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button
          className={`bg-[#FF3737] hover:bg-[#FF3737] text-white px-10 py-8 rounded-xl`}
        >
          Delete Account
        </Button>
        </div>
    </div>
  );
};

export default AccountView;