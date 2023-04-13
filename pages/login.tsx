import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Inter, Karla, Maven_Pro } from "next/font/google";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import EastIcon from "@mui/icons-material/East";
import { TextField } from "@mui/material";
const inter = Inter({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });
const mavenPro = Maven_Pro({ subsets: ["latin"] });

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
("top-[50%] left-[50%] w-[400px] border-2 translate-x-1/2 translate-x-2/4");

{
  /* <Button onClick={handleOpen}>Open modal</Button> */
}
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
        className={`font pt-8 px-5 font-medium pb-10 text-[#262626] dark:text-[#ececec] text-base text-center`}
      >
        A login link was sent to you. You can check your email and click on the
        link or button.
        <br />
        Check spam or trash as some providers may have placed it there.
      </h6>
    </div>
  );
}
