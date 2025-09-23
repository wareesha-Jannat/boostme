"use client";
import React from "react";
import CreationHeader from "./CreationHeader";
import AllCreations from "@/components/AllCreations";
import { useSession } from "next-auth/react";

const Creations = () => {
  const { data: session } = useSession();

  return (
    <>
      <CreationHeader />
      <AllCreations showActions={true} userId={session?.user.id} />
    </>
  );
};

export default Creations;
