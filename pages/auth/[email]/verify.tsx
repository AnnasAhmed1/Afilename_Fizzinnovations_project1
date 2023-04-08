import Cookies from "js-cookie";
import { base_url } from "@/config/API";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import "../../../styles/globals.css";
import "tailwindcss/tailwind.css";
import { handleInsertAction } from "@/config/API_actions";

function VerifyPage({ query }: { query: any }) {
  const router = useRouter();
  const { email, token } = router.query;
  const verifyLogin = async () => {
    email && token
      ? handleInsertAction("/account/verify", {
          email,
          token,
        })
          .then(function (res: any) {
            Cookies.set("email", res.data.email);
            Cookies.set("apikey", res.data.apikey);
            router.push("/docs");
          })
          .catch((error) => {
            console.log(error);
          })
      : console.log(email, token, "not found");
  };
  useEffect(() => {
    verifyLogin();
  }, []);
  return (
    <div
      className="
      flex
      justify-center
      items-center
      h-screen
    "
    >
      <CircularProgress size={"70px"} />
    </div>
  );
}
VerifyPage.getInitialProps = async (ctx: any) => {
  return { query: ctx.query };
};
export default VerifyPage;
