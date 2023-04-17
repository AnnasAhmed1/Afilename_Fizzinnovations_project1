import * as React from "react";
import { Karla } from "next/font/google";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
const karla = Karla({ subsets: ["latin"] });

export default function Login() {
  return (
    <div
      className="
        flex
        gap-4
        md:gap-3
        sm:gap-2
        flex-col
        bg-white
        dark:bg-[#121212]
        dark:border-[#121212]
        py-[2%]
        rounded-[24px]
        w-[50%]
        md:w-[70%]
        sm:w-[80%]
        border-2
        absolute
        top-[20%]
        right-[25%]
        md:right-[15%]
        sm:right-[10%]
        "
    >
      <h3
        className={`${karla.className} font-extrabold 
        md:text-3xl
        sm:text-2xl
        text-4xl text-center text-[rgba(0,0,0,0.75) 
  `}
      >
        Verify Login
      </h3>
      <hr />

      <h6
        className={`font pt-8 px-5 font-medium pb-10 text-[#262626] dark:text-[#ffffff] text-base text-center`}
      >
        A login link was sent to you. You can check your email and click on the
        link or button.
        <br />
        Check spam or trash as some providers may have placed it there.
      </h6>
    </div>
  );
}
