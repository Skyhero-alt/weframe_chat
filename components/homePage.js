import { auth, provider } from "../firebase/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Messenger from "./messenger";
import { UserContext } from "../contexts/userContext";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);

  const SignIn = async () => {
    try {
      await signInWithPopup(auth, provider).then((data) => {
        const { uid, displayName, email, photoURL } = data.user;
        fetch("/api/newUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            name: displayName,
            email: email,
            uid: uid,
            avatar: photoURL,
          },
        });
        setUser({ uid, displayName, email, photoURL });
      });
    } catch (err) {
      console.log(err);
    }
  };

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  return (
    <div>
      {user ? (
        <Messenger />
      ) : (
        <div className="homepage flex max-w-[1280px] w-screen h-screen">
          <div className="min-w-1/3 pl-20 pt-16">
            <Image
              className="pb-10"
              src="/messageStuff/Logo.svg"
              height={40}
              width={270}
            />
            <div className="herotext text-6xl font-semibold">
              <p className={inter.className}>
                Welcome to our Global Chat Room!
              </p>
              <p className="text-lg font-extralight mt-10">
                To join the conversation, simply sign up for an account.
              </p>
              <p className="text-lg font-extralight">
                It's quick and easy, and it's free
              </p>
            </div>
            <div className="googlebox flex flex-col h-[46%] pr-[10%] justify-center items-center">
              <button
                className="border-2 h-fit rounded-lg py-2 px-20 googborder flex"
                onClick={SignIn}
              >
                <Image
                  src="/messageStuff/Google.svg"
                  width={25}
                  height={25}
                ></Image>
                <p className="pl-3">Sign in with Google</p>
              </button>
              <p className="text-sm pt-3">
                Don't have an account?
                <button className="text-blue-700" onClick={SignIn}>
                  Sign Up
                </button>
              </p>
            </div>
            <div className={inter.className}>
              <p className="italic pr-[10%] herotext text-center">
                @Weframetech.com
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
