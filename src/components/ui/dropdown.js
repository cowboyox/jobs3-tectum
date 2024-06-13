import React, { forwardRef, useState } from "react";

export default forwardRef(function CustomIconDropDown(
  { options, onChange, value, optionLabel, ...props },
  ref
) {
  const [open, setOpen] = useState(false);
  const onClick = (v) => {
    onChange(v);
    setOpen(false);
  };

  return (
    <div className="relative cursor-pointer" ref={ref}>
      <div
        className={
          "flex flex-row gap-2 items-center p-2 bg-[#1B272C] rounded-[10px] "
        }
        onClick={() => setOpen((prev) => !prev)}
      >
        {value?.[optionLabel]}
        <svg
          width="12"
          height="6"
          viewBox="0 0 12 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.1426 0.759766L7.02642 4.87593C6.54031 5.36204 5.74485 5.36204 5.25874 4.87593L1.14258 0.759766"
            stroke="#96B0BD"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Dropdown menu */}
      <div
        className={`absolute w-full top-full right-0 mt-1 bg-[#1B272C] rounded-[10px]  shadow-md ${
          open ? "visible" : "hidden"
        }`}
      >
        <div className="flex flex-col gap-2 items-start">
          {options?.map((v, i) => (
            <div
              className="flex items-center gap-2 hover:bg-[#2B3942] p-2 rounded-[5px] cursor-pointer w-full"
              key={i}
              onClick={() => onClick(v)}
            >
              {v?.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
