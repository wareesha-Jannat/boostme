"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const AllPayments = ({ userId }) => {
  const {
    data,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["payments", userId],
    queryFn: async ({ pageParam }) => {
      const customParam = pageParam ? `?cursor=${pageParam}` : "";
      const res = await fetch(`/api/user/payments/${userId}${customParam}`);
      if (!res.ok) throw new Error("Failed to fetch payments");
      return res.json();
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const payments = data?.pages.flatMap((page) => page.payments) || [];

  if (status === "pending") {
    return (
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto" />
    );
  }
  if (status === "error") {
    return <p>Error loading payments</p>;
  }

  return (
    <>
      <ul className="space-y-2">
        {payments.length > 0 ? (
          payments.map((s) => {
            return (
              <li
                key={s._id}
                className="flex gap-2 items-center bg-gray-900 rounded-xl p-3 "
              >
                <Image
                  className="self-start p-0.5"
                  src="user.svg"
                  alt=""
                  height={40}
                  width={40}
                />{" "}
                <div>
                  <p className="font-bold text-[17px] "> {s.name}</p>
                  <p className="text-sm">
                    {" "}
                    Donated{" "}
                    <span className=" font-bold italic ">
                      Rs.{s.amount}
                    </span>{" "}
                    with message{" "}
                    <span className="font-bold italic ">"{s.message}"</span>{" "}
                  </p>
                </div>
              </li>
            );
          })
        ) : (
          <li className="flex gap-2 text-sm">
            {" "}
            <span className="bold text-[15px]"> No payment yet </span>{" "}
          </li>
        )}
      </ul>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="btn mt-4 mx-auto"
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
};

export default AllPayments;
