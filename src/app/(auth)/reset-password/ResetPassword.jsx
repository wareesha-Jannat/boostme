"use client";
import { resetPasswordSchema } from "@/lib/validation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePassword } from "@/actions/authentication";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import Loader from "@/components/Loader";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      const data = await ChangePassword(values, token);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("password saved successfully");
        reset();
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 ">
        <div className="form-group ">
          <label htmlFor="password">Password</label>
          <div className="relative flex  ">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="form-input pe-10 w-full"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" absolute -translate-y-1/2 right-5 top-1/2 transform  "
            >
              <Image
                src={showPassword ? "/eye-off.png" : "/eye.png"}
                alt="Toggle visibility"
                height={20}
                width={20}
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="form-group ">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative flex  ">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="form-input pe-10 w-full"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className=" absolute -translate-y-1/2 right-5 top-1/2 transform  "
            >
              <Image
                src={showConfirmPassword ? "/eye-off.png" : "/eye.png"}
                alt="Toggle visibility"
                height={20}
                width={20}
              />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn w-full mt-4 flex items-center justify-center gap-2 "
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader /> Save
            </>
          ) : (
            "Save"
          )}
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
