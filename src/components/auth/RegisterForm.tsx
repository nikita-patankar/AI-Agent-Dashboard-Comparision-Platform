"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

import { registeredUser } from "@/services/auth";


export default function RegisterForm() {

  const router = useRouter();


  const [form, setForm] = useState({
    name: "",
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

      await registeredUser(form);



      await Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your account has been created.",
        timer: 2000,
        showConfirmButton: false,
      });



      router.push("/login");


    } catch (err) {


      if (axios.isAxiosError(err)) {


        await Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text:
            err.response?.data?.message ||
            err.message,
        });


      } else {


        await Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Something went wrong. Please try again.",
        });


      }

    }

  };



  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-20 max-w-md space-y-4 rounded-xl border p-6"
    >

      <h1 className="text-center text-3xl font-bold">
        Register
      </h1>



      <input
        className="w-full rounded border p-2"
        placeholder="Name"
        name="name"
        onChange={handleChange}
        required
      />



      <input
        className="w-full rounded border p-2"
        placeholder="Email"
        type="email"
        name="email"
        onChange={handleChange}
        required
      />



      <input
        className="w-full rounded border p-2"
        placeholder="Password"
        type="password"
        name="password"
        onChange={handleChange}
        required
      />



      <button
        className="w-full rounded bg-indigo-600 p-2 text-white"
      >
        Register
      </button>


    </form>
  );
}