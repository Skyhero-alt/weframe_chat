import Image from "next/image";
import { useContext, useEffect, useState } from "react";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.member.find((m) => m != currentUser.uid);

    const getUser = async () => {
      try {
        await fetch(`/api/getUsers/${friendId}`).then((res) => {
          setUser(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return (
    <div className="flex py-3 px-1 m-3 hover:bg-sky-200">
      <div className="px-2">
        <Image src="/messageStuff/profile.png" height={35} width={35} />
      </div>
      <div className="name flex py-auto font-semibold h-35 justify-center place-items-center">
        <p>{user.displayName}</p>
      </div>
    </div>
  );
};

export default Conversation;
