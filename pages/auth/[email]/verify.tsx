import Cookies from "js-cookie";
import { base_url } from "@/config/API";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import "../../../styles/globals.css";
import "tailwindcss/tailwind.css";

function VerifyPage() {
  const router = useRouter();
  const { email, token } = router.query;

  const [loading, setLoading] = useState(true);

  // Verify the email address and token here

  // useEffect(() => {
  //   verifyLogin(email, token);
  //   console.log("email==>", email);
  //   console.log("token==>", token);

  // }, [email]);

  const verifyLogin = async (email?: any, token?: any) => {
    console.log(email);
    console.log(token);
    await axios
      .post(`${base_url}/account/verify`, {
        email,
        token: token,
      })
      .then(async function (res) {
        Cookies.set("email", res.data.email);
        Cookies.set("apikey", res.data.apikey);
        console.log(res.data);
       
        router.push("/docs");
        console.log("navigaation", loading);
      })
      .catch(function (err) {
        console.log("err==>", err);
      });
  };
  setTimeout(() => {
    console.log("settimeout");
    verifyLogin(email, token);
  }, 5000);

  return (
    <div
    className="
   
    flex
    justify-center
    items-center
   h-screen

    "
    >
      <CircularProgress
      size={"70px"}
      />
      {/* <h1>Verification page for {email}</h1>
      <p>Token: {token}</p>
      <button
        onClick={() => {
          console.log(email);
          console.log(token);
          verifyLogin(email, token);
        }}
      ></button>
      <button
        onClick={() => {
          console.log(Cookies.get());
        }}
      >
        get
      </button>
      <button
        onClick={() => {
          console.log(Cookies.remove("email"));
          console.log(Cookies.remove("apike"));
        }}
      >
        remove
      </button> */}
      {/* Display verification status here */}
    </div>
  );
}

export default VerifyPage;
