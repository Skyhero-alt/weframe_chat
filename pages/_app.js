import { useState } from "react";
import Head from "next/head";
import "../styles/globals.css";
import { UserContext } from "../contexts/userContext";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Head>
        <title>WeFrame Chat</title>
      </Head>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
