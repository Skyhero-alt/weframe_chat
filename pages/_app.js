import { useState } from "react";
import "../styles/globals.css";
import { UserContext } from "../contexts/userContext";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
