import React from "react";
import SocialLogin from "../login/SocialLogin";
import SignUpForm from "./SignUpForm";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "SignUp",
};

export default async function page() {
  return (
    <>
      <div className="flex items-center justify-center h-[100dvh] bg-aurora">
        <div className="text-white p-8 rounded-2xl  shadow-cyan-800 shadow-md bg-transparent w-[80vw] md:w-[50vw]  space-y-3 max-w-4xl ">
          <div className="flex justify-center items-center gap-2">
            <h1 className="logo text-fluid-md">
              SignUp to Boost<span className="text-white">Me</span>
            </h1>
            <Image src="/rocket.png" alt="" height={24} width={24} />
          </div>
          <SignUpForm />
          <div className="flex items-center gap-3 w-full">
            <div className="bg-gray-700 h-px flex-1" />
            <span className="text-white">OR</span>
            <div className="bg-gray-700 h-px flex-1" />
          </div>
          <SocialLogin />
          <Link
            href={"/login"}
            className="mt-3 block text-center hover:underline"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </>
  );
}
