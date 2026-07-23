"use client";

import { useEffect, useState } from "react";
import { getTool } from "@/services/tool";

import Swal from "sweetalert2";

interface Tool {
  _id: string;
  name: string;
  company: string;
  description: string;
  category: string;
  pricing: string;
  website: string;
  apiAvailable: boolean;
  featured: boolean;
  rating: number | null;
  views: number;
  bookmarkCount: number;
  comparisonCount: number;
  tags: string[];
  createdAt: string;
  createdBy?: {
    name: string;
    email: string;
  };
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function ToolDetails({ params }: Props) {

  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function loadTool() {

      const { id } = await params;

      try {

        const data = await getTool(id);

        setTool(data);

      } catch (error) {

        console.error(error);

        await Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to load tool.",
        });

      } finally {

        setLoading(false);

      }

    }


    loadTool();

  }, [params]);



  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }



  if (!tool) {
    return (
      <div className="p-10 text-center">
        Tool not found.
      </div>
    );
  }



  return (
    <div className="mx-auto max-w-4xl p-8">

      <div className="rounded-xl border bg-white p-8 shadow blue">


        <h1 className="mb-2 text-4xl font-bold text-center text-slate-500 underline">
          {tool.name}
        </h1>


        <p className="mb-6 text-gray-500 text-center">
          {tool.company}
        </p>


        <div className="grid gap-6 md:grid-cols-2">


          <div>
            <h3 className="font-semibold">Category</h3>
            <p>{tool.category}</p>
          </div>


          <div>
            <h3 className="font-semibold">Pricing</h3>
            <p>{tool.pricing}</p>
          </div>


          <div>
            <h3 className="font-semibold">API Available</h3>
            <p>{tool.apiAvailable ? "Yes" : "No"}</p>
          </div>


          <div>
            <h3 className="font-semibold">Featured</h3>
            <p>{tool.featured ? "Yes" : "No"}</p>
          </div>


          <div>
            <h3 className="font-semibold">Rating</h3>
            <p>{tool.rating ?? "N/A"}</p>
          </div>


          <div>
            <h3 className="font-semibold">Views</h3>
            <p>{tool.views}</p>
          </div>


          <div>
            <h3 className="font-semibold">Bookmarks</h3>
            <p>{tool.bookmarkCount}</p>
          </div>


          <div>
            <h3 className="font-semibold">Compared</h3>
            <p>{tool.comparisonCount}</p>
          </div>


        </div>



        <div className="mt-8">

          <h3 className="font-semibold">
            Description
          </h3>

          <p className="mt-2 text-gray-700">
            {tool.description}
          </p>

        </div>



        <div className="mt-8">

          <h3 className="font-semibold">
            Website
          </h3>


          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {tool.website}
          </a>


        </div>



        <div className="mt-8">

          <h3 className="font-semibold">
            Tags
          </h3>


          <div className="mt-2 flex flex-wrap gap-2">

            {tool.tags?.map((tag) => (

              <span
                key={tag}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm"
              >
                {tag}
              </span>

            ))}

          </div>

        </div>



        <div className="mt-8 border-t pt-6 text-sm text-gray-500">

          <p>
            Created By: {tool.createdBy?.name}
          </p>


          <p>
            Created At:{" "}
            {new Date(tool.createdAt).toLocaleDateString()}
          </p>


        </div>


      </div>

    </div>
  );
}