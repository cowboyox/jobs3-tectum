"use client";

import React from "react";
const { useState } = React;

// Context API
import Context from "./Context";

const ContextProvider = ({ children }) => {
  // Context API States
  const [loading, setLoading] = useState(true);
  const [loadCompleted, setLoadCompleted] = useState(true);
  const [load3D, setLoad3D] = useState(0);
  const [scrollPause, setScrollPause] = useState(false);

  return (
    <Context.Provider
      value={{
        preloader: [loading, setLoading],
        loading3D: [load3D, setLoad3D],
        scroll: [scrollPause, setScrollPause],
        loader: [loadCompleted, setLoadCompleted],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
