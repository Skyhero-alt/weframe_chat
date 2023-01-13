import { format } from "timeago.js";

const Message = ({ message, own }) => {
  return (
    <div
      className={
        own ? "message py-2 flex flex-col own" : "message py-2 flex flex-col"
      }
    >
      <div className="messageText w-fit p-1 px-7 max-w-md rounded-xl bg-green-500">
        {message.text}
      </div>
      <div className="messageBottom text-sm font-extralight">
        {format(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
