import Image from "next/image";
import { Inter, Karla } from "next/font/google";
import { P1 } from "./helper";

const inter = Inter({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });

export default function Footer() {
  return (
    <>
      <nav
        className="
      border-t border-black
      flex
      items-center
      justify-center
      gap-5
      flex-wrap/
      flex-col/
      md:flex-col
      sm:flex-col
      py-10
      px-5
      "
      >
        <div
          className={`flex  items-center gap-4 md:gap-3 sm:gap-1.5 ${karla.className}`}
        >
          <Image
            src={require("../images/logo.svg")}
            alt="logo"
            // width={30}
            className="
            w-7
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
          className={`flex flex-1 md:flex-col sm:flex-col items-center justify-center gap-12 md:gap-6 sm:gap-4`}
        >
          <p className={`${inter.className} text-2xl font-bold`}>Legal</p>
          <P1 text="Terms" />
          <P1 text="Privacy Policy" />
          <P1 text="Refund Policy" />
          <P1 text="DMCA Policy" />
        </div>
        <p
          className={`${inter.className} text-[#131313] font-bold text-2xl md:text-xl sm:text-base`}
        >
          Contact Us
        </p>
      </nav>
      {/* <div
        className={`hidden md:flex sm:flex flex-wrap items-center justify-center sm:gap-4 md:gap-6`}
      >
        <p className={`${inter.className} text-2xl font-bold`}>Legal</p>
        <P1 text="Terms" />
        <P1 text="Privacy Policy" />
        <P1 text="Refund Policy" />
        <P1 text="DMCA Policy" />
      </div> */}
    </>
  );
}
