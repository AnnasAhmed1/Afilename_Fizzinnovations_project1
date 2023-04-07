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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Karla:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* <link rel="shortcut icon" href="app/afilename_logo.svg" /> */}
      </Head>
      <body>{children}</body>
    </html>
  );
}
