"use client";
import React, { useState } from "react";
import { FolderIcon, PlusIcon } from "@heroicons/react/24/outline";

import CreationDialog from "@/components/CreationDialog";

const CreationHeader = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div className="w-[90%]  bg-purple-900 flex items-center justify-between p-4 rounded-2xl mx-auto">
        <h2 className="flex gap-2 text-white items-center justify-center font-bold text-fluid-md ">
          <FolderIcon className="w-4 w-4 sm:w-6 sm:w-6 font-bold " />
          All Creations
        </h2>
        <button
          onClick={toggleModal}
          className="  btn flex gap-2  items-center justify-center"
        >
          <PlusIcon className="w-4 h-4" />
          Add Creation
        </button>
      </div>
      {/* Modal */}
      {showModal && <CreationDialog cancel={toggleModal} />}
    </>
  );
};

export default CreationHeader;
