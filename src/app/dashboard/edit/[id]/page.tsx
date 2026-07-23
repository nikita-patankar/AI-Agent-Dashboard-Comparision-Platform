"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getTool, updateTool } from "@/services/tool";

export default function EditToolPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    company: "",
    description: "",
    category: "Chatbot",
    pricing: "Free",
    website: "",
    logo: "",
    rating: "",
    tags: "",
    apiAvailable: false,
    featured: false,
  });

  useEffect(() => {
    async function fetchTool() {
      try {
        const tool = await getTool(id as string);

        setForm({
          name: tool.name,
          company: tool.company,
          description: tool.description,
          category: tool.category,
          pricing: tool.pricing,
          website: tool.website,
          logo: tool.logo || "",
          rating: tool.rating?.toString() || "",
          tags: tool.tags?.join(", ") || "",
          apiAvailable: tool.apiAvailable,
          featured: tool.featured,
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load tool.");
      } finally {
        setLoading(false);
      }
    }

    fetchTool();
  }, [id]);

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

    try {
      await updateTool(id as string, {
        ...form,
        rating: form.rating ? Number(form.rating) : null,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      alert("Tool updated successfully.");

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update tool.");
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-8">

      <h1 className="mb-8 text-3xl font-bold">
        Edit AI Tool
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

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

        <textarea
          className="w-full rounded-lg border p-3"
          rows={4}
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-4">

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="rounded-lg border p-3"
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
            name="pricing"
            value={form.pricing}
            onChange={handleChange}
            className="rounded-lg border p-3"
          >
            <option>Free</option>
            <option>Freemium</option>
            <option>Paid</option>
          </select>

        </div>

        <input
          className="w-full rounded-lg border p-3"
          name="website"
          placeholder="Website"
          value={form.website}
          onChange={handleChange}
          required
        />

        <input
          className="w-full rounded-lg border p-3"
          name="logo"
          placeholder="Logo URL"
          value={form.logo}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">

          <input
            className="rounded-lg border p-3"
            type="number"
            min="1"
            max="5"
            step="0.1"
            name="rating"
            placeholder="Rating"
            value={form.rating}
            onChange={handleChange}
          />

          <input
            className="rounded-lg border p-3"
            name="tags"
            placeholder="AI, Chatbot, GPT"
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
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          type="submit"
        >
          Update Tool
        </button>

      </form>

    </div>
  );
}