import React, { cache } from "react";

import { getUser } from "@/lib/utils";
import UserData from "./UserData";
import AllPayments from "./AllPayments";
import PaymentForm from "./PaymentForm";

import AllCreations from "@/components/AllCreations";
import Footer from "@/components/Footer";

const getData = cache((username) => getUser(username));

export async function generateMetaData({ params }) {
  const { username } = await params;
  const user = await getData(username);
  return {
    title: `${user?.name || user?.username}`,
  };
}

export default async function Page({ params }) {
  const { username } = await params;

  const user = await getData(username);

  return (
    <>
      <main className=" pt-15 overflow-x-hidden scroll-stable ">
        <div className="max-w-7xl mx-auto">
          <UserData user={user} />

          <div className="w-[80%]  pb-7 text-white flex-col flex md:flex-row mx-auto  gap-5">
            {/* All payments */}
            <div className=" bg-transparent md:w-[50%]  shadow-cyan-800 shadow-md p-7  rounded-lg">
              <h2 className="font-bold mb-5 text-slate-400 text-[22px] ">
                Payments
              </h2>
              <div className="overflow-y-auto max-h-[70vh] flex flex-col scroll-stable">
                <AllPayments userId={user?._id.toString()} />
              </div>
            </div>
            {/* Payment */}
            <div className=" bg-transparent md:w-[50%]  shadow-cyan-800 shadow-md  p-7 rounded-lg ">
              <h2 className="font-bold mb-5 text-slate-400 text-[22px] ">
                Make a payment
              </h2>
              <PaymentForm userId={user?._id.toString()} />
            </div>
          </div>
          <div className="flex flex-col gap-5 w-[80%] mx-auto ">
            <h3 className="bg-gray-900 text-white text-fluid-md text-center py-2 mb-3 mt-9 rounded-2xl">
              User Creations
            </h3>
            <AllCreations showActions={false} userId={user?._id.toString()} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
