import Link from "next/link";
import ToolTable from "@/components/tools/ToolTable";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl p-8">

      <div className="mb-6 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <Link
          href="/dashboard/add-tool"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        >
          + Add Tool
        </Link>

      </div>

      <ToolTable />

    </div>
  );
}