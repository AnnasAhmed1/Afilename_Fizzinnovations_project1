import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Karla } from "next/font/google";

const karla = Karla({ subsets: ["latin"] });
export default function PlanCard({
  name,
  price,
  subtext,
  plan,
  buttonText,
  bottomText,
  services,
}: {
  name: string;
  price: string;
  subtext: boolean;
  plan: string;
  buttonText: string;
  bottomText: string;
  services: Array<string>;
}) {
  return (
    <>
      <div
        className={`${karla.className}
         max-w-xs sm:w-72
          text-[#242634]
           w-80 gap-6
            sm:gap-4 
            flex 
            items-center 
            flex-col
             shadow-card 
             pt-9 
             
            //  /h-[85vh]
            //   /sm:h-[75vh] 
              overflow-hidden
               rounded-2xl 
               relative`}
      >
        <p className={` text-[#242634] text-14 font-bold w-full px-3.5`}>
          {name}
        </p>
        <hr className="w-full" />
        <div>
          <p className={` font-bold pb-4 text-[#242634] text-4xl sm:text-3xl`}>
            ${price}
          </p>
          <p
            className={` text-14 sm:text-xs ${
              !subtext ? "text-white" : "text-[rgba(0,0,0,0.85)]"
            }`}
          >
            Billed Monthly
          </p>
        </div>
        <div className="flex flex-col gap-2 px-14 h-[300px]">
          <p className={` text-14 sm:text-xs font-bold`}>{plan}</p>
          {services?.map((v, i) => {
            return (
              <p
                key={i}
                className={` text-14 sm:text-xs text-[rgba(0,0,0,0.85)] flex items-center gap-2`}
              >
                <CheckBoxIcon className="text-base text-blue-500" />
                {v}
              </p>
            );
          })}
        </div>
        <button
          className={`  mb-8 bottom-24 sm:bottom-16 text-14 text-white bg-[#0066FF] rounded-full py-1 px-10 sm:px-6`}
        >
          {buttonText}
        </button>
        <p
          className={` text-[rgba(0,0,0,0.85)] bottom-8 sm:bottom-6 mb-[4%] w-52 text-11 `}
        >
          {bottomText}
        </p>
      </div>
    </>
  );
}
