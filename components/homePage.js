import { auth, provider } from "../firebase/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Messenger from "./messenger";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  const [value, setValue] = useState("");
  const [user, setUser] = useState({});

  const SignIn = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data.user);
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  // useEffect(() => {
  //   setValue(localStorage.getItem("email"));
  // });

  return (
    <div>
      {value ? (
        <Messenger />
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
            <div className="googlebox flex flex-col h-[60%] justify-center items-center">
              <button
                className="border-2 h-fit rounded-lg py-2 px-20 googborder flex"
                onClick={SignIn}
              >
                <Image
                  src="/messageStuff/Google.svg"
                  width={25}
                  height={25}
                ></Image>
                <p className="pl-5">Sign in with Google</p>
              </button>
              <p className="text-sm pt-3">
                Don't have an account?
                <hmm className="text-blue-700"> Sign Up</hmm>
              </p>
            </div>
            <div className={inter.className}>
              <p className="italic herotext text-center">@Weframetech.com</p>
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
