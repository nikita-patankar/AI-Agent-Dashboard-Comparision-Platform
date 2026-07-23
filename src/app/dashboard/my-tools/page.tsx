import Link from "next/link";
import MyToolsTable from "@/components/tools/MyToolsTable";

export default function MyToolsPage() {
  return (
    <div className="mx-auto max-w-7xl p-8">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            My Tools
          </h1>

          <p className="mt-1 text-gray-500">
            Manage the AI tools you've created.
          </p>

        </div>

        <Link
          href="/dashboard/add-tool"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          + Add Tool
        </Link>

      </div>

      <MyToolsTable />

    </div>
  );
}