"use client";

import React, { useState } from "react";
import Button from "../common/Button";
import { BASE_URL } from "@/constant";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";
import axios from "axios";
import { useAuthStore, useShareDoc } from "@/store";
import Link from "next/link";
import { AuthType } from "@/interface";

const AuthForm = ({ login }: { login: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [drop, setDrop] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const authenticateUser = useAuthStore((state) => state.authenticateUser);
  const handleAuthState = useAuthStore((state) => state.handleAuthState);

  //in the case of shared document
  const docId = useShareDoc((state) => state.documentId) as undefined | string;

  const registerUser = async (data: AuthType) => {
    try {
      const formdata = {
        user_name: data["user_name"],
        password: data["password"],
        email: data["email"],
      };
      const { data: resData } = await axios.post(
        `${BASE_URL}auth/register`,
        formdata
      );
      if (resData) {
        setLoading(false);
        router.push("/auth/login");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const loginUser = async (data: AuthType) => {
    setLoading(true);
    try {
      const formdata = {
        email: data["email"],
        password: data["password"],
      };
      const { data: resData } = await axios.post(
        `${BASE_URL}auth/login`,
        formdata
      );
      if (resData) {
        setLoading(false);
        authenticateUser(resData?.user);
        handleAuthState(true);
        setCookie("_er3434", resData.accessToken, { maxAge: 60 * 60 * 60 * 3 });
        setCookie("_t4t5wm", resData.refreshToken, {
          maxAge: 60 * 60 * 60 * 31,
        });
        setCookie("user_id", resData.user.id, {
          maxAge: 60 * 60 * 60 * 31,
        });
        setDrop(true);
        const successPath =
          docId === undefined ? "/document" : `/document/${docId}`;
        router.push(successPath);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  function auth(data: any) {
    setLoading(true);
    login ? loginUser(data) : registerUser(data);
  }

  return (
    <div className="bg-white shadow-lg animate__fadeIn animate__animated rounded-md w-full md:w-[500px] p-7">
      <p className="text-center text-lg text-[#1e202a] font-semibold">
        {!login ? "Create An Account" : "Login to your account"}
      </p>
      <p className="text-center text-sm text-[#7c7f8a] mb-5">
        Provide your credentials
      </p>

      <form onSubmit={handleSubmit(auth)}>
        <div className=" grid gap-2 grid-cols-1 w-full mb-4   ">
          {!login && (
            <div className="">
              <label
                htmlFor="user_name"
                className="text-xs text-textColor/70 mb-1.5"
              >
                User Name
              </label>
              <input
                {...register("user_name", {
                  required: "This field is required",
                })}
                type={"text"}
                className="border w-full p-2 form-control rounded-md focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange focus:ring-opacity-5"
                // placeholder={"First Name"}
              />
              {errors.full_name !== undefined && (
                <p className="text-red-600 text-xs py-2">
                  This field is required
                </p>
              )}
            </div>
          )}

          <div className="">
            <label htmlFor="email" className="text-xs text-textColor/70 mb-1.5">
              Email
            </label>
            <input
              id="email"
              {...register("email", { required: "This field is requid" })}
              type={"email"}
              className="border w-full p-2 form-control rounded-md focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange focus:ring-opacity-5"
            />
            {errors.email !== undefined && (
              <p className="text-red-600 text-xs py-2">
                This field is required
              </p>
            )}
          </div>

          <div className="">
            <label
              htmlFor="password"
              className="text-xs text-textColor/70 mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              {...register("password", {
                required: "THis field is required",
              })}
              type={"text"}
              className="border w-full p-2 form-control rounded-md focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange focus:ring-opacity-5"
              // placeholder={"First Name"}
            />
            {errors.password !== undefined && (
              <p className="text-red-600 text-xs py-2">
                This field is required
              </p>
            )}
          </div>
        </div>

        <Button
          loading={loading}
          type="submit"
          text={login ? "Login" : "Register"}
        />
      </form>

      {login ? (
        <div className="flex text-sm space-x-3 mt-10 justify-center items-center">
          <p>Dont have an account? </p>
          <Link href={"/auth/register"}>
            <p className="text-primary cursor-pointer hover:text-primary/60">
              Sign up{" "}
            </p>
          </Link>
        </div>
      ) : (
        <div className="flex text-sm space-x-3 mt-10 justify-center items-center">
          <p>Already have an account? </p>
          <Link href={"/auth/login"}>
            <p className="text-primary cursor-pointer hover:text-primary/60">
              Sign In{" "}
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
