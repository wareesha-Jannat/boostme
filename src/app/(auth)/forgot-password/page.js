import Image from "next/image";
import ForgotPassword from "./ForgotPassword";

export const metadata = {
  title: "Forgot Password",
};

export default async function Page() {
  return (
    <>
      <div className="flex justify-center items-center  h-[100dvh] bg-aurora">
        <div className="text-white  shadow-cyan-800 shadow-md bg-transparent py-8 px-6 my-5 rounded-2xl  w-[80vw] md:w-[50vw]  space-y-5 max-w-4xl ">
          <h1 className="logo text-3xl text-center">Forgot Password</h1>

          <ForgotPassword />
        </div>
      </div>
    </>
  );
}
