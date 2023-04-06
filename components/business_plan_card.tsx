import { Inter, Karla } from "next/font/google";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import StopIcon from "@mui/icons-material/Stop";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });
interface MyObject {
  title: string;
  icon: string;
}
export default function BusinessPlanCard({
  name,
  image,
  price,
  price1,
  button,
  subtext,
  plan,
  buttonText,
  bottomText,
  services,
}: {
  name: string;
  image: string;
  price: string;
  price1: string;
  button: boolean;
  subtext: boolean;
  plan: string;
  buttonText: string;
  bottomText: string;
  services: Array<object>;
}) {
  return (
    <>
      <div
        className="max-w-xs
       w-80 
       sm:w-72 
       gap-2 
       flex 
       items-center 
       flex-col 
       pb-[4%]
       shadow-card 
       pt-5 /h-[73vh] /sm:h-[65vh] overflow-hidden rounded-2xl relative"
      >
        <p
          className={`${karla.className} flex items-center text-3xl sm:text-2xl font-bold w-full gap-2 px-3.5`}
        >
          <Image
            src={require(`../images/${image}_logo.svg`)}
            alt="logo"
            className="w-10 h-10 sm:w-7 sm:h-7"
          />{" "}
          {name}
        </p>
        <hr className="w-full" />
        <div
          className={`${karla.className} text-center font-bold text-[#242634]`}
        >
          <p className="text-4xl sm:text-3xl">${price}</p>
          <p className="text-base sm:text-sm">
            /TB Stored
            <br /> +
          </p>
          <p className="text-4xl sm:text-3xl">${price1}</p>
          <p className="text-base sm:text-sm">
            / TB Transferred
            <br />
            (per month)
          </p>
        </div>
        <div className="flex flex-col gap-2 h-[180px] sm:gap-1 px-14 pt-3">
          {services?.map((v, i) => {
            const myObj = v as MyObject;
            return (
              <p
                key={i}
                className={`${karla.className} text-14 sm:text-xs  text-[rgba(0,0,0,0.85)] flex items-center gap-2`}
              >
                {myObj.icon == "stop" ? (
                  <StopIcon className="text-base border text-[#FF0100]" />
                ) : (
                  <CheckBoxIcon className="text-base text-blue-500" />
                )}
                ß{myObj.title}
              </p>
            );
          })}
        </div>
        {button ? (
          <button
            className={`${karla.className}  mb-8 bottom-7 text-14 text-white bg-[#0066FF] rounded-full py-1 px-10 sm:px-7`}
          >
            Contact us
          </button>
        ) : (
          <p
            className={`${karla.className} bottom-7 text-xs sm:text-[10] text-center font-bold`}
          >
            *Price based on the Pro III annual plan
            <br />
            *Pro Flexi at $16.24 a month
            <br />
            Requires 3 TB based storage
            <br />
            Additional Storage Billed at $2.69 per TB
          </p>
        )}
      </div>
    </>
  );
}
