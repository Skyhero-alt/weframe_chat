import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Home from "./index";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  const [value, setValue] = useState("");

  const SignIn = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });

  return (
    <div>
      {value ? (
        <Home />
      ) : (
        <div className="homepage flex w-screen h-screen">
          <div className="w-1/3">
            <div className="herotext text-4xl font-semibold">
              <p className={inter.className}>
                Welcome to our Global Chat Room!
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center mr-10 items-end w-2/3">
            <Image src="/messageStuff/poster.svg" height={500} width={600} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
