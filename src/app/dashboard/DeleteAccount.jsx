"use client";
import React from "react";
import { DeleteUser } from "@/actions/user";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

const DeleteAccount = ({ userId }) => {
  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    )
      return;

    const res = await DeleteUser(userId);
    if (res.success) {
      toast.success("Account deleted Successfully");
      await signOut({ callbackUrl: "/" });
    } else {
      toast.error(res.error || "Something went wrong");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 ml-auto"
    >
      Delete Account
    </button>
  );
};

export default DeleteAccount;
