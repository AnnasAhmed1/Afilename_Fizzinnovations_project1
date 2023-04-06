import React, { useState } from "react";
import { Karla, Maven_Pro } from "next/font/google";
import EastIcon from "@mui/icons-material/East";
import { Modal, TextField } from "@mui/material";
import Login from "./login";
import { handleInsertAction } from "@/config/API_actions";
const karla = Karla({ subsets: ["latin"] });
const mavenPro = Maven_Pro({ subsets: ["latin"] });

export default function Signup() {
  const [email, setEmail] = useState("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handleSubmit = (email: string) => {
    handleInsertAction("/account/signin/", {
      email: "annasahmed1609@gmail.com",
    })
      .then((res) => {
        console.log(res);
        handleModalOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="rounded-s-3xl"
      >
        <Login />
      </Modal>
      <div
        className="
        flex
     
        flex-col
        bg-white
        pt-4
        pb-8
        rounded-[24px]
        w-[50%]
        border-2
        absolute
        top-[20%]
        right-[25%]"
      >
        <h3
          className={`
          ${karla.className} font-extrabold 
          text-4xl
         mb-2
          text-center 
          text-[rgba(0,0,0,0.75)]
          `}
        >
          Signup
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
          mt-12
          "
        >
          <TextField
            id="filled-textarea"
            label="Email"
            placeholder="email@example.com"
            required
            className="w-full  mb-12"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button
            className={`${mavenPro.className}
            block 
            py-[15px] 
            w-[65%] 
            mx-auto 
            font-base 
            text-center
             bg-[#0066FF] 
             rounded-[5px]
              text-white`}
            type={"submit"}
            onClick={() => {
              handleSubmit(email);
            }}
          >
            Continue
            <EastIcon className="text-base ml-3" />
          </button>
        </form>
        <h6
          className={`
          ${karla.className} 
          pt-10
          font-light 
          text-[13px] 
          text-center`}
        >
          By signing in you agree to our legal policies.
        </h6>
      </div>
    </>
  );
}
