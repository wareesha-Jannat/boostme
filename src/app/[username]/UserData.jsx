import Image from "next/image";
import React from "react";
import PaymentsInfo from "./PaymentsInfo";
import ReadMore from "@/components/ReadMore";

const UserData = ({ user }) => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center relative ">
        <div className="relative w-full h-[400px]">
          {" "}
          {/* Set container dimensions */}
          <Image
            src={user.coverpic}
            alt="User cover Picture"
            fill // Makes image fill the parent container
            sizes="100vw"
            className="object-cover rounded-md" // You can use object-cover or object-contain
            priority
          />
        </div>

        <div className=" rounded-full absolute -bottom-9 border-2 border-white w-[100px] h-[100px] overflow-hidden">
          <Image
            src={user.profilepic}
            alt="User profile Picture"
            fill
            className="object-cover rounded-full"
            sizes="100px"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center py-10 text-white gap-2 max-w-[30vw] mx-auto ">
        <h3 className="bold text-xl "> @{user.username}</h3>
        <ReadMore text={user.bio} />
        <p className="text-sm text-slate-400">
          lets help {user.username} get a chai
        </p>
        <PaymentsInfo userId={user._id.toString()} />
      </div>
    </>
  );
};

export default UserData;
