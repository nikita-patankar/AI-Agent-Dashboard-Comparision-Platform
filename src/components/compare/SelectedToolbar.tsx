"use client";

import { Button } from "@/components/ui/button";

interface Tool {
  _id: string;
  name: string;
}

interface Props {
  selected: Tool[];
  clearSelection: () => void;
}

export default function SelectedToolbar({
  selected,
  clearSelection,
}: Props) {
  return (
    <div className="rounded-xl border p-5 mb-8 bg-white shadow">

      <div className="flex justify-between items-center">

        <h2 className="text-xl font-bold">
          Selected Tools ({selected.length}/4)
        </h2>

        {selected.length > 0 && (
          <Button
            variant="outline"
            onClick={clearSelection}
          >
            Clear
          </Button>
        )}

      </div>

      <div className="flex flex-wrap gap-2 mt-4">

        {selected.length === 0 && (
          <p className="text-gray-500">
            Select at least two tools to compare.
          </p>
        )}

        {selected.map((tool) => (
          <span
            key={tool._id}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            {tool.name}
          </span>
        ))}

      </div>

    </div>
  );
}