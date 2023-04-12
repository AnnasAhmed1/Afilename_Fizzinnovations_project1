import { AppProps } from "next/app";
// import RootLayout from '../components/RootLayout';

import "../styles/globals.css";
import RootLayout from "../app/layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component />
    </RootLayout>
  );
}
