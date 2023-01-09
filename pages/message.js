import Image from "next/image";

const Message = ({ own }) => {
  return (
    <div
      className={
        own ? "message py-2 flex flex-col own" : "message py-2 flex flex-col"
      }
    >
      <div className="messageText w-fit p-3 px-7 max-w-md rounded-2xl bg-green-500">
        hello this is message
      </div>
      <div className="messageBottom text-sm font-extralight">1 hour ago</div>
    </div>
  );
};

export default Message;
