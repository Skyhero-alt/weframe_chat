import { auth, provider } from "../firebase/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Messenger from "./messenger";
import { UserContext } from "../contexts/userContext";
import Head from "next/head";
import { stringify } from "postcss";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);

  const createConversations = async (userId) => {
    try {
      await fetch(`/api/getUsers/all`).then(async (res) => {
        const json = await res.json();
        console.log(json);
        json.map(async (e) => {
          if (e.uid !== userId.uid) {
            console.log(e.uid, userId.uid);
            const lol = await fetch(`/api/conversations`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                senderId: userId.uid,
                receiverId: e.uid,
              }),
            });
            console.log(await lol.json());
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const SignIn = async () => {
    let bata;
    try {
      await signInWithPopup(auth, provider)
        .then((data) => {
          let { uid, displayName, email, photoURL } = data.user;
          setUser({ uid, displayName, email, photoURL });
          bata = { uid, displayName, email, photoURL };
        })
        .then(async () => {
          const res = await fetch("/api/newUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: bata.displayName,
              email: bata.email,
              uid: bata.uid,
              avatar: bata.photoURL,
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              console.log(res);
              if (res.message == "new user") {
                createConversations(bata);
              }
            });
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
      <Head>
        <title>WeFrame Chat</title>
      </Head>
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
