"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { Tool } from "@/types/tool";

interface Props {
  tool: Tool;
  selected: boolean;
  onToggle: (tool: Tool) => void;
}

export default function ToolSelectionCard({
  tool,
  selected,
  onToggle,
}: Props) {
  return (
    <Card
      className={`transition hover:shadow-lg ${
        selected
          ? "border-2 border-blue-600"
          : ""
      }`}
    >
      <CardContent className="p-5">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-lg font-bold">
              {tool.name}
            </h2>

            <p className="text-gray-500">
              {tool.company}
            </p>

          </div>

          <Button
            variant={selected ? "destructive" : "default"}
            onClick={() => onToggle(tool)}
          >
            {selected ? "Remove" : "Select"}
          </Button>

        </div>

        <div className="mt-4 space-y-1">

          <p>
            <strong>Category:</strong> {tool.category}
          </p>

          <p>
            <strong>Pricing:</strong> {tool.pricing}
          </p>

          <p>
            <strong>Rating:</strong> ⭐ {tool.rating}
          </p>

        </div>

      </CardContent>
    </Card>
  );
}