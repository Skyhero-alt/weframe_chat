import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";

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
          <div className="min-w-1/3 pl-20 pt-20">
            <div className="herotext text-6xl font-semibold">
              <p className={inter.className}>
                Welcome to our Global Chat Room!
              </p>
              <p className="text-lg font-extralight mt-10">
                To join the conversation, simply sign up for an accoun.
              </p>
              <p className="text-lg font-extralight">
                It's quick and easy, and it's free
              </p>
            </div>
            <div className="googlebox flex flex-row h-1/2 mt-40 justify-center content-center">
              <button className="border-2 h-fit rounded-lg w-2/5 p-5 py-2 space-between googborder flex">
                <Image
                  src="/messageStuff/Google.svg"
                  width={25}
                  height={25}
                ></Image>
                <p className="pl-7">Sign in with Google</p>
              </button>
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
