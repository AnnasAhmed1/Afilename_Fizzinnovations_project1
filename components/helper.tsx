import { Inter, Karla } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function P1({ text }: { text: string }) {
  return (
    <p
      className={`text-base sm:text-xs text-[#131313] font-bold ${inter.className}`}
    >
      {text}
    </p>
  );
}
