"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { deleteTool, getMyTools } from "@/services/tool";

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

export default function MyToolsTable() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadTools = async () => {
      try {
        const data = await getMyTools();
        setTools(data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch your tools.");
      } finally {
        setLoading(false);
      }
    };

    loadTools();
  }, []);

  async function handleDelete(id: string) {
    const ok = confirm("Delete this tool?");

    if (!ok) return;

    try {
      await deleteTool(id);

      setTools((prev) =>
        prev.filter((tool) => tool._id !== id)
      );

      alert("Tool deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  }

  const filteredTools = useMemo(() => {
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.company.toLowerCase().includes(search.toLowerCase())
    );
  }, [tools, search]);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center shadow">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <input
        className="w-full rounded-lg border p-3"
        placeholder="Search your tools..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto rounded-xl border bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Pricing</th>
              <th className="p-4 text-center">Website</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredTools.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  You haven't added any tools yet.
                </td>

              </tr>

            ) : (

              filteredTools.map((tool) => (

                <tr
                  key={tool._id}
                  className="border-t hover:bg-gray-50"
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
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                    >
                      🌐 Visit
                    </a>
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/dashboard/edit/${tool._id}`}
                        className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(tool._id)}
                        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>

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