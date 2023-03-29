import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Inter, Karla } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
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
      <div className="max-w-xs w-80 gap-8 flex items-center flex-col shadow-card py-9 rounded-2xl">
        <p
          className={`${karla.className} text-[#242634] text-14 font-bold w-full px-3.5`}
        >
          {name}
        </p>
        <hr className="w-full" />
        <p className={`${karla.className} font-bold text-4xl`}>${price}</p>
        <p className={`${karla.className} text-14 text-[rgba(0,0,0,0.85)]`}>
          {subtext}
        </p>
        <div className="flex flex-col gap-2">
          <p className={`${karla.className} text-14  font-bold`}>{plan}</p>
          <p
            className={`${karla.className} text-14  text-[rgba(0,0,0,0.85)] flex items-center gap-2`}
          >
            <CheckBoxIcon className="text-base text-blue-500" />5 GB Max File
            Size
          </p>
          <p
            className={`${karla.className} text-14  text-[rgba(0,0,0,0.85)] flex items-center gap-2`}
          >
            <CheckBoxIcon className="text-base text-blue-500" />
            Unlimited Storage
          </p>
          <p
            className={`${karla.className} text-14  text-[rgba(0,0,0,0.85)] flex items-center gap-2`}
          >
            <CheckBoxIcon className="text-base text-blue-500" />
            Unlimited Files
          </p>
          <p
            className={`${karla.className} text-14  text-[rgba(0,0,0,0.85)] flex items-center gap-2`}
          >
            <CheckBoxIcon className="text-base text-blue-500" />
            Saves files in the cloud
          </p>
        </div>
        <button
          className={`${karla.className} mt-16 mb-8 text-14 text-white bg-[#0066FF] rounded-full py-1 px-10 `}
        >
          {buttonText}
        </button>
        <p
          className={`${karla.className} text-[rgba(0,0,0,0.85)] w-52 text-11 `}
        >
          {bottomText}
        </p>
      </div>
    </>
  );
}
