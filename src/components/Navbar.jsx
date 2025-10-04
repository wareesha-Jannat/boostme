"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import DeleteAccount from "@/app/dashboard/DeleteAccount";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [showDropdown, setshowDropdown] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  const ToLoginPage = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    await queryClient.clear();
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="bg-cyberpunk fixed top-0 left-0 right-0 z-10 p-2">
      <div className="max-w-7xl mx-auto">
        <nav className=" flex min-[845px]:justify-around min-[845px]:items-center  text-white">
          <Link
            href={"/"}
            className=" ml-4 min-[845px]:ml-0 logo flex justify-center items-center gap-2 cursor-pointer"
          >
            <span className="logo">
              Boost<span className="text-white">Me</span>
            </span>
            <Image src="/rocket.png" alt="logo" height={24} width={24} />
          </Link>

          {status !== "authenticated" ? (
            <button
              type="button"
              className="btn ml-auto mr-1 min-[845px]:ml-0 min-[845px]:mr-0 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]"
              onClick={ToLoginPage}
            >
              Login / SignUp
            </button>
          ) : (
            <>
              <div className="relative ml-auto mr-1 min-[845px]:ml-0 min-[845px]:mr-0">
                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className=" btn  inline-flex  items-center drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                  type="button"
                  onClick={() => setshowDropdown(!showDropdown)}
                  onBlur={() =>
                    setTimeout(() => {
                      setshowDropdown(!showDropdown);
                    }, 3000)
                  }
                >
                  {session?.user?.name || session.user.username}
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                <div
                  id="dropdown"
                  className={`z-10 ${
                    showDropdown ? "" : "hidden"
                  } bg-gray-800 divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute right-0 top-13  `}
                >
                  <ul
                    className="py-2 text-sm text-white dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <Link
                        href={`/${session.user.username}`}
                        className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-700 dark:hover:text-white "
                      >
                        My Page
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        className="inline-block w-full  text-start px-4 py-1 hover:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={handleLogout}
                      >
                        Sign out
                      </button>
                    </li>
                    <li>
                      <DeleteAccount userId={session.user?._id} />
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
