"use client";
import React, { useState } from "react";
import { signup } from "@/actions/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpschema } from "@/lib/validation";
import Image from "next/image";

const SignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpschema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    console.log("data from signup", values);
    try {
      const data = await signup(values);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Sign Up successful");
        reset();
        router.push("/login");
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
        <div className="form-group ">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="username"
            className="form-input"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
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
        <button
          type="submit"
          className="btn w-full mt-4 "
          disabled={isSubmitting}
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
