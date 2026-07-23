"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import {
  getProfile,
  updateProfile,
} from "@/services/profile";


export default function ProfileForm() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });


  useEffect(() => {

    async function loadProfile() {

      try {

        const user = await getProfile();

        setForm({
          name: user.name,
          email: user.email,
          password: "",
        });

      } catch (error) {

        console.error(error);

        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load profile.",
        });

      } finally {

        setLoading(false);

      }

    }

    loadProfile();

  }, []);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const updatedUser = await updateProfile(form);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );


      await Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });


      router.replace("/");

    } catch (error) {

      const err = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };


      await Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          err?.response?.data?.message ||
          "Failed to update profile.",
      });

    }

  };



  if (loading) {

    return (
      <div className="rounded-xl border bg-white p-8 shadow">
        Loading...
      </div>
    );

  }



  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-white p-8 shadow"
    >

      <div>

        <label className="font-medium">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border p-3"
        />

      </div>


      <div>

        <label className="font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border p-3"
        />

      </div>


      <div>

        <label className="font-medium">
          New Password
        </label>

        <input
          type="password"
          name="password"
          placeholder="Leave blank to keep current password"
          value={form.password}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border p-3"
        />

      </div>


      <div className="flex justify-center">

        <button

          type="submit"

          className="  center rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-green-700 "

        >

          Save Changes

        </button>

      </div>


    </form>

  );

}