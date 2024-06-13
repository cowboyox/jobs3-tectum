"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { CircleAlert, CreditCardIcon } from "lucide-react";
import { IoWarning } from "react-icons/io5";

const BillingView = () => {
  const [addBilling, setBilling] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  return (
    <div className="max-w-[700px] mx-auto flex flex-col gap-4">
      <div className="bg-[#10191D] rounded-[12px] p-8">
        {addBilling ? (
          <div className="flex flex-col gap-4">
            <label htmlFor="billin" className="text-lg font-[500] text-primary">
              Add a Billing Method
            </label>

            <div className="bg-[#1B272C] rounded-[12px] p-6 flex flex-col gap-4 ">
              <div className="flex items-start gap-6">
                {" "}
                <input
                  type="radio"
                  name="billingMethod"
                  value="card"
                  onClick={() => setPaymentMethod("card")}
                  className="mt-1 h-6 w-6 accent-[#DC4F13] cursor-pointer"
                />
                <div>
                  <label
                    htmlFor="status"
                    className="text-lg font-[500] text-primary "
                  >
                    Payment Card
                  </label>
                  <p className="text-[#96B0BD]">
                    Visa, Mastercard, American Express, Discover, Diners
                  </p>
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="cardNumber"
                      className="text-md font-[500] text-primary"
                    >
                      Card Number
                    </label>
                    <div className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C] text-[#96B0BD] flex gap-4">
                      <CreditCardIcon className="text-white h-6 w-6" />
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="flex-1  bg-[#1B272C] text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col gap-3 flex-1">
                      <label
                        htmlFor="cardNumber"
                        className="text-md font-[500] text-primary"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C] text-[#96B0BD]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 flex-1">
                      <label
                        htmlFor="cardNumber"
                        className="text-md font-[500] text-primary"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C] text-[#96B0BD]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col gap-3 w-[31.5%]">
                      <label
                        htmlFor="cardNumber"
                        className="text-md font-[500] text-primary"
                      >
                        Expiration Month
                      </label>
                      <input
                        type="text"
                        placeholder="mm"
                        className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C] text-[#96B0BD]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 w-[31.5%]">
                      <label
                        htmlFor="cardNumber"
                        className="text-md font-[500] text-primary"
                      >
                        Expiration Year
                      </label>
                      <input
                        type="text"
                        placeholder="yy"
                        className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C] text-[#96B0BD]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 w-[31.5%]">
                      <label
                        htmlFor="cardNumber"
                        className="text-md font-[500] text-primary flex items-start gap-2"
                      >
                        Security Code <CircleAlert className="h-4 w-4" />
                      </label>
                      <input
                        type="text"
                        placeholder="3 digits"
                        className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C] text-[#96B0BD]"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-3 flex-1">
                      <label
                        htmlFor="cardNumber"
                        className="text-md font-[500] text-primary"
                      >
                        Billing Address
                      </label>
                      <input
                        type="text"
                        placeholder="United Kingdom"
                        className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C] text-[#96B0BD]"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-3 flex-1">
                      <label
                        htmlFor="cardNumber"
                        className="text-md font-[500] text-primary"
                      >
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C] text-[#96B0BD]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 flex-1">
                      <label
                        htmlFor="cardNumber"
                        className="text-md font-[500] text-primary"
                      >
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        placeholder="Optional"
                        className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C] text-[#96B0BD]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col gap-3 flex-1">
                      <label
                        htmlFor="cardNumber"
                        className="text-md font-[500] text-primary"
                      >
                        City
                      </label>
                      <select className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C] text-[#96B0BD] pr-4">
                        <option className="text-[#96B0BD]" value="London">
                          London
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-3 flex-1">
                      <label
                        htmlFor="cardNumber"
                        className="text-md font-[500] text-primary"
                      >
                        Postal code
                      </label>
                      <input
                        type="text"
                        placeholder="100001"
                        className="border border-[#96B0BD] p-4 rounded-[12px] bg-[#1B272C] text-[#96B0BD]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-[#1B272C] rounded-[12px] p-6 flex mt-4 items-start gap-6">
              <input
                type="radio"
                name="billingMethod"
                value="paypal"
                onClick={() => setPaymentMethod("paypal")}
                className="mt-1 h-6 w-6 accent-[#DC4F13] cursor-pointer"
              />
              <div>
                <label
                  htmlFor="status"
                  className="text-lg font-[500] text-primary"
                >
                  Paypal
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              {" "}
              <Button
                onClick={() => setBilling(false)}
                className={`bg-[#DC4F13] hover:bg-[#DC4F13] text-white px-10 py-8 mt-6 rounded-xl w-[200px]`}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <label htmlFor="billin" className="text-lg font-[500] text-primary">
              Billing Methods
            </label>
            <p className="text-[#96B0BD] text-md">
              You haven&apos;t set up any billing methods yet. Your billing
              method will be charged only when your available balance from JOBS3
              earnings is not sufficient to pay for your monthly membership
            </p>
            
            <div className="flex justify-end">
            <Button
              onClick={() => setBilling(true)}
              className={`bg-[#DC4F13] hover:bg-[#DC4F13] text-white px-10 py-8 mt-6 rounded-xl w-[200px]`}
            >
              Add Billing Method
            </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BillingView;