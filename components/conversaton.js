import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";

const Conversation = ({ conversation }) => {
  const [friend, setFriend] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m != user.uid);
    console.log(friendId);
    console.log(conversation);

    const getUser = async () => {
      try {
        await fetch(`/api/getUsers/${friendId}`).then(async (res) => {
          const lol = await res.json();
          setFriend(lol);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="flex py-3 px-1 m-3 hover:bg-sky-200">
      <div className="px-2">
        <Image
          className="rounded-full"
          src={friend.avatar}
          alt="avatar"
          height={35}
          width={35}
        />
      </div>
      <div className="name flex py-auto font-semibold h-35 justify-center place-items-center">
        <p>{friend.name}</p>
      </div>
    </div>
  );
};

export default Conversation;
