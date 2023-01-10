import Image from "next/image";

const Conversation = () => {
  return (
    <div className="flex p-2 m-5 hover:bg-sky-200">
      <div className="px-5">
        <Image src="/messageStuff/profile.png" height={35} width={35} />
      </div>
      <div className="name flex py-auto font-semibold h-35 justify-center place-items-center">
        <p>Op guy</p>
      </div>
    </div>
  );
};

export default Conversation;
