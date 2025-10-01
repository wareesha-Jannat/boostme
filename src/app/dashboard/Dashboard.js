"use client";
import React, { useState } from "react";
import { updateProfile } from "@/actions/user";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validation";

import ImageInput from "@/components/ImageInput";
import DeleteAccount from "./DeleteAccount";
import Image from "next/image";

const Dashboard = ({ user }) => {
  const [showSecret, setShowSecret] = useState(false);
  const [croppedAvatar, setCroppedAvatar] = useState(null);
  const [croppedCover, setCroppedCover] = useState(null);
  const toogleSecret = () => {
    setShowSecret(!showSecret);
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      payfastid: user.payfastid,
      payfastsecret: user.payfastsecret,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      const newAvatar = croppedAvatar
        ? new File([croppedAvatar], `avatar${user._id}.webp`)
        : undefined;
      const newCover = croppedCover
        ? new File([croppedCover], `cover${user._id}.webp`)
        : undefined;
      if (newAvatar) formData.append("avatar", croppedAvatar);
      if (newCover) formData.append("cover", croppedCover);
      formData.append("userId", user._id);
      const res = await updateProfile(formData);
      if (res.success) {
        reset(res.data);
        toast.success("Profile updated successfully");
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
     
      toast.error("Could not update profile, try again");
    }
  };

  return (
    <>
      <DeleteAccount userId={user._id} />
      <div className=" text-white  w-[80%] md:w-[60vw] py-7 mx-auto space-y-3 max-w-5xl bg-transparent border-2 border-gray-800 p-8 mt-8  rounded-2xl shadow-cyan-800 shadow-md">
        <h2 className="text-center font-bold text-2xl">
          Welcome to your Dashboard
        </h2>

        <div className="flex  flex-col sm:flex-row items-center justify-center  mt-8">
          {/* Profile Picture */}
          <div className="form-group">
            <label htmlFor="profilepic">Profile Picture</label>
            <ImageInput
              src={
                croppedAvatar
                  ? URL.createObjectURL(croppedAvatar)
                  : user.profilepic || "/avatar-placeholder.png"
              }
              shape="circle"
              previewSize={128}
              onImageCropped={(file) => setCroppedAvatar(file)} // 👈 update form value
            />
          </div>
          {/* Cover Picture */}
          <div className="form-group">
            <label>Cover Picture</label>

            <ImageInput
              src={
                croppedCover
                  ? URL.createObjectURL(croppedCover)
                  : user.coverpic || "/default-cover.jpg"
              }
              aspectRatio={16 / 9}
              shape="rect"
              previewSize={600}
              onImageCropped={(file) => setCroppedCover(file)} // 👈 update form value
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" space-y-2"
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" className="form-input" {...register("name")} />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-group">
            <label> Email</label>
            <input className="form-input" value={user.email} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="form-input"
              value={user.username}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <input id="bio" className="form-input" {...register("bio")} />
            {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="payfastid">Payment Id</label>
            <input
              id="payfastid"
              className="form-input"
              {...register("payfastid")}
            />
            {errors.payfastid && (
              <p className="text-red-500">{errors.payfastid.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="payfastsecret">Payment Secret</label>
            <div className="relative flex  ">
              <input
                id="payfastsecret"
                type={showSecret ? "text" : "password"}
                className="form-input pe-10 w-full"
                {...register("payfastsecret")}
              />
              <button
                type="button"
                onClick={toogleSecret}
                className=" absolute -translate-y-1/2 right-5 top-1/2 transform  "
              >
                <Image
                  src={showSecret ? "/eye-off.png" : "/eye.png"}
                  alt="Toggle visibility"
                  height={20}
                  width={20}
                />
              </button>
            </div>
            {errors.payfastsecret && (
              <p className="text-red-500">{errors.payfastsecret.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn w-full mt-4"
          >
            {isSubmitting ? "Saving" : "Save"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
