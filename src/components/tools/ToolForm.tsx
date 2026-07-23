"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { createTool, updateTool } from "@/services/tool";

interface ToolFormProps {
  tool?: {
    _id: string;
    name: string;
    company: string;
    description: string;
    category: string;
    pricing: string;
    website: string;
    logo?: string;
    rating?: number | null;
    tags?: string[];
    apiAvailable?: boolean;
    featured?: boolean;
  };
}

export default function ToolForm({ tool }: ToolFormProps) {

  const router = useRouter();

  const isEdit = Boolean(tool);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: tool?.name || "",
    company: tool?.company || "",
    description: tool?.description || "",
    category: tool?.category || "Chatbot",
    pricing: tool?.pricing || "Free",
    website: tool?.website || "",
    logo: tool?.logo || "",
    rating: tool?.rating?.toString() || "",
    tags: tool?.tags?.join(", ") || "",
    apiAvailable: tool?.apiAvailable || false,
    featured: tool?.featured || false,
  });


  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {

    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  }


  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);

    try {

      const payload = {
        ...form,

        rating: form.rating
          ? Number(form.rating)
          : null,

        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };


      if (isEdit && tool) {

        await updateTool(tool._id, payload);

        await Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "AI Tool updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

      } 
      else {

        await createTool(payload);

        await Swal.fire({
          icon: "success",
          title: "Created!",
          text: "AI Tool created successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

      }


      router.replace("/dashboard");
      router.refresh();


    } catch (err) {

      console.error(err);

      const error = err as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };


      await Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          error?.response?.data?.message ||
          "Something went wrong.",
      });


    } finally {

      setLoading(false);

    }

  }


  return (

    <div className="rounded-xl border bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        {isEdit ? "Edit AI Tool" : "Add AI Tool"}
      </h2>


      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div className="grid gap-5 md:grid-cols-2">

          <input
            className="w-full rounded-lg border p-3"
            name="name"
            placeholder="Tool Name"
            value={form.name}
            onChange={handleChange}
            required
          />


          <input
            className="w-full rounded-lg border p-3"
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            required
          />

        </div>


        <textarea
          rows={4}
          className="w-full rounded-lg border p-3"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />


        <div className="grid gap-5 md:grid-cols-2">

          <select
            className="rounded-lg border p-3"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option>Chatbot</option>
            <option>Coding</option>
            <option>Image Generation</option>
            <option>Video</option>
            <option>Productivity</option>
            <option>Writing</option>
            <option>Research</option>
            <option>Automation</option>
          </select>


          <select
            className="rounded-lg border p-3"
            name="pricing"
            value={form.pricing}
            onChange={handleChange}
          >
            <option>Free</option>
            <option>Freemium</option>
            <option>Paid</option>
          </select>

        </div>


        <input
          className="w-full rounded-lg border p-3"
          placeholder="Website"
          name="website"
          value={form.website}
          onChange={handleChange}
          required
        />


        <input
          className="w-full rounded-lg border p-3"
          placeholder="Logo URL"
          name="logo"
          value={form.logo}
          onChange={handleChange}
        />


        <div className="grid gap-5 md:grid-cols-2">

          <input
            className="rounded-lg border p-3"
            type="number"
            min="1"
            max="5"
            step="0.1"
            placeholder="Rating"
            name="rating"
            value={form.rating}
            onChange={handleChange}
          />


          <input
            className="rounded-lg border p-3"
            placeholder="AI, GPT, Chatbot"
            name="tags"
            value={form.tags}
            onChange={handleChange}
          />

        </div>


        <div className="flex gap-6">

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="apiAvailable"
              checked={form.apiAvailable}
              onChange={handleChange}
            />

            API Available

          </label>


          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />

            Featured

          </label>

        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {
            loading
              ? "Saving..."
              : isEdit
              ? "Update Tool"
              : "Add Tool"
          }
        </button>


      </form>

    </div>

  );
}