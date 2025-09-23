"use client";
import React, { useState } from "react";
import { CredentialsLogin } from "@/actions/authentication";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const response = await CredentialsLogin(formData);
      console.log("response from credentials login", response);
      if (response.error) {
        toast.error(response.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5 ">
        <div className="form-group ">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className="form-input" />
        </div>
        <div className="form-group ">
          <label htmlFor="password">Password</label>
          <div className="relative flex  ">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="form-input pe-10 w-full"
              name="password"
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
        </div>
        <button type="submit" className="btn w-full mt-4 ">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
