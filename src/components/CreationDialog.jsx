"use client";
import { addCreationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ImageInput from "./ImageInput";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import {
  useSubmitCreationMutation,
  useUpdateCreationMutation,
} from "@/app/dashboard/mutations";
import Loader from "./Loader";

const CreationDialog = ({ cancel, mode = "add", data = null }) => {
  const { data: session } = useSession();
  const [croppedCover, setCroppedCover] = useState(null);
  const mutation = useSubmitCreationMutation();
  const mutation2 = useUpdateCreationMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addCreationSchema),
    defaultValues: {
      title: mode === "edit" ? data.title : "",
      description: mode === "edit" ? data.description : "",
      status: mode === "edit" ? data.status : "",
      link: mode === "edit" ? data.link : "",
    },
  });

  async function onSubmit(values) {
    const userId = session.user.id;

    const coverImage = croppedCover
      ? new File([croppedCover], `creation${userId}.webp`)
      : undefined;

    if (mode === "edit") {
      const creationId = data._id;
      mutation2.mutate(
        { values, coverImage, creationId },
        {
          onSuccess: (data) => {
            if (data.success) {
              toast.success("Creation updated successfully");
              cancel();
            }
          },
          onError: (error) => toast.error(error),
        }
      );
    } else {
      mutation.mutate(
        { values, coverImage },
        {
          onSuccess: (data) => {
            if (data.success) {
              toast.success("Creation created successfully");
              cancel();
            }
          },
          onError: (error) => toast.error(error),
        }
      );
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="  bg-gray-800 rounded-lg text-white shadow-lg w-[90%] max-w-2xl p-4">
        <div className="flex items-center justify-between px-3">
          <h2 className="text-lg font-bold mb-5">
            {mode === "edit" ? "Edit" : "Add"} Creation
          </h2>
          <button onClick={cancel} className="btn">
            Cancel
          </button>
        </div>

        <div className="max-h-[70vh] overflow-auto p-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 overflow-y-auto text-White "
          >
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className="form-input"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                className="form-input"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="form-group">
              <label>Cover Image</label>
              <ImageInput
                id="cover-image"
                src={
                  croppedCover
                    ? URL.createObjectURL(croppedCover)
                    : mode === "edit"
                    ? data.coverImage
                    : "/default-cover.jpg"
                }
                aspectRatio={16 / 9}
                shape="rect"
                previewSize={600}
                onImageCropped={(file) => setCroppedCover(file)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                className="form-input"
                {...register("status", { required: "Please select a status" })}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="upcomming">Up Comming</option>
              </select>
              {errors.status && (
                <p className="text-red-500">{errors.status.message}</p>
              )}
            </div>
            <div className="form-group">
              <label>Link</label>
              <input
                type="text"
                id="link"
                className="form-input"
                {...register("link")}
              />
              {errors.link && (
                <p className="text-red-500">{errors.link.message}</p>
              )}
            </div>
            <button
              className="btn w-20 flex items-center justify-center gap-2"
              type="submit"
            >
              {mutation.isPending ? (
                <>
                  <Loader /> Save
                </>
              ) : (
                "Save"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreationDialog;
