import Image from "next/image";
import ResetPassword from "./ResetPassword";

export const metadata = {
  title: "Reset Password",
};

export default async function Page() {
  return (
    <>
      <div className="flex justify-center items-center  h-[100dvh] bg-aurora">
        <div className="text-white  shadow-cyan-800 shadow-md bg-transparent p-8 my-5 rounded-2xl  w-[80vw] md:w-[50vw]  space-y-5 max-w-4xl ">
          <div className="flex justify-center items-center gap-2">
            <h1 className="logo text-fluid-md">Reset Password</h1>
            <Image src="/rocket.png" alt="" height={24} width={24} />
          </div>
          <ResetPassword />
        </div>
      </div>
    </>
  );
}
