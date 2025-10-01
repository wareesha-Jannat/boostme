"use client";
import { forgotPasswordSchema } from "@/lib/validation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordLink } from "@/actions/authentication";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
   
    try {
      const data = await ResetPasswordLink(values);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Password Reset link sent successfully");
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
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn w-full mt-4 "
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending" : "Send Link"}
        </button>
      </form>
    </>
  );
};

export default ForgotPassword;
