import "../styles/globals.css";
import "tailwindcss/tailwind.css";
export default function ButtonComp({ text }: { text: string})  {
  return (
    <button
      className="
  bg-gradient-to-r      
   from-[#2667F6]
   to-[#6921F0]
    text-white      
        px-3
    py-2  
    rounded-full
  "
    >
      {text}
    </button>
  );
}
