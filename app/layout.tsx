// import './globals.css'
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Head from "next/head";

export const metadata = {
  title: "AFILENAME",
  description: "AFILENAME",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        {/* <link rel="shortcut icon" href="app/afilename_logo.svg" /> */}
      </Head>
      <body>{children}</body>
    </html>
  );
}
