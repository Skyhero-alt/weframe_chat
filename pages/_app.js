import { useState } from "react";
import Head from "next/head";
import "../styles/globals.css";
import { UserContext } from "../contexts/userContext";
import { FriendContext } from "../contexts/friendContext";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [friend, setFriend] = useState(null);

  return (
    <FriendContext.Provider value={{ friend, setFriend }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Head>
          <title>WeFrame Chat</title>
        </Head>
        <Component {...pageProps} />
      </UserContext.Provider>
    </FriendContext.Provider>
  );
}
