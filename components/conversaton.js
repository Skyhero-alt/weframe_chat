import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";

const Conversation = ({ conversation }) => {
  const [friendd, setFriendd] = useState(null);
  const { user } = useContext(UserContext);

  const getUser = async () => {
    const friendId = conversation.members.find((m) => m != user.uid);
    console.log(friendId);
    try {
      const ha = await fetch(`/api/getUsers/${friendId}`).then(async (res) => {
        const lol = await res.json();
        setFriendd(lol);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex py-3 px-1 m-3 hover:bg-sky-200">
      <div className="px-2">
        {friendd && (
          <Image
            className="rounded-full"
            src={friendd.avatar}
            alt="avatar"
            height={35}
            width={35}
          />
        )}
      </div>
      <div className="name flex py-auto font-medium h-35 justify-center place-items-center">
        <p>{friendd && friendd.name}</p>
      </div>
    </div>
  );
};

export default Conversation;
