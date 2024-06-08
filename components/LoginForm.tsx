"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";
import { redirect } from "next/navigation";

import { login } from "@/app/actions";
import { useAppDispatch } from "@/config/hooks";
import { setToken } from "@/app/store/user";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const handleLogin = async (formData: FormData) => {
    const data = await login(formData);

    dispatch(setToken(data.token));

    redirect("/");
  };

  return (
    <div className="w-1/2 mx-auto">
      <h1 className="w-full text-3xl font-bold text-center mb-10">Login</h1>
      <form action={handleLogin} className="space-y-5 text-center">
        <Input
          isRequired
          required
          label="Username"
          name="username"
          placeholder="Enter your username"
          variant="bordered"
        />
        <Input
          isRequired
          required
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
        />
        <Button
          className="w-1/4 text-xl font-semibold"
          color="success"
          type="submit"
        >
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
