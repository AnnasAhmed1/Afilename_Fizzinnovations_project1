// import Navbar from "";
import BusinessPlanCard from "@/components/business_plan_card";
import Footer from "@/components/footer";
import { H1 } from "@/components/helper";
import Navbar from "@/components/navbar";
import PlanCard from "@/components/plan_card";
import Cookies from "js-cookie";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Inter, Karla } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });

export default function Main() {
  return (
    <div className="scroll-smooth ">
      <Navbar />
      <section className="flex flex-col items-center gap-20 sm:gap-14 px-[5%] sm:px-[4%]">
        <h1
          className={`font-karla text-6xl sm:text-3xl md:text-5xl  font-bold text-[#242634] text-center`}
        >
          Store whatever you want, when you want
        </h1>
        <p
          className={`font-karla text-xl sm:text-sm text-[#242634] text-center`}
        >
          Simple file sharing, storage, at a fair price.
          <br />
          Stop overpaying with gigantic media companies.
          <br />
          Securely store whatever you can dream and create.
        </p>
        <section
          id="upload"
          className={`font-karla flex flex-col items-center gap-4`}
        >
          <H1 text="Upload A File Now" />

          <button
            className={`font-karla text-14 sm:text-xs text-center bg-[#0066FF] text-white py-1 px-10 sm:px-7 rounded-full`}
          >
            Upload a file
          </button>
        </section>
        <section id="personal" className="pb-[15%]">
          <H1 text="Personal" />

          <p
            className={`font-karla text-2xl sm:text-base text-[#242634] pt-[10%] font-bold text-center`}
          >
            Personal Plans
          </p>
          <p
            className={`font-karla text-base pb-[3%] sm:text-sm text-[#242634]  font-bold text-center`}
          >
            For personal use only.
          </p>
          <div className="flex flex-wrap sm:flex-col justify-center gap-8">
            <PlanCard
              name="Bundled"
              price="0.00"
              subtext={false}
              plan="The Bundled Plan includes"
              buttonText="Get with a bundle"
              bottomText="Bundle can be purchased with an additional product or separately with one of our authorized resellers."
              services={[
                "5 GB Max File Size",
                "Unlimited Storage",
                "Unlimited Files",
                "Save files in the cloud",
              ]}
            />
            <PlanCard
              name="Premium"
              price="2.99"
              subtext={true}
              plan="The Premium Plan includes"
              buttonText="Start Now"
              bottomText=""
              services={[
                "5 GB Max File Size",
                "Unlimited Storage",
                "Unlimited Files",
                "Save files in the cloud",
              ]}
            />
            <PlanCard
              name="Premium Pro"
              price="6.99"
              subtext={true}
              plan="The Premium Pro Plan includes"
              buttonText="Start Now"
              bottomText=""
              services={[
                "5GB Max Per Each File",
                "Multi Part Files",
                "End to end encryption (on the desktop application)",
                "Unlimited Files",
                "Unlimited Storage",
                "Save files in the cloud",
              ]}
            />
          </div>
        </section>
        <section id="business" className="pb-[15%] ">
          <H1 text="Business Pricing" />

          <p
            className={`font-karla text-xl md:text-base sm:text-sm text-center font-semibold`}
          >
            Consumption-Based Rate Comparison
            <br />
            Pay as you go
            <br />
            Billing is to your balance
          </p>
          <div className="flex flex-wrap justify-center gap-8 pt-[8%]">
            <BusinessPlanCard
              name="AFILENAME"
              image="afilename"
              price="0.99"
              price1="0.30"
              button={true}
              subtext={false}
              plan="The Bundled Plan includes"
              buttonText="Get with a bundle"
              bottomText="Bundle can be purchased with an additional product or separately with one of our authorized resellers."
              services={[
                { title: "No hidden fees", icon: "tick" },
                { title: "No transfer fees", icon: "tick" },
                { title: "Unlimited Web Downloads", icon: "tick" },
                { title: "Encyption", icon: "tick" },
              ]}
            />
            <BusinessPlanCard
              name="MEGA"
              image="mega"
              price="2.69"
              price1="2.69"
              button={false}
              subtext={false}
              plan="The Bundled Plan includes"
              buttonText="Get with a bundle"
              bottomText="Bundle can be purchased with an additional product or separately with one of our authorized resellers."
              services={[
                { title: "Encyption", icon: "tick" },
                { title: "Limited API", icon: "stop" },
                { title: "Limited Transfer", icon: "stop" },
                { title: "Limited Users", icon: "stop" },
              ]}
            />
          </div>
        </section>
        <section id="creators" className={`font-karla text-center `}>
          <H1 text="Creators" />
          <p className="text-xl md:text-base sm:text-sm font-semibold py-8">
            Get <b>100% </b>
            of revenue, excluding third party payment processing fees, directly
            to you.
            <br />
            Only pay 30 cents per TB (streamed/downloaded) of anything you send.
            Its simply inexpensive.
            <br />
            Upload videos, clips, music and photos of nearly anything you can
            imagine.
          </p>

          <button className="text-white text-sm sm:text-xs my-10 bg-[#0066FF] block w-44 sm:w-40 mx-[auto] rounded-2xl px-5 sm:px-4 py-1">
            Upload a Video Now
          </button>
          <button className="text-white text-sm sm:text-xs my-10 bg-[#5F5E5E] block w-44 sm:w-40 mx-[auto] rounded-2xl px-5 sm:px-4 py-1">
            Upload a Music
          </button>
          <button className="text-white text-sm sm:text-xs my-10 bg-[#B1B3B6] block w-44 sm:w-40 mx-[auto] rounded-2xl px-5 sm:px-4 py-1">
            Upload a Clip Now
          </button>
        </section>
      </section>
      <Footer />
    </div>
  );
}
