"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTool } from "@/services/tool";

export default function ToolForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    company: "",
    description: "",
    category: "Chatbot",
    pricing: "Free",
    website: "",
    logo: "",
    apiAvailable: false,
    rating: "",
    tags: "",
    featured: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createTool({
        ...form,
        rating: form.rating ? Number(form.rating) : null,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      alert("Tool Added Successfully!");

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      alert(error?.response?.data?.message || "Failed to create tool");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="block mb-1 font-medium">Tool Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Company</label>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
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
          <label className="block mb-1 font-medium">Pricing</label>
          <select
            name="pricing"
            value={form.pricing}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Free</option>
            <option>Freemium</option>
            <option>Paid</option>
          </select>
        </div>

      </div>

      <div>
        <label className="block mb-1 font-medium">Website</label>
        <input
          type="url"
          name="website"
          value={form.website}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Logo URL</label>
        <input
          type="text"
          name="logo"
          value={form.logo}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block mb-1 font-medium">Rating</label>
          <input
            type="number"
            min="1"
            max="5"
            step="0.1"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

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
        className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700"
      >
        Add AI Tool
      </button>

    </form>
  );
}