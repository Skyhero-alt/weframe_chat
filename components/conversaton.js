import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";

const Conversation = ({ conversation }) => {
  const [friend, setFriend] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m != user.uid);
    console.log(friendId);

    const getUser = async () => {
      try {
        const ha = await fetch(`/api/getUsers/${friendId}`).then(
          async (res) => {
            const lol = await res.json();
            setFriend(lol);
            console.log(lol);
            console.log(friend);
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [friend]);

  return (
    <div className="flex py-3 px-1 m-3 hover:bg-sky-200">
      <div className="px-2">
        {friend && (
          <Image
            className="rounded-full"
            src={friend.avatar}
            alt="avatar"
            height={35}
            width={35}
          />
        )}
      </div>
      <div className="name flex py-auto font-medium h-35 justify-center place-items-center">
        <p>{friend && friend.name}</p>
      </div>
    </div>
  );
};

export default Conversation;
