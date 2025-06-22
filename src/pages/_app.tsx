import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {HCCFooter, HCCPageContainer} from "@/components/core-components"

export default function App({ Component, pageProps }: AppProps) {
  return <HCCPageContainer>
  <Component {...pageProps} />
  <HCCFooter/>
  </HCCPageContainer>
}
