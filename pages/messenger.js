import Image from "next/image";
import Conversation from "./conversaton";
import Message from "./message";

const Messenger = () => {
  return (
    <div className="messenger flex w-screen h-5/6 max-w-screen-lg">
      <div className="chatmenu p-10 flex-1 max-w-xs">
        <input
          className="rounded-full bg-white p-3 shadow-lg"
          placeholder="Search"
        ></input>
        {/* <Image src="/search.png" width={35} height={35} /> */}
        <Conversation />
        <Conversation />
        <Conversation />
      </div>
      <div className="m-2 chatbox border-2 border-green-300 rounded-xl p-10 flex-1 w-2/3">
        <div className="chatboxwrapper h-screen h-5/6">
          <Message />
          <Message own={true} />
          <Message />
          <Message own={true} />
          <Message own={true} />
          <Message own={true} />
          <Message own={true} />
          <Message own={true} />
          <Message own={true} />
          <Message own={true} />
          <Message own={true} />
          <Message own={true} />
          <Message own={true} />
        </div>

        <div className="chatBoxBottom">
          <input
            className="chatMessageInput w-5/6 rounded-lg m-3 pt-4 p-3"
            placeholder="Type your message here..."
          ></input>
          <button className="sendButton rounded-lg p-3">
            <Image
              src="/messageStuff/send.svg"
              alt="send"
              width={20}
              height={20}
            ></Image>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
