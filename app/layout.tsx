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
        <link rel="shortcut icon" href="app/afilename_logo.svg" />
        {/* <style>{`
            @font-face {
              font-family: 'Karla';
              src: url('/fonts/static/Karla-Bold.tff'),
              url('/fonts/static/Karla-ExtraBold.tff')
              url('/fonts/static/Karla-ExtraLight.tff')
              url('/fonts/static/Karla-Light.tff')
              url('/fonts/static/Karla-Medium.tff')
              url('/fonts/static/Karla-Regular.tff')
              url('/fonts/static/Karla-SemiBold.tff')
              font-weight: normal;
              font-style: normal;
            }
            @font-face {
              font-family: 'Inter';
              src: url('/fonts/static/Inter-Bold.tff'),
              url('/fonts/static/Inter-ExtraBold.tff')
              url('/fonts/static/Inter-ExtraLight.tff')
              url('/fonts/static/Inter-Light.tff')
              url('/fonts/static/Inter-Medium.tff')
              url('/fonts/static/Inter-Regular.tff')
              url('/fonts/static/Inter-SemiBold.tff')
              font-weight: normal;
              font-style: normal;
            }
          `}</style> */}
      </Head>
      <body>{children}</body>
    </html>
  );
}
