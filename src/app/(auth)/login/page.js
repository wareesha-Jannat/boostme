import React from "react";

import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Login",
};

export default async function Page() {
  return (
    <>
      <div className="flex justify-center items-center  h-[100dvh] bg-aurora">
        <div className="text-white  shadow-cyan-800 shadow-md bg-transparent p-8 my-5 rounded-2xl  w-[80vw] md:w-[50vw]  space-y-4 max-w-4xl ">
          <div className="flex justify-center items-center gap-2  mt-4">
            <h1 className="logo text-fluid-lg ">
              Log<span className="text-white">In</span>
            </h1>
            <Image src="/rocket.png" alt="" height={24} width={24} />
          </div>
          <LoginForm />
          <Link href={"/forgot-password"} className="hover:underline">
            Forgot password?
          </Link>
          <div className="flex items-center gap-3 w-full mt-2">
            <div className="bg-gray-700 h-px flex-1" />
            <span className="text-white">OR</span>
            <div className="bg-gray-700 h-px flex-1" />
          </div>
          <SocialLogin />
          <Link
            href={"/signup"}
            className="mt-3 block text-center hover:underline"
          >
            Do not have an account? signup
          </Link>
        </div>
      </div>
    </>
  );
}
