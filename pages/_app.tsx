import { AppProps } from "next/app";
// import RootLayout from '../components/RootLayout';
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import RootLayout from "../app/layout";
import { ToastContainer } from "react-toastify";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <>
        <ToastContainer position="top-center" />
        <Component />
      </>
    </RootLayout>
  );
}
