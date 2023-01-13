import Image from "next/image";
import Conversation from "./conversaton";
import Message from "./message";
import { UserContext } from "../contexts/userContext";
import { useContext, useEffect, useState, useRef } from "react";
import { auth, provider } from "../firebase/firebase";
import { signOut } from "firebase/auth";

const Messenger = () => {
  const { user } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // const scrollRef = useRef();

  const SignOut = async () => {
    signOut(auth, provider);
  };

  const getConversations = async () =>
    await fetch(`/api/conversations/${user.uid}`).then(async (res) => {
      let ret = await res.json();
      setConversations(ret);
    });

  useEffect(() => {
    getConversations();
  }, [conversations]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(`/api/messages/${currentChat.id}`).then(
          async (res) => {
            const json = await res.json();
            setMessages(json);
            console.log(json);
            console.log(messages);
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async () => {
    const message = {
      sender: user.uid,
      text: newMessage,
      conversationId: currentChat.id,
    };

    try {
      const res = await fetch(`/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }).then(async (res) => {
        const json = await res.json();
        console.log(json);
        setMessages([...messages, json]).then(() => {
          setNewMessage("");
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   scrollRef
  //     ? scrollRef.current.scrollIntoView({ behaviour: "smooth" })
  //     : null;
  // }, [messages]);

  return (
    <div className="messenger flex w-screen h-screen max-w-screen-lg">
      <div className="leftpanel mt-7 mr-7 rounded-xl w-[70px] h-[95vh]">
        <div className="my-10 flex justify-center items-center">
          <Image
            className="rounded-full border-green-300  border-2"
            src={user.photoURL}
            width={50}
            height={50}
          />
        </div>
        <div className="my-10 mt-15 flex justify-center items-center">
          <button>
            <Image src="/messageStuff/chat.svg" width={30} height={30} />
          </button>
        </div>
        <div className="my-10 flex justify-center items-center">
          <button>
            <Image src="/messageStuff/bell.svg" width={25} height={25} />
          </button>
        </div>
        <div className="mt-10 mb-0 flex justify-center h-[50vh] place-items-end">
          <button onClick={SignOut}>
            <Image src="/messageStuff/logout.svg" width={25} height={25} />
          </button>
        </div>
      </div>
      <div className="chatmenu mt-8 flex-1 mr-5 max-w-xs">
        <div className="relative">
          <input
            className="rounded-2xl bg-white p-3 pl-12 drop-shadow-xl"
            placeholder="Search"
          ></input>
          <div className="absolute top-3 left-3">
            <Image src="/messageStuff/search.svg" width={25} height={25} />
          </div>
        </div>
        {conversations.map((c) => {
          return (
            <div
              onClick={() => {
                console.log("hello");
                setCurrentChat(c);
              }}
              key={c.id}
            >
              <Conversation conversation={c} />
            </div>
          );
        })}
      </div>
      <div className="mt-8 chatbox h-screen max-h-[95vh] min-w-xs rounded-xl p-8 pt-3 flex-1 w-2/3">
        {currentChat ? (
          <>
            <div className="flex">
              <Image
                className="rounded-full border-green-300  border-2"
                src={user.photoURL}
                width={50}
                height={50}
              />
              <div className="ml-3 font-medium">
                <p>{user.displayName}</p>
                <p className="font-extralight text-sm">Last seen yesterday</p>
              </div>
            </div>
            <hr className="my-2" />

            <div className="chatboxwrapper h-[85%] overflow-y-auto ">
              {messages.map((m) => {
                return (
                  // <div ref={scrollRef}>
                  <Message key={m.id} message={m} own={m.sender == user.uid} />
                  // </div>
                );
              })}
            </div>
            <div className="chatBoxBottom bottom-0">
              <input
                className="chatMessageInput w-5/6 rounded-lg m-3 pt-4 p-3"
                placeholder="Type your message here..."
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
                value={newMessage}
              ></input>
              <button
                className="sendButton rounded-lg p-3"
                onClick={handleSubmit}
              >
                <Image
                  src="/messageStuff/send.svg"
                  alt="send"
                  width={20}
                  height={20}
                ></Image>
              </button>
            </div>
          </>
        ) : (
          <p className="text-center">Start a conversation</p>
        )}
      </div>
    </div>
  );
};

export default Messenger;
