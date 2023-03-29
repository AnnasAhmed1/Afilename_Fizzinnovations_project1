// import Navbar from "";

import Navbar from "@/components/navbar";
import PlanCard from "@/components/plan_card";
import { Inter, Kalam, Karla } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });

export default function Main() {
  return (
    <div className="flex flex-col gap-28">
      <Navbar />
      <div className="flex flex-col items-center gap-20 px-10">
        <h1 className={`${karla.className} text-6xl font-bold text-center`}>
          Store whatever you want, when you want
        </h1>
        <p className={`${karla.className} text-xl max-w-lg text-center`}>
          Simple file sharing, storage, at a fair price. Stop overpaying with
          gigantic media companies. Securely store whatever you can dream and
          create.{" "}
        </p>
        <div className={`${karla.className} flex flex-col items-center gap-4`}>
          <p className="text-4xl font-bold">Upload A File Now</p>
          <button
            className={`${karla.className} text-14 text-center bg-[#0066FF] text-white py-1 px-10 rounded-full`}
          >
            Upload a file
          </button>
        </div>
        <p className={`${karla.className} text-4xl font-bold`}>Personal</p>
        <div className="flex gap-8">
          <PlanCard
            name="Bundled"
            price="0.00"
            subtext={false}
            plan="The Bundled Plan includes"
            buttonText="Get with a bundle"
            bottomText="Bundle can be purchased with an additional product or separately with one of our authorized resellers."
            services={["", ""]}
          />
          <PlanCard
            name="Premium"
            price="2.99"
            subtext={true}
            plan="The Premium Plan includes"
            buttonText="Start Now"
            bottomText=""
            services={["", ""]}
          />
          <PlanCard
            name="Premium Pro"
            price="6.99"
            subtext={true}
            plan="The Premium Pro Plan includes"
            buttonText="Start Now"
            bottomText=""
            services={["", ""]}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

      {/* <p className="text-lg" >annas</p> */}
    </div>
  );
}
