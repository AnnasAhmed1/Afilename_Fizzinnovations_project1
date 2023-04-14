import React, { useState } from "react";
import { Karla, Maven_Pro } from "next/font/google";
import EastIcon from "@mui/icons-material/East";
import { Modal, TextField } from "@mui/material";
import Login from "./login";
import { handleInsertAction } from "@/config/API_actions";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
const karla = Karla({ subsets: ["latin"] });
const mavenPro = Maven_Pro({ subsets: ["latin"] });

export default function Signup({
  heading,
  handleChange,
  handleSubmit,
  
}: {
  heading:string,
  handleSubmit: any;
  handleChange: any;
}) {
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  return (
    <>
      <div
        className="
        flex
        flex-col
        bg-white
        dark:bg-[#121212]
        dark:border-[#121212]
        pt-4
        pb-8
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
          className={`
          ${karla.className} font-extrabold 
          text-4xl
          md:text-3xl
          sm:text-2xl
          mb-2
          text-center 
          text-[rgba(0,0,0,0.75) 
          `}
        >
          {heading}
        </h3>
        <hr />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(email);
          }}
          className="
          w-full
          px-12
          md:px-8
          sm:px-6
          mt-12
          md:mt-10
          sm:mt-8
          "
        >
          <TextField
            id="filled-textarea"
            label="Email"
            placeholder="email@example.com"
            className="text-white  dark:bg-[#ececec]"
            required
            sx={{
              width: "100%",
              marginBottom: "3rem",
              color: "white",
              "@media (min-width: 768px, max-width: 1023px)": {
                marginBottom: "2.5rem",
              },
              "@media (max-width: 767px)": {
                marginBottom: "2rem",
              },
            }}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button
            className={`${mavenPro.className}
            block 
            py-[15px]
            md:py-[10px] 
            sm:py-[10px] 
            w-[65%] 
            mx-auto 
            font-base 
            text-center
            bg-[#0066FF] 
            rounded-[5px]
          text-white`}
            type={"submit"}
          >
            Continue
            <EastIcon
              sx={{ color: "#ffffff !important" }}
              className="text-base ml-3"
            />
          </button>
        </form>
        <h6
          className={`
          ${karla.className} 
          pt-10
          md:pt-8
          sm:pt-6
          font-light ß
          text-[13px] 
          text-center`}
        >
          By signing in you agree to our legal policies.
        </h6>
      </div>
    </>
  );
}
