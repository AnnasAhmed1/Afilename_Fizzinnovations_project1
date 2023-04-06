import Image from "next/image";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { Inter, Karla } from "next/font/google";
import { P1 } from "./helper";
import Link from "next/link";
import { Box, Modal, Typography } from "@mui/material";
import Signup from "../pages/signup";
import Login from "../pages/login";
import { handleInsertAction } from "@/config/API_actions";
import { API } from "@/config/API";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  function scrollToSection(e: any, id: string) {
    e.preventDefault();
    const element = document.querySelector(`#${id}`);
    element?.scrollIntoView({ behavior: "smooth" });
  }
  const [ref, setRef] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const handleVerifyModalOpen = () => setVerifyModalOpen(true);
  const handleVerifyModalClose = () => setVerifyModalOpen(false);

  const [email, setEmail] = useState("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const handleSubmit = async (email: string) => {
    await handleInsertAction("/account/signin/", {
      email: email,
    })
      .then((res: any) => {
        console.log(email);
        console.log(res.data);
        handleModalClose();
        handleVerifyModalOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav
      className="
    flex 
    justify-between 
    items-center 
    px-[2%] 
    pt-4 
    pb-[7%]"
    >
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="rounded-s-3xl"
      >
        <Box>
          <Signup
            handleChange={handleChange}
            handleSubmit={() => handleSubmit(email)}
          />
        </Box>
      </Modal>

      <Modal
        open={verifyModalOpen}
        onClose={handleVerifyModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="rounded-s-3xl"
      >
        <Box>
          <Login />
        </Box>
      </Modal>
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
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleMenuClose}>Upload</MenuItem>
          <MenuItem onClick={handleMenuClose}>Personal</MenuItem>
          <MenuItem onClick={handleMenuClose}>Business</MenuItem>
          <MenuItem onClick={handleMenuClose}>Creators</MenuItem>
          <MenuItem onClick={handleMenuClose}>Docs</MenuItem>
        </Menu>
      </div>

      <div
        className={`flex  items-center gap-4 md:gap-3 sm:gap-1.5 ${karla.className}`}
      >
        <Image
          src={require("../images/logo.svg")}
          alt="logo"
          className="
          w-7
          md:w-8
          sm:w-4
          "
        />
        <h1 className="text-4xl md:text-3xl sm:text-xl text-[rgba(0,0,0,0.75)] font-extrabold">
          AFILENAME
        </h1>
      </div>
      <div
        className={`flex flex-1 justify-center gap-12 md:hidden sm:hidden md:gap-8`}
      >
        <a
          className="scroll-smooth cursor-pointer"
          onClick={(e) => scrollToSection(e, "upload")}
        >
          <P1 text="Upload" />
        </a>
        <a
          className="scroll-smooth cursor-pointer"
          onClick={(e) => scrollToSection(e, "personal")}
        >
          <P1 text="Personal" />
        </a>
        <a
          className="scroll-smooth cursor-pointer"
          onClick={(e) => scrollToSection(e, "business")}
        >
          <P1 text="Business" />
        </a>
        <a
          className="scroll-smooth cursor-pointer"
          onClick={(e) => scrollToSection(e, "creators")}
        >
          <P1 text="Creators" />
        </a>
        <Link href="/docs" legacyBehavior>
          <a className="scroll-smooth cursor-pointer">
            <P1 text="Docs" />
          </a>
        </Link>
      </div>
      <div
        className="
        flex
        gap-2.5
        sm:gap-1.5
    "
      >
        <button
          className="border 
          py-2.5 
          md:p-1.5 
          sm:p-1 
          border-black 
          w-28 
          sm:w-14 
          md:w-24"
          onClick={() => {
            handleModalOpen();
          }}
        >
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
          onClick={() => {
            handleModalOpen();
          }}
        >
          Login
        </button>
      </div>
    </nav>
  );
}
