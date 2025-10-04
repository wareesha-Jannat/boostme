"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import React, { useState } from "react";
import Creation from "./Creation";
import CreationDialog from "./CreationDialog";
import { useDeleteCreationMutation } from "@/app/dashboard/mutations";

const AllCreations = ({ showActions, userId }) => {
  const [selectedCreation, setSelectedCreation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const mutation = useDeleteCreationMutation();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, status } =
    useInfiniteQuery({
      queryKey: ["creations", userId],
      queryFn: async ({ pageParam }) => {
        const customParam = pageParam ? `?cursor=${pageParam}` : "";
        const res = await fetch(`/api/creations/${userId}${customParam}`);
        if (!res.ok) throw new Error("Failed to fetch creations");
        return res.json();
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const creations = data?.pages.flatMap((page) => page.creations) || [];

  const onEdit = (creation) => {
    setSelectedCreation(creation);
    toggleModal();
  };
  const onDelete = (creationId) => {
    mutation.mutate(creationId);
  };

  if (status === "pending") {
    return (
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto" />
    );
  }
  if (status === "error") {
    return <p className="text-white text-center">Error loading creations</p>;
  }

  return (
    <>
      <div className="flex flex-col my-5 mx-auto ">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[350px] ">
          {creations.length > 0 ? (
            creations.map((creation) => (
              <Creation
                key={creation._id}
                creation={creation}
                onEdit={onEdit}
                onDelete={onDelete}
                showActions={showActions}
              />
            ))
          ) : (
            <div className="bold text-xl text-center text-white">
              {" "}
              No creations yet{" "}
            </div>
          )}
        </div>

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="btn mt-4 mx-auto"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
      {showModal && (
        <CreationDialog
          cancel={toggleModal}
          mode="edit"
          data={selectedCreation}
        />
      )}
    </>
  );
};

export default AllCreations;
