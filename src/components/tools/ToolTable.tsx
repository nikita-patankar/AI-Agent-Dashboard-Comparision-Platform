"use client";

import { useEffect, useState } from "react";
import { getTools, deleteTool } from "@/services/tool";

interface Tool {
  _id: string;
  name: string;
  company: string;
  category: string;
  pricing: string;
  featured?: boolean;
  apiAvailable?: boolean;
}

export default function ToolTable() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [pricing, setPricing] = useState("All");

  const fetchTools = async () => {
    try {
      const data = await getTools();
      setTools(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch tools.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadTools = async () => {
      try {
        const data = await getTools();
        if (isMounted) {
          setTools(data);
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          alert("Failed to fetch tools.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTools();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleDelete(id: string) {
    const ok = confirm("Delete this tool?");
    if (!ok) return;

    try {
      await deleteTool(id);

      setTools((prev) => prev.filter((tool) => tool._id !== id));

      alert("Tool deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete tool.");
    }
  }

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.company.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || tool.category === category;

    const matchesPricing =
      pricing === "All" || tool.pricing === pricing;

    return matchesSearch && matchesCategory && matchesPricing;
  });

  const featuredCount = tools.filter((tool) => tool.featured).length;
  const apiCount = tools.filter((tool) => tool.apiAvailable).length;

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="space-y-6">

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-xl border p-5 shadow">
          <p className="text-gray-500">Total Tools</p>
          <h2 className="text-3xl font-bold">{tools.length}</h2>
        </div>

        <div className="rounded-xl border p-5 shadow">
          <p className="text-gray-500">Featured</p>
          <h2 className="text-3xl font-bold">{featuredCount}</h2>
        </div>

        <div className="rounded-xl border p-5 shadow">
          <p className="text-gray-500">API Available</p>
          <h2 className="text-3xl font-bold">{apiCount}</h2>
        </div>

      </div>

      {/* Table Card */}
      <div className="rounded-xl border p-6 shadow">

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">

          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border px-3 py-2"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border px-3 py-2"
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
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            className="rounded-lg border px-3 py-2"
          >
            <option>All</option>
            <option>Free</option>
            <option>Freemium</option>
            <option>Paid</option>
          </select>

        </div>

        <h2 className="mb-4 text-2xl font-bold">
          AI Tools ({filteredTools.length})
        </h2>

        <div className="overflow-x-auto">

          <table className="min-w-full border-collapse">

            <thead className="bg-gray-100">

              <tr>

                <th className="border-b p-3 text-left">Name</th>

                <th className="border-b p-3 text-left">Company</th>

                <th className="border-b p-3 text-left">Category</th>

                <th className="border-b p-3 text-left">Pricing</th>

                <th className="border-b p-3 text-left">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredTools.length === 0 ? (

                <tr>
                  <td
                    colSpan={5}
                    className="p-6 text-center text-gray-500"
                  >
                    No tools found.
                  </td>
                </tr>

              ) : (

                filteredTools.map((tool) => (

                  <tr key={tool._id} className="hover:bg-gray-50">

                    <td className="border-b p-3">{tool.name}</td>

                    <td className="border-b p-3">{tool.company}</td>

                    <td className="border-b p-3">{tool.category}</td>

                    <td className="border-b p-3">{tool.pricing}</td>

                    <td className="border-b p-3">

                      <button
                        onClick={() => handleDelete(tool._id)}
                        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}