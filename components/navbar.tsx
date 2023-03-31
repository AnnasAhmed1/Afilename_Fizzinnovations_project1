import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { Inter, Karla } from "next/font/google";
import { P1 } from "./helper";

const inter = Inter({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <nav className="flex justify-between items-center px-[2%] pt-4 pb-[4%]">
      <div
        className="
      hidden
      md:block
      sm:block
      "
      >
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="w-fit min-w-0"
        >
          <MenuIcon
            className="
           text-black
           "
          />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Upload</MenuItem>
          <MenuItem onClick={handleClose}>Personal</MenuItem>
          <MenuItem onClick={handleClose}>Business</MenuItem>
          <MenuItem onClick={handleClose}>Creators</MenuItem>
          <MenuItem onClick={handleClose}>Docs</MenuItem>
        </Menu>
      </div>

      <div
        className={`flex  items-center gap-4 md:gap-3 sm:gap-1.5 ${karla.className}`}
      >
        <Image
          src={require("../images/logo.svg")}
          alt="logo"
          // width={30}
          className="
          md:w-8
          sm:w-4
          "
          // className="w-4"
        />
        <h1 className="text-4xl md:text-3xl sm:text-xl text-[rgba(0,0,0,0.75)] font-extrabold">
          AFILENAME
        </h1>
      </div>
      <div
        className={`flex flex-1 justify-center gap-12 md:hidden sm:hidden md:gap-8`}
      >
        <P1 text="Upload" />
        <P1 text="Personal" />
        <P1 text="Business" />
        <P1 text="Creators" />
        <P1 text="Docs" />
      </div>
      <div
        className="
    flex
    gap-2.5
    sm:gap-1.5
    "
      >
        <button className="border py-2.5 md:p-1.5 sm:p-1 border-black w-28 sm:w-14 md:w-24">
          <P1 text="Signup" />
        </button>
        <button
          className="border py-2.5 
        border-transparent
         bg-black 
         md:p-1.5
         sm:p-1
         text-base 
          font-bold 
         ${inter.className}
          text-white 
          w-28
          md:w-24
          sm:w-14
          sm:text-xs
          "
        >
          Login
        </button>
      </div>
    </nav>
  );
}
