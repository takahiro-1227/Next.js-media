import { Html, Head, Main, NextScript } from "next/document";
import { Header } from "../components/front/Header";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="font-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
