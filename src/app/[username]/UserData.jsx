import Image from "next/image";
import React from "react";
import PaymentsInfo from "./PaymentsInfo";
import ReadMore from "@/components/ReadMore";

const UserData = ({ user }) => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center relative ">
        <div className="relative w-full h-[400px]">
          <Image
            src={user?.coverpic || "/default-cover.jpg"}
            alt="User cover Picture"
            fill
            sizes="100vw"
            className="object-cover rounded-md"
            priority
          />
        </div>

        <div className=" rounded-full absolute -bottom-9 border-2 border-white w-[100px] h-[100px] overflow-hidden ">
          <Image
            src={user?.profilepic || "/avatar-placeholder.png"}
            alt="User profile Picture"
            fill
            className="object-cover rounded-full"
            sizes="100px"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center py-10 text-white gap-2 max-w-[70vw] md:max-w-[30vw] mx-auto ">
        <h3 className="bold text-xl "> @{user.username}</h3>
        <ReadMore text={user?.bio || "No bio yet"} />
        <p className="text-sm text-slate-400">
          lets help {user?.username} get a chai
        </p>
        <PaymentsInfo userId={user?._id.toString()} />
      </div>
    </>
  );
};

export default UserData;
