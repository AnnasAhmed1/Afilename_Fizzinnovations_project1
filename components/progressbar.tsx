import React from "react";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";

const ProgressBar = ({ progress }: { progress: any }) => {
  return (
    <div className="relative flex-1 ">
      <div className="overflow-hidden h-2 text-xs flex rounded bg-[#D3D0D0]">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#1890FF]"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
