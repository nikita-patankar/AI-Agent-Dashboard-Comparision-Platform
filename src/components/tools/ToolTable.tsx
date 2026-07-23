"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getTools } from "@/services/tool";

interface Tool {
  _id: string;
  name: string;
  company: string;
  category: string;
  pricing: string;
  website: string;
  featured?: boolean;
  apiAvailable?: boolean;
}

export default function ToolTable() {
  const router = useRouter();

  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [pricing, setPricing] = useState("All");

  useEffect(() => {
    let isMounted = true;

    const loadTools = async () => {
      try {
        const data = await getTools();

        if (!isMounted) return;

        setTools(data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch tools.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void loadTools();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.company.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || tool.category === category;

      const matchesPricing =
        pricing === "All" || tool.pricing === pricing;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPricing
      );
    });
  }, [tools, search, category, pricing]);

  const featuredCount = tools.filter((t) => t.featured).length;
  const apiCount = tools.filter((t) => t.apiAvailable).length;

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center shadow">
        Loading tools...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-3">

        <div className="rounded-xl border bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Total Tools
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {tools.length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Featured
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {featuredCount}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            API Available
          </p>

          <h2 className="mt-2 text-4xl font-bold text-blue-600">
            {apiCount}
          </h2>
        </div>

      </div>

      {/* Filters */}

      <div className="rounded-xl border bg-white p-5 shadow">

        <div className="flex flex-col gap-4 md:flex-row">

          <input
            className="flex-1 rounded-lg border p-3"
            placeholder="Search tool or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="rounded-lg border p-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
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
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
          >
            <option>All</option>
            <option>Free</option>
            <option>Freemium</option>
            <option>Paid</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-xl border bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Company</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Pricing</th>

              <th className="p-4 text-center">
                Featured
              </th>

              <th className="p-4 text-center">
                API
              </th>

              <th className="p-4 text-center">
                Website
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredTools.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="p-8 text-center text-gray-500"
                >
                  No tools found.
                </td>

              </tr>

            ) : (

              filteredTools.map((tool) => (

                <tr
                  key={tool._id}
                  onClick={() =>
                    router.push(`/dashboard/tools/${tool._id}`)
                  }
                  className="cursor-pointer border-t transition hover:bg-blue-50"
                >

                  <td className="p-4 font-medium">
                    {tool.name}
                  </td>

                  <td className="p-4">
                    {tool.company}
                  </td>

                  <td className="p-4">
                    {tool.category}
                  </td>

                  <td className="p-4">
                    {tool.pricing}
                  </td>

                  <td className="p-4 text-center">
                    {tool.featured ? "⭐" : "-"}
                  </td>

                  <td className="p-4 text-center">
                    {tool.apiAvailable ? "✅" : "❌"}
                  </td>

                  <td
                    className="p-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg px-3 py-2 text-sm font-medium text-sky-400 transition hover:text-rose-700"
                    >
                      🌐 Visit
                    </a>
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}