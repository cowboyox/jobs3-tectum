'use client';
import React, { createContext, useContext } from 'react';
const Panel = createContext();

const PanelContainer = ({ children, nested }) => {
  return (
    <Panel.Provider>
      <div
        className={` ${
          nested ? 'bg-[#1B272C] p-5 mobile:p-3' : 'bg-[#10191D] p-7 mobile:px-3'
        } flex w-full flex-col gap-5 rounded-xl`}
      >
        {children}
      </div>
    </Panel.Provider>
  );
};

export default PanelContainer;
