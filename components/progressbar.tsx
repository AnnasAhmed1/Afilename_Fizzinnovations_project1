import React, { useState } from "react";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";

const ProgressBar = ({ progress }: { progress: any }) => {
  const [uploadProgess, setUploadProgress] = useState(0);

  const updateProgress = (event: any) => {
    const percentage = Math.round((100 * event.loaded) / event.total);
    console.log(percentage);
    setUploadProgress(percentage);
  };
  return (
    <section className="relative flex-1 ">
      <div className="overflow-hidden h-2 text-xs flex rounded bg-[#D3D0D0]">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#1890FF]"
        ></div>
      </div>
    </section>
  );
};

export default ProgressBar;
