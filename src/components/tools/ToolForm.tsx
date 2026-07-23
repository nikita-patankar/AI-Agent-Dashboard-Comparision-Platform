"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

  const isEdit = !!tool;

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
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
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
        rating: form.rating ? Number(form.rating) : null,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      if (isEdit && tool) {
        await updateTool(tool._id, payload);
        alert("Tool updated successfully.");
      } else {
        await createTool(payload);
        alert("Tool created successfully.");
      }

      router.push("/dashboard");
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

      alert(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        {isEdit ? "Edit AI Tool" : "Add AI Tool"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Tool Name
            </label>

            <input
              className="w-full rounded-lg border p-3"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Company
            </label>

            <input
              className="w-full rounded-lg border p-3"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={4}
            className="w-full rounded-lg border p-3"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Category
            </label>

            <select
              className="w-full rounded-lg border p-3"
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

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Pricing
            </label>

            <select
              className="w-full rounded-lg border p-3"
              name="pricing"
              value={form.pricing}
              onChange={handleChange}
            >
              <option>Free</option>
              <option>Freemium</option>
              <option>Paid</option>
            </select>

          </div>

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

        <div className="flex flex-wrap gap-6">

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
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Tool"
            : "Add Tool"}
        </button>

      </form>

    </div>
  );
}