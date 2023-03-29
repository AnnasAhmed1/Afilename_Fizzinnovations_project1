import { Inter, Karla } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function P1({ text }: { text: string}) {
  return <p className={`text-xs font-bold ${inter.className}`}>{text}</p>;
}
