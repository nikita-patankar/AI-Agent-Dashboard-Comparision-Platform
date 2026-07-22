"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

      alert("Registration Successful");

      router.push("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || err.message);
      } else {
        alert("Registration Failed");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-20 max-w-md space-y-4 rounded-xl border p-6"
    >
      <h1 className="text-center text-3xl font-bold">Register</h1>

      <input
        className="w-full rounded border p-2"
        placeholder="Name"
        name="name"
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-2"
        placeholder="Email"
        type="email"
        name="email"
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-2"
        placeholder="Password"
        type="password"
        name="password"
        onChange={handleChange}
      />

      <button
        className="w-full rounded bg-indigo-600 p-2 text-white"
      >
        Register
      </button>
    </form>
  );
}