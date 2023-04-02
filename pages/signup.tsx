import * as React from "react";

import {  Karla, Maven_Pro } from "next/font/google";
import EastIcon from "@mui/icons-material/East";
import { TextField } from "@mui/material";
const karla = Karla({ subsets: ["latin"] });
const mavenPro = Maven_Pro({ subsets: ["latin"] });


export default function Signup() {
  return (
        <div
          className="
        flex
        gap-4
        flex-col
        bg-white
        py-[2%]
        rounded-[24px]
        w-[50%]
        border-2
        absolute
        top-[20%]
        right-[25%]"
        >
          <h3
            className={`${karla.className} font-extrabold text-4xl text-center text-[rgba(0,0,0,0.75)] `}
          >
            Signup
          </h3>
          <hr />
          <TextField
            id="filled-textarea"
            label="Email"
            placeholder="email@example.com"
            className="mx-12 my-[5%]"
          />
          <button
            className={`${mavenPro.className} block  py-[15px] w-[50%] mx-auto font-base text-center bg-[#0066FF] rounded-[5px] text-white`}
          >
            Continue
            <EastIcon className="text-base ml-3" />
          </button>
          <h6
            className={`${karla.className} pt-5 font-light text-[13px] text-center`}
          >
            By signing in you agree to our legal policies.{" "}
          </h6>
        </div>
  );
}
