"use client";

import { useEffect, useState } from "react";
import { getTools } from "@/services/tool";

import { Input } from "@/components/ui/input";

import ToolSelectionCard from "@/components/compare/ToolSelectionCard";
import SelectedToolbar from "@/components/compare/SelectedToolbar";
import ComparisonTable from "@/components/compare/ComparisonTable";

import { swal } from "@/lib/alert";

import type { Tool } from "@/types/tool";

export default function ComparePage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [selected, setSelected] = useState<Tool[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchTools() {
      const data = await getTools();
      setTools(data);
    }

    fetchTools();
  }, []);

  function toggleSelection(tool: Tool) {
    const exists = selected.find((t) => t._id === tool._id);

    if (exists) {
      setSelected(selected.filter((t) => t._id !== tool._id));
      return;
    }

    if (selected.length >= 4) {
      swal.fire({
        icon: "warning",
        title: "Maximum Limit Reached",
        text: "You can compare a maximum of 4 AI tools at a time.",
      });
      return;
    }

    setSelected([...selected, tool]);
  }

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.company.toLowerCase().includes(search.toLowerCase()) ||
      tool.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10 px-5">

      <h1 className="text-4xl font-bold mb-6">
        AI Tool Comparison
      </h1>

      <Input
        placeholder="Search by Tool, Company or Category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8"
      />

      {/* Toolbar */}
      <SelectedToolbar
        selected={selected}
        clearSelection={() => setSelected([])}
      />

      {/* Comparison Table */}
      <ComparisonTable tools={selected} />

      <h2 className="text-2xl font-bold mt-10 mb-5">
        Available Tools
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <ToolSelectionCard
            key={tool._id}
            tool={tool}
            selected={selected.some((t) => t._id === tool._id)}
            onToggle={toggleSelection}
          />
        ))}
      </div>
    </div>
  );
}