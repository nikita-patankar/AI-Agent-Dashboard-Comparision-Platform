"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

import { loginUser } from "@/services/auth";


export default function LoginForm() {

  const router = useRouter();


  const [form, setForm] = useState({
    email: "",
    password: "",
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();


    try {

      const res = await loginUser(form);


      // Remove this if you're using HttpOnly cookies
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));


      window.dispatchEvent(new Event("authChanged"));



      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back.",
        timer: 1500,
        showConfirmButton: false,
      });



      router.push("/");


    } catch (err) {


      const errorMessage =
        err instanceof Error
          ? err.message
          : "Login Failed";



      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });


    }

  };



  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-20 max-w-md space-y-4 rounded-xl border p-6"
    >

      <h1 className="text-center text-3xl font-bold">
        Login
      </h1>



      <input
        className="w-full rounded border p-2"
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />



      <input
        className="w-full rounded border p-2"
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />



      <button
        className="w-full rounded bg-indigo-600 p-2 text-white"
      >
        Login
      </button>



      <div className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}

        <Link
          href="/register"
          className="font-semibold text-indigo-600 hover:underline"
        >
          Register
        </Link>

      </div>


    </form>
  );
}