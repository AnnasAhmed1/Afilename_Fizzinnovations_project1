import { Inter, Karla } from "next/font/google";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";

const inter = Inter({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });

export function P1({ text }: { text: string }) {
  return (
    <p
      className={`text-base sm:text-xs text-[#131313] dark:text-[#ffffff] font-bold ${inter.className}`}
    >
      {text}
    </p>
  );
}
export function H1({ text }: { text: string }) {
  return (
    <h1
      className={`text-4xl ${karla.className} tracking-[1.5px] md:text-3xl sm:text-xl text-[#242634]
 dark:text-[#ffffff] font-bold text-center`}
    >
      {text}
    </h1>
  );
}
