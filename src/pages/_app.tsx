import "../styles/globals.scss";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import client from "../libs/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ApolloProvider client={client}>
        <Auth0Provider
          domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? ""}
          clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? ""}
          redirectUri={`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`}
        >
            <Component {...pageProps} />
        </Auth0Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
