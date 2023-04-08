import { Inter, Karla } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });

export function P1({ text }: { text: string }) {
  return (
    <p
      className={`text-base sm:text-xs text-[#131313] font-bold ${inter.className}`}
    >
      {text}
    </p>
  );
}
export function H1({ text }: { text: string }) {
  return (
    <h1
      className={
        `text-4xl ${karla.className} tracking-[1.5px] md:text-3xl sm:text-xl text-[#242634] font-bold text-center`
      }
    >
      {text}
    </h1>
  );
}
