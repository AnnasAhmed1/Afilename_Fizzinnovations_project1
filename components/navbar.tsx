import Image from "next/image";
import { Inter, Karla } from "next/font/google";
import { P1 } from "./helper";

const inter = Inter({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 pt-4">
      <div className={`flex items-center gap-4 ${karla.className}`}>
        <Image
          src={require("../images/logo.svg")}
          alt="logo"
          width={30}
          // className="w-4"
        />
        <h1 className="text-4xl font-extrabold" >AFILENAME</h1>
      </div>
      <div className={`flex flex-1 justify-center gap-12`}>
        <P1 text="Upload"/>
        <P1 text="Personal"/>
        <P1 text="Business"/>
        <P1 text="Creators"/>
        <P1 text="Docs"/>
      </div>
      <div
        className="
    flex
    gap-2.5
    "
      >
        <button className="border py-2.5 border-black w-28"><P1 text="Signup"/></button>
        <button className="border py-2.5 border-transparent bg-black text-white w-28"><P1 text="Login"/></button>
      </div>
    </nav>
  );
}
